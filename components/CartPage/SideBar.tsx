import Link from 'next/link';
import React from 'react';

function SideBar({ subtotal = 0 }) {
  const freeShippingThreshold = 59.69;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="w-full lg:w-96 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-title mb-6">Cart Totals</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="text-title">Subtotal</span>
          <span className="font-semibold text-title">${subtotal.toFixed(2)}</span>
        </div>

        <div className="space-y-3 pb-4 border-b border-gray-200">
          <p className="text-title">Shipping</p>
          <div className="space-y-2">
            <label className="flex items-center text-sm text-title">
              <input type="radio" name="shipping" value="free" className="mr-2 bg-[#2F4761] focus:ring-blue-500" defaultChecked />
              Free Shipping
            </label>
            <label className="flex items-center text-sm text-title">
              <input type="radio" name="shipping" value="flat" className="mr-2 bg-[#2F4761] focus:ring-blue-500" />
              Flat Rate
            </label>
            <label className="flex items-center text-sm text-title">
              <input type="radio" name="shipping" value="local" className="mr-2 bg-[#2F4761] focus:ring-blue-500" />
              Local Pickup
            </label>
          </div>
          <p className="text-xs text-gray-500 ml-5">Shipping options will be updated during checkout</p>
          <button className="text-[#2F4761] text-sm mt-2 ml-5 hover:underline">
            Calculate Shipping
          </button>
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full text-sm mt-6 py-3 bg-[#2F4761] text-white font-semibold rounded-md transition-colors">
        <Link href="/cart-page">
          PROCEED TO CHECKOUT
        </Link>
      </button>
    </div>
  );
}

export default SideBar;
