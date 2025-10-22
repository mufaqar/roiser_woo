import { NextRequest, NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

interface OrderLineItem {
  product_id: number;
  quantity: number;
}

interface CreateOrderRequest {
  billing_address: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
  };
  line_items: OrderLineItem[];
  shipping_cost?: number;
  customer_note?: string;
  payment_method: string;
  set_paid?: boolean;
}

interface WooCommerceOrder {
  id: number;
  order_key: string;
  status: string;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching order details for order ID:', orderId);

    // Fetch order from WooCommerce REST API
    const response = await wooApi.get(`orders/${orderId}`);
    const order = response.data as WooCommerceOrder;

    console.log('Order fetched successfully:', {
      orderId: order.id,
      status: order.status,
      total: order.total,
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_key: order.order_key,
        date_created: order.date_created,
        total: order.total,
        billing: order.billing,
        shipping: order.shipping,
        line_items: order.line_items,
        payment_method_title: order.payment_method_title,
        status: order.status,
      },
    }, {
      status: 200,
    });

  } catch (error: any) {
    console.error('WooCommerce order fetch error:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });

    return NextResponse.json(
      {
        error: 'Failed to fetch order',
        message: error?.response?.data?.message || error?.message || 'Unknown error',
        details: error?.response?.data,
      },
      { status: error?.response?.status || 500 }
    );
  }
}

// In-memory cache to prevent duplicate orders (simple time-based deduplication)
const recentOrders = new Map<string, { timestamp: number; orderId: number }>();
const DUPLICATE_WINDOW_MS = 5000; // 5 seconds

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of recentOrders.entries()) {
    if (now - value.timestamp > DUPLICATE_WINDOW_MS) {
      recentOrders.delete(key);
    }
  }
}, 10000); // Clean every 10 seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateOrderRequest;

    // Validate required fields
    const { billing_address, shipping_address, line_items, payment_method } = body;

    // Create a unique key based on email and cart items to detect duplicates
    const orderKey = `${billing_address.email}_${line_items.map(i => `${i.product_id}:${i.quantity}`).join('_')}`;
    const now = Date.now();

    // Check if this exact order was just created
    const recentOrder = recentOrders.get(orderKey);
    if (recentOrder && (now - recentOrder.timestamp) < DUPLICATE_WINDOW_MS) {
      console.warn('Duplicate order attempt detected, returning existing order:', recentOrder.orderId);

      // Return the existing order instead of creating a duplicate
      const response = await wooApi.get(`orders/${recentOrder.orderId}`);
      const order = response.data as WooCommerceOrder;

      const checkoutUrl = `${process.env.WC_STORE_URL}/checkout/order-pay/${order.id}?key=${order.order_key}&pay_for_order=true`;

      return NextResponse.json({
        success: true,
        order_id: order.id,
        order_key: order.order_key,
        status: order.status,
        checkout_url: checkoutUrl,
        order_details: {
          id: order.id,
          order_key: order.order_key,
          date_created: order.date_created,
          total: order.total,
          billing: order.billing,
          shipping: order.shipping,
          line_items: order.line_items,
          payment_method_title: order.payment_method_title,
        },
        duplicate_prevented: true,
      }, {
        status: 200,
      });
    }

    if (!billing_address || !shipping_address || !line_items || !payment_method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!Array.isArray(line_items) || line_items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create order data for WooCommerce
    const orderData: any = {
      billing: {
        first_name: billing_address.first_name,
        last_name: billing_address.last_name,
        company: billing_address.company || '',
        address_1: billing_address.address_1,
        address_2: billing_address.address_2 || '',
        city: billing_address.city,
        state: billing_address.state || '',
        postcode: billing_address.postcode,
        country: billing_address.country,
        email: billing_address.email,
        phone: billing_address.phone,
      },
      shipping: {
        first_name: shipping_address.first_name,
        last_name: shipping_address.last_name,
        company: shipping_address.company || '',
        address_1: shipping_address.address_1,
        address_2: shipping_address.address_2 || '',
        city: shipping_address.city,
        state: shipping_address.state || '',
        postcode: shipping_address.postcode,
        country: shipping_address.country,
      },
      line_items: line_items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      customer_note: body.customer_note || '',
      payment_method: payment_method,
      payment_method_title: payment_method === 'stripe' ? 'Credit / Debit Card (Stripe)' : payment_method,
      set_paid: false, // Order will be paid through WooCommerce checkout
      status: 'pending', // Initial status
    };

    // Add shipping line if shipping cost is provided
    if (body.shipping_cost !== undefined && body.shipping_cost > 0) {
      orderData.shipping_lines = [{
        method_id: 'flat_rate',
        method_title: 'Flat Rate Shipping',
        total: body.shipping_cost.toFixed(2).toString(),
      }];
    } else if (body.shipping_cost === 0) {
      orderData.shipping_lines = [{
        method_id: 'free_shipping',
        method_title: 'Free Shipping',
        total: '0.00',
      }];
    }

    console.log('Creating WooCommerce order with data:', JSON.stringify(orderData, null, 2));

    // Create order via WooCommerce REST API
    const response = await wooApi.post('orders', orderData);
    const order = response.data as WooCommerceOrder;

    console.log('WooCommerce order created:', {
      orderId: order.id,
      orderKey: order.order_key,
      status: order.status,
    });

    // Add to recent orders cache to prevent duplicates
    recentOrders.set(orderKey, {
      timestamp: now,
      orderId: order.id,
    });

    // Generate WooCommerce checkout URL with redirect back to our order-received page
    const nextjsReturnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/order-received?order_id=${order.id}`;
    const checkoutUrl = `${process.env.WC_STORE_URL}/checkout/order-pay/${order.id}?key=${order.order_key}&pay_for_order=true&redirect=${encodeURIComponent(nextjsReturnUrl)}`;

    return NextResponse.json({
      success: true,
      order_id: order.id,
      order_key: order.order_key,
      status: order.status,
      checkout_url: checkoutUrl,
      order_details: {
        id: order.id,
        order_key: order.order_key,
        date_created: order.date_created,
        total: order.total,
        billing: order.billing,
        shipping: order.shipping,
        line_items: order.line_items,
        payment_method_title: order.payment_method_title,
      },
    }, {
      status: 200,
    });

  } catch (error: any) {
    console.error('WooCommerce order creation error:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });

    return NextResponse.json(
      {
        error: 'Failed to create order',
        message: error?.response?.data?.message || error?.message || 'Unknown error',
        details: error?.response?.data,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
