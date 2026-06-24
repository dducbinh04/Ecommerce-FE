import { BestSellers } from "../../components/home/BestSellers";
import { FeaturedCategories } from "../../components/home/FeaturedCategories";
import { HeroSection } from "../../components/home/HeroSection";
import { NewsletterSection } from "../../components/home/NewsletterSection";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

export function HomePage() {
    return (
        <div className="min-h-screen bg-luxe-surface text-luxe-ink">
            <Header />
            <main>
                <HeroSection />
                <FeaturedCategories />
                <BestSellers />
                <NewsletterSection />
            </main>
            <div className="h-4 bg-white" />
            <Footer />
        </div>
    );
}
