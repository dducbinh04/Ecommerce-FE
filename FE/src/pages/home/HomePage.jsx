import { BestSellers } from "../../components/home/BestSellers";
import { HeroSection } from "../../components/home/HeroSection";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

export function HomePage() {
    return (
        <div className="min-h-screen bg-luxe-surface text-luxe-ink">
            <Header />
            <main>
                <HeroSection />
                <BestSellers />
            </main>
            <div className="h-4 bg-white" />
            <Footer />
        </div>
    );
}
