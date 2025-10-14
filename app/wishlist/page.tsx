import Banner from "@/components/Banner";
import WishlistGrid from "@/components/WishlistPage/WishlistGrid";

export default function WishlistPage() {
  return (
    <>
      <Banner title="My Wishlist" breadcrumb="Wishlist" />
      <WishlistGrid />
    </>
  );
}
