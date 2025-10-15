"use client";
import Image from 'next/image';
import React from 'react';
import AnimateOnScroll, { useAutoDelay } from '../Animation';

function ContactUs() {
    const getDelay = useAutoDelay();
    return (
        <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8 container mx-auto px-4 mt-10">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="bg-[#F6F6F7] rounded-lg shadow-lg p-8 w-full max-w-6xl flex flex-col lg:flex-row gap-10">
                    {/* Left Section: Get In Touch Form */}

                    <div className="lg:w-2/3">
                      <AnimateOnScroll type="fade-up" delay={getDelay()}>
                        <h2 className="text-3xl font-bold text-[#141414] mb-8">Get In Touch</h2>
                        </AnimateOnScroll>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="your_name" className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
                                    <input
                                        type="text"
                                        id="your_name"
                                        className="w-full p-3  border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                    <input
                                        type="email"
                                        id="email_address"
                                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>

                            <div>
                                <label htmlFor="your_message" className="block text-sm font-medium text-gray-700 mb-1">Write Your Message</label>
                                <textarea
                                    id="your_message"
                                    rows={6}
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 resize-y"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="px-8 py-3 bg-[#2F4761] text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Section: Store Information */}
                  
                        <div className="lg:w-1/3 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                            {/* Placeholder for Map/Image */}
                            <div className="w-full  rounded-md mb-6 flex items-center justify-center ">
                                <Image
                                    src="/images/card-img.png"
                                    width={500}
                                    height={500}
                                    alt="Website Logo"
                                    className="w-full "
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#141414] mb-4">Clothing Store</h3>
                            <p className="text-sm text-description mb-4">
                                Germany — 785 15th Street, Office 47B/8 <br />
                                Green Mull Berlin, De 81566
                            </p>
                            <p className="text-sm text-description mb-1">
                                Phone: +1 1234 567 88
                            </p>
                            <p className="text-sm text-description mb-6">
                                Email: contact@example.com
                            </p>

                            <h4 className="text-lg font-bold text-[#141414] mb-3">Opening Hours</h4>
                            <p className="text-sm text-description">
                                Monday - Friday : 9am - 5pm <br />
                                Weekend Closed
                            </p>
                        </div>
                 
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default ContactUs;