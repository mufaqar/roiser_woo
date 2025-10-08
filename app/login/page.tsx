import Banner from "@/components/Banner";

import Login from "@/components/Login/Login";

export default function Home() {
  return (
    <>
      <Banner title="Login" breadcrumb="Login" />
      <Login />
    </>
  );
}
