"use client";
import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaMedal } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import AnimateOnScroll, { useAutoDelay } from '../Animation';
import Image from 'next/image';

const newsArticles = [
  {
    id: 1,
    imageSrc: '/images/news-image-1.png',
    altText: 'Decorated living room with couch and colorful pillows',
    date: 'March 15, 2022',
    category: 'OIL CHANGE',
    title: 'HOW TO DECORATE YOUR CAR FOR HALLOWEEN',
    readMoreLink: '/single-blog',
  },
  {
    id: 2,
    imageSrc: '/images/news-image-1.png',
    altText: 'Modern living room with light grey couch and colorful pillows',
    date: 'March 15, 2022',
    category: 'OIL CHANGE',
    title: 'HOW TO DECORATE YOUR CAR FOR HALLOWEEN',
    readMoreLink: '/single-blog',
  },
  {
    id: 3,
    imageSrc: '/images/news-image-1.png',
    altText: 'Decorated living room with couch and colorful pillows',
    date: 'March 15, 2022',
    category: 'OIL CHANGE',
    title: 'HOW TO DECORATE YOUR CAR FOR HALLOWEEN',
    readMoreLink: '/single-blog',
  },
  {
    id: 4,
    imageSrc: '/images/news-image-1.png',
    altText: 'Luxury car interior',
    date: 'April 2, 2023',
    category: 'MAINTENANCE',
    title: 'KEEP YOUR CAR INTERIOR SHINING LIKE NEW',
    readMoreLink: '/single-blog',
  },
  {
    id: 5,
    imageSrc: '/images/news-image-1.png',
    altText: 'Car care workshop',
    date: 'May 10, 2023',
    category: 'SERVICE',
    title: 'WHY REGULAR CAR SERVICE IS IMPORTANT',
    readMoreLink: '/single-blog',
  },
  {
    id: 6,
    imageSrc: '/images/news-image-1.png',
    altText: 'Driver cleaning car',
    date: 'June 20, 2023',
    category: 'CLEANING',
    title: 'THE ULTIMATE CAR CLEANING GUIDE',
    readMoreLink: '/single-blog',
  },
];

interface NewsProps {

  limit?: number; // optional prop (default = 3)
}

function News({ limit = 3 }: NewsProps) {
  const getDelay = useAutoDelay();
  const displayedArticles = newsArticles.slice(0, limit);

  return (
    <div className="container mx-auto px-4 py-20">
      <AnimateOnScroll type="fade-up" delay={getDelay()}>
        <h2 className="text-center text-4xl font-semibold mb-8">
          OUR LATEST NEWS INSIGHT
        </h2>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedArticles.map((article) => (
          <AnimateOnScroll key={article.id} type="fade-up" delay={getDelay()}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href='/single-blog'>
                <Image
                  src={article.imageSrc}
                  alt={article.altText}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </Link>
              <div className="p-4 pb-6">
                <div className="flex items-center text-[#74787C] text-sm mb-2">
                  <span className="mr-3 flex items-center gap-1">
                    <MdOutlineDateRange className="text-title text-xl" />
                    {article.date}
                  </span>
                  <span className="mr-3 flex items-center gap-1">
                    <FaMedal className="text-title text-md mt-1" />
                    {article.category}
                  </span>
                </div>
                <Link href='/single-blog'>
                <h3 className="text-2xl font-semibold mb-3">{article.title}</h3>
                </Link>
                <div className="border border-[#EAEAEA] mb-5 mt-5"></div>
                <div className="flex items-center gap-2 text-title">
                  <Link href={article.readMoreLink} className="font-semibold">
                    Read More
                  </Link>
                  <FaArrowRight className="mt-1" />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}

export default News;
