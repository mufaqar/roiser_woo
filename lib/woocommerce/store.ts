const API_BASE_URL = '/api/woo-cart';

const asJSON = async <T>(res: Response) => {
    const j = await res.json();
    if (!res.ok) {
        console.error('WooCommerce API Error:', {
            status: res.status,
            statusText: res.statusText,
            message: j?.message || j?.error,
            url: res.url,
        });
        throw new Error(j?.message || j?.error || `WooCommerce API error: ${res.status} ${res.statusText}`);
    }
    return j as T;
};

export const readToken = (res: Response, existing?: string) => res.headers.get("Cart-Token") || existing;

export async function getWooCart(token?: string) {
    try {
        console.log('Fetching WooCommerce cart via API route');
        const res = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Cart-Token': token } : {}),
            },
        });

        return {
            cart: await asJSON<WooCartResponse>(res),
            cartToken: readToken(res, token)!,
        }
    } catch (error) {
        console.error('Failed to fetch WooCommerce cart:', error);
        throw error;
    }
}

interface SyncWooCartParams {
    local: {
        id: number;
        quantity: number;
    }[];
}

export async function syncWooCart({ local }: SyncWooCartParams) {
    const { cartToken } = await getWooCart();

    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cart-Token': cartToken,
        },
        body: JSON.stringify({
            action: 'batch',
            data: {
                requests: local.map(item => ({
                    path: '/wc/store/v1/cart/add-item',
                    method: 'POST',
                    cache: 'no-store',
                    body: { id: item.id, quantity: item.quantity }
                })),
            }
        })
    });

    await asJSON<WooCartResponse>(res);

    const { cart } = await getWooCart(cartToken);

    return {
        cart,
        cartToken,
    };
}

interface UpdateWooUpdateAddressParams {
    address_1: string;
    city: string;
    postcode: string;
}

export async function updateWooAddress(token: string, address: UpdateWooUpdateAddressParams) {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cart-Token': token,
        },
        body: JSON.stringify({
            action: 'update-customer',
            data: {
                shipping: { country: 'GB', state: '', ...address },
            },
        }),
    });

    return await asJSON<WooCartResponse>(res);
}

export async function selectWooShippingRate(token: string, packageId: number, rateId: string) {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cart-Token': token
        },
        body: JSON.stringify({
            action: 'select-shipping-rate',
            packageId,
            rateId,
        }),
    });

    return await asJSON<WooCartResponse>(res);
}

export async function applyWooCoupon(token: string, code: string) {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cart-Token': token
        },
        body: JSON.stringify({
            action: 'apply-coupon',
            code,
        }),
    });

    return await asJSON<WooCartResponse>(res);
}

export async function removeWooCoupon(token: string, code: string) {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cart-Token': token
        },
        body: JSON.stringify({
            action: 'remove-coupon',
            code,
        }),
    });

    return await asJSON<WooCartResponse>(res);
}

export async function placeWooOrder(token: string) {
    // TODO: Implement order placement
}
