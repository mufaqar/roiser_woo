"use client";

import React, { useState } from "react";
import Image from "next/image";
import SideBar from "@/components/BlogPage/SideBar";
import Link from "next/link";
import { FaClock, FaFolder } from "react-icons/fa";
import AnimateOnScroll, { useAutoDelay } from "../Animation";

export default function BlogDetails() {
    const getDelay = useAutoDelay();
    const [comments, setComments] = useState([
        { id: 1, name: "Amelia Green", text: "Nice article — learned a lot!", date: "Oct 3, 2025" },
        { id: 2, name: "James Lee", text: "Thanks for the clear examples.", date: "Oct 5, 2025" }
    ]);

    const [form, setForm] = useState({ name: "", email: "", comment: "" });



    const tags = ["Design", "Tailwind", "Next.js", "React", "CSS"];

    function handleChange(e: any) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        if (!form.name || !form.comment) return;
        setComments(prev => [
            ...prev,
            { id: Date.now(), name: form.name, text: form.comment, date: new Date().toLocaleDateString() }
        ]);
        setForm({ name: "", email: "", comment: "" });
    }

    return (
        <div className="container mx-auto px-4 py-8 ">
            <AnimateOnScroll type="fade-up" delay={getDelay()}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main column */}
                    <main className="lg:col-span-8 bg-[#E5E7EB] rounded-md pb-14">
                        <article className=" overflow-hidden">
                            {/* Hero Image */}
                            <div className="relative h-64 sm:h-96 w-full bg-gray-100 rounded-sm">
                                {/* Replace src with your image path */}
                                <Image src="/images/COLLECTION.png" alt="hero" fill className="object-cover rounded-t-md" />
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex items-center text-sm text-description gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <FaClock />
                                        <span>Oct 10, 2025</span>
                                    </div>

                                    <FaFolder />
                                    <span className="uppercase text-xs text-description">Modern Fashion</span>
                                </div>

                                <h1 className="text-2xl md:text-3xl font-semibold text-title mb-4">
                                    Fueling Your Passion for All Things Stylish
                                </h1>


                                <p className="text-description leading-relaxed mb-6">
                                    Donec rutrum congue leo eget malesuada. Curabitur aliquet quam posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpa estibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                </p>
                                <p className="text-description leading-relaxed mb-6">
                                    Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus Vestibulum ante ipsum primis in faucibus orci luctus  ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam ullamcorper sit amet ligula.
                                </p>

                                <h3 className="text-md md:text-2xl font-semibold text-title mb-4">
                                    “Cras ultricies ligula sed magna dictum porta aesent sapien massa pellentesque nec egestas vamus magna justo”
                                </h3>

                                <p className="text-description leading-relaxed mb-6">
                                    Aptent vestibulum sodales porttitor hac torquent commodo magnis cum molestie donec, egestas ultrices ultricies eget sapien tortor odio condimentum dictum eu, lacus phasellus velit elementum maecenas fringilla placerat suscipit libero. Suscipit fermentum rutrum nisl lacinia varius duis euismod a praesent feugiat inceptos leo, senectus ac facilisis placerat mi posuere lobortis aliquam litora eget dictumst semper, vestibulum morbi aenean volutpat accumsan.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="h-60  rounded-md overflow-hidden relative">
                                        <Image src="/images/COLLECTION.png" alt="thumb1" fill className="object-cover" />
                                    </div>
                                    <div className="h-60 rounded-md overflow-hidden relative">
                                        <Image src="/images/COLLECTION.png" alt="thumb2" fill className="object-cover" />
                                    </div>
                                </div>

                                <p className="text-description leading-relaxed mb-6">
                                    Vestibulum ante ipsum primis in faucibus orci luctus  ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam ullamcorper sit amet ligula. Quisque velit , pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                                </p>

                            </div>
                        </article>

                        {/* Comments */}
                        <section className="mt-8 p-6">
                            <h4 className="font-medium mb-3 text-3xl">Add a Review</h4>
                            <p className="text-description leading-relaxed mb-6">
                                Your email address will not be published. Required fields are marked*
                            </p>
                            <form onSubmit={handleSubmit} className="mt-6  ">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your Name*"
                                        className="rounded px-3 py-2 w-full bg-white outline-none"
                                    />
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email Address*"
                                        className="rounded px-3 py-2 w-full bg-white outline-none"
                                    />
                                </div>
                                <textarea
                                    name="comment"
                                    value={form.comment}
                                    onChange={handleChange}
                                    placeholder="Your Reviews*"
                                    className="bg-white rounded px-3 py-2 w-full mt-4 h-28 outline-none"
                                />

                                <button className="bg-[#2F4761] text-white px-4 py-2 mt-5 rounded">
                                    <Link href='/' className="mt-3 ">Submit Now</Link>
                                </button>

                            </form>
                        </section>
                    </main>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <SideBar />
                    </div>

                </div>
            </AnimateOnScroll>
        </div>
    );
}


