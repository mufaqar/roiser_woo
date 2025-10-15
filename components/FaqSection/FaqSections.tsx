"use client"
import React, { useState } from 'react';
import AnimateOnScroll, { useAutoDelay } from '../Animation';

function FaqSections() {
  const getDelay = useAutoDelay();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'How can vendor role to the customer?',
      answer:
        'Convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Vestibulum diam sit amet quam vehicula elementum sed dit dui. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.',
    },
    {
      question: 'What benefits a customer can take?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'What is your return & exchange policy?',
      answer:
        'We offer a 30-day return policy on all eligible items. Items must be in their original condition and packaging. Please refer to our full policy for more details.',
    },
    {
      question: 'How long will it take for me to get my order?',
      answer:
        'Delivery times vary depending on your location and the shipping method selected. Typically, orders are delivered within 5-10 business days.',
    },
    {
      question: 'Can I personally pick up my order?',
      answer:
        'Yes, local pickup is available at our warehouse during business hours. Please select the "Pickup" option at checkout and wait for a confirmation email.',
    },
    {
      question: 'I need to update my shipping address!',
      answer:
        'If your order has not yet shipped, please contact our customer service immediately to update your shipping address. Once shipped, changes may not be possible.',
    },
    {
      question: 'Will I pay for any customs duties and taxes?',
      answer:
        'International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. Please check with your local customs office for more information.',
    },
  ];

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 container mx-auto ">
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-title mb-10">Frequently asked questions</h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* FAQ Section */}
            <div className="lg:w-1/2 w-full space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-md">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-title">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-description transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="p-4 pt-0 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Form Section */}
            <div className="lg:w-1/2 w-full bg-[#F4F5F7] p-8 rounded-md shadow-sm">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full bg-white px-4 py-3 border border-[#E5E7EB] outline-none rounded-md shadow-sm  sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full px-4 bg-white py-3 border border-[#E5E7EB] rounded-md shadow-sm outline-none sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Type Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="block w-full px-4 bg-white py-3 border border-[#E5E7EB] rounded-md shadow-sm outline-none sm:text-sm"
                    placeholder="Type Message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2F4761]  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    SUBMIT NOW
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}

export default FaqSections;