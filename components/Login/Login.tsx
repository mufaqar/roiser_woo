"use client";
import React from "react";
import AnimateOnScroll, { useAutoDelay } from "../Animation";



function Login() {
  const getDelay = useAutoDelay();

  // const handleError = () => {
  //   console.log("Google login failed");
  //   alert("Google login failed. Please try again.");
  // };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll type="fade-up" delay={getDelay()}>
          <div className="max-w-md w-full bg-[#F4F5F7] p-8 rounded-lg shadow-md">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
              <h2 className="mt-6 text-center text-2xl font-extrabold text-title">
                Login Into Your Account
              </h2>
            </AnimateOnScroll>

            <div className="mt-8 flex justify-center">
              {/* Google Login Button */}
              {/* <GoogleLogin onSuccess={handleSuccess} onError={handleError} /> */}
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#F4F5F7] text-gray-500">OR</span>
              </div>
            </div>

            {/* Username + Password Login */}
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="username-email" className="sr-only">
                  Username or email address
                </label>
                <input
                  id="username-email"
                  name="username-email"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border bg-white border-[#E5E7EB] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Username or email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border bg-white border-[#E5E7EB] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="remember-me" className="flex items-center text-sm text-title cursor-pointer">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
                  />
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-[#2F4761] hover:bg-[#25394B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login Account
                </button>
              </div>
            </form>

            <div className="text-sm mt-6 text-center">
              <a href="#" className="font-medium text-title hover:underline">
                Lost your password?
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </>
  );
}

export default Login;