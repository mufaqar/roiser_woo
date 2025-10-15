import React from "react";

interface BannerProps {
  title?: string;
  breadcrumb?: string;
  image?: string;
}

const Banner: React.FC<BannerProps> = ({ title, breadcrumb, image }) => {
  return (
    <div
      className="h-50 w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${image || "/images/banner-bg.png"})` }}
    >
      <div className="container mx-auto">
        <div className="text-title flex flex-col md:flex-row items-center justify-between w-full px-8 gap-8">
          {title && (
            <h1 className="text-6xl font-semibold text-center md:text-left">
              {title}
            </h1>
          )}
          {breadcrumb && (
            <p className="text-xl text-center md:text-right max-w-md">
              Home / <span className="font-semibold">{breadcrumb}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
