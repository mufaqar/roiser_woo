"use client";
import Link from 'next/link';
import React, { useState } from 'react';

function TopBar() {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'zh', name: 'Chinese' }
    ];

    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }
    ];

    return (
        <div className="bg-title text-white text-xs py-2  relative">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-4 hidden md:block">
                    <Link href="#" className="hover:text-gray-300 transition-colors">About</Link>
                    <Link href="#" className="hover:text-gray-300 transition-colors">My Account</Link>
                    <Link href="#" className="hover:text-gray-300 transition-colors">Wishlist</Link>
                    <Link href="#" className="hover:text-gray-300 transition-colors">Checkout</Link>
                </div>
                <div className="text-center hidden sm:block">
                    <span className="text-sm">Free shipping for all orders of $500</span>
                </div>
                <div className="flex space-x-4">
                    <div className="flex items-center divide-x divide-white/60">
                        <Link href="#" className="hover:text-gray-300 transition-colors px-2">Store Location</Link>
                        
                        {/* Language Dropdown */}
                        <div className="relative px-2">
                            <button 
                                className="flex items-center focus:outline-none hover:text-gray-300 transition-colors"
                                onClick={() => {
                                    setIsLanguageOpen(!isLanguageOpen);
                                    setIsCurrencyOpen(false);
                                }}
                            >
                                {selectedLanguage} 
                                <svg 
                                    className={`w-3 h-3 ml-1 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            {/* Language Dropdown Menu */}
                            {isLanguageOpen && (
                                <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors ${
                                                selectedLanguage === language.name ? 'bg-gray-100 font-medium' : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedLanguage(language.name);
                                                setIsLanguageOpen(false);
                                            }}
                                        >
                                            {language.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Currency Dropdown */}
                        <div className="relative px-2">
                            <button 
                                className="flex items-center focus:outline-none hover:text-gray-300 transition-colors"
                                onClick={() => {
                                    setIsCurrencyOpen(!isCurrencyOpen);
                                    setIsLanguageOpen(false);
                                }}
                            >
                                {selectedCurrency} 
                                <svg 
                                    className={`w-3 h-3 ml-1 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            {/* Currency Dropdown Menu */}
                            {isCurrencyOpen && (
                                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                    {currencies.map((currency) => (
                                        <button
                                            key={currency.code}
                                            className={`block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors ${
                                                selectedCurrency === currency.code ? 'bg-gray-100 font-medium' : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedCurrency(currency.code);
                                                setIsCurrencyOpen(false);
                                            }}
                                        >
                                            <span className="font-medium">{currency.code}</span> 
                                            <span className="text-gray-600 ml-2">({currency.symbol}) {currency.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay to close dropdowns when clicking outside */}
            {(isLanguageOpen || isCurrencyOpen) && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsLanguageOpen(false);
                        setIsCurrencyOpen(false);
                    }}
                />
            )}
        </div>
    );
}

export default TopBar;