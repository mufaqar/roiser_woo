import Banner from "@/components/Banner";
import News from "@/components/ShopGrid/News";




export default function Home() {
    return (
        <section>
            <Banner title="Blog Grid" breadcrumb="Blog-grid" />
            <News limit={6} />           
        </section>
    );
}
