"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import AnimateOnScroll, { useAutoDelay } from '../Animation';

function CheckoutPage() {
  const getDelay = useAutoDelay();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const products = [
    { id: 1, name: "Bong Color Sanddle", price: 900.00, image: "/images/card-img.png" },
    { id: 2, name: "Chiara Loko Bag", price: 900.00, image: "/images/card-img.png" },
    { id: 3, name: "Modern Elegant Bag", price: 900.00, image: "/images/card-img.png" },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const shipping = 50.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen  font-sans container mx-auto px-4">
      {/* Top Banners */}
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="bg-title text-white  py-3 text-sm mt-20  px-6 rounded-md">
          Returning customer? <a href="#" className="underline">Click here to login</a>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="bg-white text-title px-6 py-3 text-sm border border-gray-200 mt-6 rounded-md">
          Have a coupon? <a href="#" className="underline">Click here to enter your code</a>
        </div>
      </AnimateOnScroll>
      <div className="  mt-10">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Section - Billing Details */}
            <div className="lg:w-3/5">
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <h2 className="text-2xl font-bold text-title  mb-6">Billing Details</h2>
              </AnimateOnScroll>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                  <label htmlFor="first_name" className="block text-sm font-medium text-title  mb-1">First Name*</label>
                  <input type="text" id="first_name" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-title  mb-1">Last Name*</label>
                  <input type="text" id="last_name" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                </div>

                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-title  mb-1">Company Name (Optional)*</label>
                  <input type="text" id="company_name" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-title outline-none mb-1">Country / Region*</label>
                  <select id="country" className="w-full p-3  border border-gray-300 rounded-md  outline-none bg-white">
                    <option>United States (US)</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="street_address" className="block text-sm font-medium text-title outline-none  mb-1">Street Address*</label>
                  <input type="text" id="street_address" placeholder="House number and street number" className="w-full outline-none p-3 border border-gray-300 rounded-md  mb-3" />
                  <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full p-3 outline-none  border border-gray-300 rounded-md " />
                </div>

                <div>
                  <label htmlFor="town_city" className="block text-sm font-medium text-title  mb-1">Town / City*</label>
                  <input type="text" id="town_city" className="w-full p-3 border border-gray-300 rounded-md  outline-none" />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-title outline-none  mb-1">State*</label>
                  <select id="state" className="w-full p-3 border border-gray-300 rounded-md outline-none  bg-white">
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="zip_code" className="block text-sm font-medium text-title  mb-1">Zip Code*</label>
                  <input type="text" id="zip_code" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-title  mb-1">Phone*</label>
                  <input type="tel" id="phone" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="order_notes" className="block text-sm font-medium text-title  mb-1">Order Notes*</label>
                  <textarea id="order_notes" rows={4} className="w-full p-3 border border-gray-300 rounded-md outline-none"></textarea>
                </div>
              </form>
            </div>

            {/* Right Section - Your Order */}
            <div className="lg:w-2/5">
              <div className="bg-[#F4F5F7] p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-title  mb-6">Your Order</h2>

                <div className="divide-y divide-gray-200">
                  {/* Product Headers */}
                  <div className="flex justify-between items-center py-3 text-sm font-semibold text-gray-600 uppercase">
                    <span>Products</span>
                    <span>Price</span>
                  </div>

                  {/* Product List */}
                  {products.map(product => (
                    <div key={product.id} className="flex justify-between items-center py-3">
                      <div className="flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        <span className="text-sm text-title ">{product.name}</span>
                      </div>
                      <span className="text-sm font-medium text-title ">${product.price.toFixed(2)}</span>
                    </div>
                  ))}

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-title ">Subtotal</span>
                    <span className="text-sm font-semibold text-title ">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-title ">Shipping</span>
                    <span className="text-sm font-semibold text-title ">Flat rate: ${shipping.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-lg font-bold text-title ">Total Price:</span>
                    <span className="text-lg font-bold text-[#2F4761]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <input type="radio" id="direct_bank" name="payment_method" className="mt-1 h-4 w-4 text-[#2F4761] focus:ring-[#2F4761] border-gray-300" defaultChecked />
                    <label htmlFor="direct_bank" className="ml-3 text-sm font-medium text-title ">
                      Direct Bank Transfer
                      <p className="text-xs text-gray-500 mt-1">
                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                      </p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="check_payments" name="payment_method" className="h-4 w-4 text-[#2F4761] focus:ring-[#2F4761] border-gray-300" />
                    <label htmlFor="check_payments" className="ml-3 text-sm font-mediumt text-title ">Check Payments</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="cash_on_delivery" name="payment_method" className="h-4 w-4 text-[#2F4761] focus:ring-[#2F4761] border-gray-300" />
                    <label htmlFor="cash_on_delivery" className="ml-3 text-sm font-medium text-title ">Cash On Delivery</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="paypal" name="payment_method" className="h-4 w-4 text-[#2F4761] focus:ring-[#2F4761] border-gray-300" />
                    <label htmlFor="paypal" className="ml-3 text-sm font-medium text-title ">Paypal</label>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="text-[#2F4761] hover:underline">privacy policy</a>.
                </p>

                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="agree_terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-[#2F4761]  border-gray-300 rounded"
                  />
                  <label htmlFor="agree_terms" className="ml-3 text-sm text-title ">
                    I have read and agree terms and conditions *
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 mt-6 text-white font-semibold rounded-md transition-colors duration-300 
                  ${agreeToTerms ? 'bg-[#2F4761] ' : 'bg-[#2F4761] cursor-not-allowed'}`}
                  disabled={!agreeToTerms}
                >
                  <Link href="/">
                    PLACE ORDER
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}

export default CheckoutPage;