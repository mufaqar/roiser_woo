import { NextRequest, NextResponse } from 'next/server';

const STORE_API_URL = `${process.env.WC_STORE_URL!}/wp-json/wc/store/v1`;

export async function GET(request: NextRequest) {
    try {
        const cartToken = request.headers.get('Cart-Token');

        const res = await fetch(`${STORE_API_URL}/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(cartToken ? { 'Cart-Token': cartToken } : {}),
            },
        });

        const data = await res.json();
        const responseCartToken = res.headers.get('Cart-Token');

        return NextResponse.json(data, {
            status: res.status,
            headers: responseCartToken ? { 'Cart-Token': responseCartToken } : {},
        });
    } catch (error) {
        console.error('WooCommerce cart GET error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch cart' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const cartToken = request.headers.get('Cart-Token');
        const { action, ...params } = body;

        let url = `${STORE_API_URL}/cart`;
        let method = 'POST';

        // Handle different cart actions
        switch (action) {
            case 'add-item':
                url = `${STORE_API_URL}/cart/add-item`;
                break;
            case 'update-item':
                url = `${STORE_API_URL}/cart/items/${params.key}`;
                method = 'PUT';
                break;
            case 'remove-item':
                url = `${STORE_API_URL}/cart/items/${params.key}`;
                method = 'DELETE';
                break;
            case 'apply-coupon':
                url = `${STORE_API_URL}/cart/apply-coupon?code=${encodeURIComponent(params.code)}`;
                break;
            case 'remove-coupon':
                url = `${STORE_API_URL}/cart/remove-coupon?code=${encodeURIComponent(params.code)}`;
                break;
            case 'select-shipping-rate':
                url = `${STORE_API_URL}/cart/select-shipping-rate?package_id=${params.packageId}&rate_id=${encodeURIComponent(params.rateId)}`;
                break;
            case 'update-customer':
                url = `${STORE_API_URL}/cart/update-customer`;
                break;
            case 'batch':
                url = `${STORE_API_URL}/batch`;
                break;
            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(cartToken ? { 'Cart-Token': cartToken } : {}),
            },
            body: action !== 'select-shipping-rate' && action !== 'apply-coupon' && action !== 'remove-coupon'
                ? JSON.stringify(params.data || params)
                : undefined,
        });

        const data = await res.json();
        const responseCartToken = res.headers.get('Cart-Token');

        return NextResponse.json(data, {
            status: res.status,
            headers: responseCartToken ? { 'Cart-Token': responseCartToken } : {},
        });
    } catch (error) {
        console.error('WooCommerce cart POST error:', error);
        return NextResponse.json(
            { error: 'Failed to process cart action' },
            { status: 500 }
        );
    }
}
