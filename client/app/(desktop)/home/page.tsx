import Brands from "@/components/desktop/Blocks/Brands/Brands";
import Download from "@/components/desktop/Blocks/Download/Download";
import Hero from "@/components/desktop/Blocks/Hero/Hero";
import Products from "@/components/desktop/Blocks/Products/Products";
import Services from "@/components/desktop/Blocks/Services/Services";
import WhyGetLook from "@/components/desktop/Layout/WhyGetLook/WhyGetLook";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Hero/>
      <Services/>
      <WhyGetLook/>
      <Products/>
      <Brands/>
      <Download/>
    </main>
  );
}
