"use client"

import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import AnimateOnScroll, { useAutoDelay } from '../Animation';
import useCart from '@/hooks/useCart';
import { formatCurrency } from '@/config/currency';
import { checkoutFormSchema, type CheckoutFormData } from '@/schemas/cartSchema';
import Image from 'next/image';

function CheckoutPage() {
  const getDelay = useAutoDelay();
  const router = useRouter();
  const {
    items,
    cartTotal,
    shippingCost,
    grandTotal,
  } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      country: 'United Kingdom',
      streetAddress: '',
      apartment: '',
      townCity: '',
      state: '',
      zipCode: '',
      phone: '',
      orderNotes: '',
      paymentMethod: 'stripe',
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = (data: CheckoutFormData) => {
    // TODO: Implement order submission logic
    router.push('/');
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-12">
            {/* Left Section - Billing Details */}
            <div className="lg:w-3/5">
              <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <h2 className="text-2xl font-bold text-title  mb-6">Billing Details</h2>
              </AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-title  mb-1">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    {...register('firstName')}
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-title  mb-1">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    {...register('lastName')}
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-title  mb-1">Email*</label>
                  <input
                    type="text"
                    id="email"
                    {...register('email')}
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-title  mb-1">Company Name (Optional)</label>
                  <input
                    type="text"
                    id="companyName"
                    {...register('companyName')}
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-title outline-none mb-1">Country*</label>
                  <input
                    type="text"
                    id="country"
                    {...register('country')}
                    value="United Kingdom"
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md outline-none bg-gray-50"
                  />
                  {errors.country && (
                    <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-title outline-none  mb-1">Street Address*</label>
                  <input
                    type="text"
                    id="streetAddress"
                    {...register('streetAddress')}
                    placeholder="House number and street number"
                    className="w-full outline-none p-3 border border-gray-300 rounded-md  mb-3"
                  />
                  {errors.streetAddress && (
                    <p className="text-xs text-red-500 mb-3">{errors.streetAddress.message}</p>
                  )}
                  <input
                    type="text"
                    {...register('apartment')}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="w-full p-3 outline-none  border border-gray-300 rounded-md "
                  />
                </div>

                <div>
                  <label htmlFor="townCity" className="block text-sm font-medium text-title  mb-1">Town / City*</label>
                  <input
                    type="text"
                    id="townCity"
                    {...register('townCity')}
                    className="w-full p-3 border border-gray-300 rounded-md  outline-none"
                  />
                  {errors.townCity && (
                    <p className="text-xs text-red-500 mt-1">{errors.townCity.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-title outline-none  mb-1">County (Optional)</label>
                  <input
                    type="text"
                    id="state"
                    {...register('state')}
                    placeholder="e.g., Greater London, West Midlands"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-title  mb-1">Postcode*</label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('zipCode')}
                    placeholder="e.g., SW1A 1AA"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.zipCode && (
                    <p className="text-xs text-red-500 mt-1">{errors.zipCode.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-title  mb-1">Phone*</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    placeholder="e.g., 07123 456789"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="orderNotes" className="block text-sm font-medium text-title  mb-1">Order Notes (Optional)</label>
                  <textarea
                    id="orderNotes"
                    {...register('orderNotes')}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                  ></textarea>
                </div>
              </div>
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
                  {items.length === 0 ? (
                    <div className="py-6 text-center text-gray-500">
                      <p>Your cart is empty</p>
                      <Link href="/shop" className="text-[#2F4761] hover:underline mt-2 inline-block">
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    items.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-3">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.image}
                            alt={item.name || 'Product'}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <span className="text-sm text-title block">{item.name || 'Product'}</span>
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-title">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))
                  )}

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-title">Subtotal</span>
                    <span className="text-sm font-semibold text-title">{formatCurrency(cartTotal)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-title">Shipping</span>
                    <span className="text-sm font-semibold text-title">
                      {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-lg font-bold text-title">Total Price:</span>
                    <span className="text-lg font-bold text-[#2F4761]">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-title mb-3">Payment Method</h3>
                  <div className="flex items-start bg-white border border-gray-300 rounded-md p-4">
                    <input
                      type="radio"
                      id="stripe"
                      value="stripe"
                      {...register('paymentMethod')}
                      checked
                      readOnly
                      className="mt-1 h-4 w-4 text-[#2F4761] focus:ring-[#2F4761] border-gray-300"
                    />
                    <label htmlFor="stripe" className="ml-3 text-sm font-medium text-title flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Image src="/images/payments/stripe.webp" alt="Stripe" width={24} height={24} />
                        <span>Credit / Debit Card (Stripe)</span>
                        <span className="text-xs text-gray-500">🔒 Secure Payment</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Pay securely using your credit or debit card. Your payment information is encrypted and processed securely through Stripe. We accept Visa, Mastercard, and American Express. Apple Pay and Google Pay are also available for quick, contactless checkout on supported devices.
                      </p>
                    </label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-xs text-red-500 mt-2">{errors.paymentMethod.message}</p>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-6">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="text-[#2F4761] hover:underline">privacy policy</a>.
                </p>

                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    {...register('agreeToTerms')}
                    className="h-4 w-4 text-[#2F4761]  border-gray-300 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-title">
                    I have read and agree to the terms and conditions *
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-xs text-red-500 mt-1 ml-7">{errors.agreeToTerms.message}</p>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 mt-6 text-white font-semibold rounded-md transition-colors duration-300
                  ${agreeToTerms && items.length > 0 ? 'bg-[#2F4761] hover:bg-[#1f3347]' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!agreeToTerms || items.length === 0}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </form>
        </AnimateOnScroll>
      </div>
    </div>
  );
}

export default CheckoutPage;
