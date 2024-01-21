import HeroSection from "../components/HeroSection";

import Marcas from "../components/Marcas";


export default function HomePage() {
    return (
        <>
            <section>
                <HeroSection />
            </section>
            <div>
                <Marcas />
            </div>
        </>
    );
}