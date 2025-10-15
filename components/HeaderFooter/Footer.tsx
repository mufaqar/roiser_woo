// components/Footer.js
import React from 'react';
import { FaPhoneAlt, FaArrowRight, FaFacebook, FaDribbble, FaTwitter, FaBehance, FaYoutube } from 'react-icons/fa';
import FeaturedIcons from '../ShopGrid/FeaturedIcon';
import Image from 'next/image'
import Link from 'next/link';

function Footer() {
    return (
        <>
            <div className=" w-full md:w-[90%] lg:w-[80%] xl:w-[80%] mx-auto rounded-tl-xl mt-10">
                <FeaturedIcons />
            </div>
            <footer className="bg-[#F6F6F7]">
                {/* Top Section: Features with White Background */}


                {/* Main Footer Content */}
                <div className="container mx-auto py-20 px-4 -mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* About ROISER */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center mb-4">
                               <Link href={"/"}>
                                <Image
                                    src="/images/logo.png"
                                    width={160}
                                    height={50}
                                    alt="Website Logo"
                                    className="h-8 w-auto md:h-8 lg:h-8"
                                />
                               </Link>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                Elegant pink orgami design three type dimensional view and decoration co Great .
                            </p>
                            <div className="flex items-start">
                                <FaPhoneAlt className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Here Question? Call Us 24/7</p>
                                    <p className="text-lg font-semibold text-gray-800">+258 3692 2569</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                {['Our Story', 'Our Materials', 'Sustainability', 'Careers', 'Stemup'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                            <FaArrowRight className="mr-3 text-xs" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Information</h3>
                            <ul className="space-y-3">
                                {['Custom Service', 'Ordering Tracking', 'Contacts', 'Events', 'About Us'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                            <FaArrowRight className="mr-3 text-xs" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Social Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                        <FaFacebook className="mr-3 text-base" />
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                        <FaDribbble className="mr-3 text-base" />
                                        DiBible
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                        <FaTwitter className="mr-3 text-base" />
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                        <FaBehance className="mr-3 text-base" />
                                        Behaves
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                        <FaYoutube className="mr-3 text-base" />
                                        Youtube
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Get Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Get Newsletter</h3>
                            <p className="text-gray-600 mb-4 text-sm">Get 100% off your first order! Hurry up</p>
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>
                                <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium mt-3 text-sm">
                                    SUBSCRIBE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright and Payment Methods */}
                <div className="py-6 bg-[#DFDFE0] container mx-auto md:w-[90%] lg:w-[80%] xl:w-[80%]  rounded-t-xl px-6">
                    <div className=" flex flex-col md:flex-row justify-between items-center ">
                        <p className="text-gray-600 text-sm mb-4 md:mb-0">Copyright & Design 2024. All Right Reserved</p>
                        {/* <Image
                            src="/images/payment 2.png"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            className="h-6 w-auto md:w-auto"
                        /> */}
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;