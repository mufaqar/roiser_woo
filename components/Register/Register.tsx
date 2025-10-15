"use client";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";


function Register() {
  const getDelay = useAutoDelay();


  const handleError = () => {
    console.log("Google login failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="max-w-xl w-full bg-[#F4F5F7] p-8 rounded-lg shadow-md">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <h2 className="mt-6 text-center text-2xl font-extrabold text-title">
                Create Your Account
              </h2>
            </AnimateOnScroll>
            <div className="mt-8 flex justify-center">
              {/* Google Login Button */}
              {/* <GoogleLogin onSuccess={handleSuccess} onError={handleError}/> */}
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#F4F5F7] text-gray-500">OR</span>
              </div>
            </div>

            {/* Registration Form */}
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="your-name" className="block text-sm font-medium text-gray-700">
                  Your Name*
                </label>
                <input
                  id="your-name"
                  name="your-name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border bg-white border-[#E5E7EB] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border bg-white border-[#E5E7EB] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password*
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border bg-white border-[#E5E7EB] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=""
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center">
                  <input
                    id="subscribe-updates"
                    name="subscribe-updates"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="subscribe-updates" className="ml-2 block text-sm text-gray-700">
                    Subscribe to stay updated with new products and offers!
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="accept-terms"
                    name="accept-terms"
                    type="checkbox"
                    required // Assuming this is a required field for registration
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                    I accept the <a href="#" className="font-medium text-title hover:underline">Terms / Privacy Policy</a>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-[#2F4761]  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Register Account
                </button>
              </div>
            </form>

            <div className="text-sm mt-6 text-center">
              <p className="text-gray-700">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-title hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>


    </>
  );
}

export default Register;