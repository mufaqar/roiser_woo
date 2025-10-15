import Image from 'next/image';
import React from 'react';
import { FaRegClock } from 'react-icons/fa'; // Importing a clock icon for the date

function SideBar() {
    const categories = [
        { id: 1, name: "Latest News", count: null },
        { id: 2, name: "Today Beat Posts", count: null },
        { id: 3, name: "Design Trend", count: null },
        { id: 4, name: "UI/UX Tips", count: null },
        { id: 5, name: "Brand Design", count: null }
    ];

    const latestPosts = [
        { id: 1, title: "Bridging the Gap Between Runway and Reality", date: "SEP 25, 2022", image: "/images/card-img.png" },
        { id: 2, title: "Bridging the Gap Between Runway and Reality", date: "SEP 25, 2022", image: "/images/card-img.png" },
        { id: 3, title: "Bridging the Gap Between Runway and Reality", date: "SEP 25, 2022", image: "/images/card-img.png" }
    ];

    const tags = ["DREAM", "RINGS", "BIRTHDAY", "GIFTS", "NEAKLACE", "CHAIN", "BRACLET"];

    const instagramPosts = [
        "/images/card-img.png",
        "/images/card-img.png",
        "/images/card-img.png",
        "/images/card-img.png",
        "/images/card-img.png",
        "/images/card-img.png",
    ];

    return (
        <aside className="w-full bg-white p-6">
            {/* Search Bar */}
            <div className="mb-8 p-6 bg-white shadow-sm rounded-md">
                <input
                    type="text"
                    placeholder="Search Here"
                    className="w-full p-3  bg-[#F4F5F7] rounded-md focus:outline-none  "
                />
            </div>

            {/* Categories */}
            <div className="mb-8 bg-white shadow-sm p-6 rounded-md">
                <h3 className="text-xl font-semibold text-title mb-3">Categories</h3>
                <hr className='text-[#E5E7EB]'/>
                <ul className="space-y-3 mt-4">
                    {categories.map((category) => (
                        <li key={category.id} className="flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                className="mr-2 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                            />
                            <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                                {category.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Latest Posts */}
            <div className="mb-8 bg-white shadow-sm p-6 rounded-md">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Latest Posts</h3>
                <hr className='text-[#E5E7EB]'/>
                <div className="space-y-6 mt-4">
                    {latestPosts.map((post) => (
                        <div key={post.id} className="flex items-start space-x-4">
                            <div className="relative w-20 h-20 bg-gray-200 rounded-md flex-shrink-0">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-description flex items-center mb-1">
                                    <FaRegClock className="mr-1" /> {post.date}
                                </p>
                                <p className="text-sm font-semibold text-title hover:text-description cursor-pointer">
                                    {post.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="mb-8 bg-white shadow-sm p-6 rounded-md">
                <h3 className="text-lg font-bold text-title mb-3">Tags</h3>
                <hr className='text-[#E5E7EB]'/>
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-[#2F4761] hover:text-white cursor-pointer transition-colors duration-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Instagram Posts */}
            <div className='mb-8 bg-white shadow-sm p-6 rounded-md'>
                <h3 className="text-lg font-bold text-title mb-3">Instagram Posts</h3>
                <hr className='text-[#E5E7EB]'/>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {instagramPosts.map((src, index) => (
                        <div key={index} className="relative w-full h-20 bg-gray-200 rounded-md overflow-hidden">
                            <Image
                                src={src}
                                alt={`Instagram post ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default SideBar;