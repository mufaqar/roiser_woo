import Banner from "@/components/Banner";
import BlogDetails from "@/components/BlogPage/BlogDetails";


export default function Singleblog() {
  return (
    <>
      <Banner title="Blog Details" breadcrumb="Blog Details" />
        <BlogDetails />
    </> 
  );
}
