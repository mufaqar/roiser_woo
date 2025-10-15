import Banner from "@/components/Banner";
import Register from "@/components/Register/Register";

export default function Home() {
  return (
    <>
      <Banner title="Register" breadcrumb="Register" />
      <Register />
    </>
  );
}
