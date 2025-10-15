import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatCurrency } from '@/config/currency';
import useCart from '@/hooks/useCart';
import { SHIPPING_OPTIONS, FREE_SHIPPING_THRESHOLD } from '@/config/shoppingCart';
import { shippingFormSchema, type ShippingFormData } from '@/schemas/cartSchema';
import { useRouter } from 'next/navigation';

function SideBar() {
  const router = useRouter();
  const {
    cartTotal: subtotal,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    grandTotal,
    qualifiesForFreeShipping,
    amountUntilFreeShipping
  } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      shippingMethod: shippingMethod,
    },
  });

  const handleShippingChange = (method: 'free' | 'flat') => {
    setShippingMethod(method);
  };

  const onSubmit = () => {
    router.push('/checkout');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-96 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-title mb-6">Cart Totals</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="text-title">Subtotal</span>
          <span className="font-semibold text-title">{formatCurrency(subtotal)}</span>
        </div>

        <div className="space-y-3 pb-4 border-b border-gray-200">
          <p className="text-title">Shipping</p>
          <div className="space-y-2">
            <label className="flex items-center text-sm text-title cursor-pointer">
              <input
                type="radio"
                value="free"
                checked={shippingMethod === 'free'}
                {...register('shippingMethod')}
                onChange={() => handleShippingChange('free')}
                disabled={!qualifiesForFreeShipping}
                className="mr-2 bg-[#2F4761] focus:ring-blue-500"
              />
              Free Shipping
              {qualifiesForFreeShipping && (
                <span className="ml-2 text-xs text-green-600 font-semibold">✓ Qualified</span>
              )}
            </label>
            <label className="flex items-center text-sm text-title cursor-pointer">
              <input
                type="radio"
                value="flat"
                checked={shippingMethod === 'flat'}
                {...register('shippingMethod')}
                onChange={() => handleShippingChange('flat')}
                className="mr-2 bg-[#2F4761] focus:ring-blue-500"
              />
              Flat Rate ({formatCurrency(SHIPPING_OPTIONS.FLAT.flatRate)})
            </label>
          </div>

          {!qualifiesForFreeShipping && amountUntilFreeShipping > 0 && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800">
                Add <span className="font-bold">{formatCurrency(amountUntilFreeShipping)}</span> more to qualify for free shipping!
              </p>
            </div>
          )}

          {errors.shippingMethod && (
            <p className="text-xs text-red-500 ml-5">{errors.shippingMethod.message}</p>
          )}
        </div>

        {shippingCost > 0 && (
          <div className="space-y-2 pb-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-title">Shipping Cost</span>
              <span className="font-semibold text-title">{formatCurrency(shippingCost)}</span>
            </div>
            {shippingMethod === 'free' && !qualifiesForFreeShipping && (
              <p className="text-xs text-amber-600">
                Note: Minimum order of {formatCurrency(FREE_SHIPPING_THRESHOLD)} required for free shipping
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-sm mt-6 py-3 bg-[#2F4761] text-white font-semibold rounded-md transition-colors hover:bg-[#1f3347]"
      >
        PROCEED TO CHECKOUT
      </button>
    </form>
  );
}

export default SideBar;
