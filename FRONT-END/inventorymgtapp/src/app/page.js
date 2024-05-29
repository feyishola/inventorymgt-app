import Image from "next/image";
import Hero from "./components/hero";
import Carousel from "./components/carousel";
import ProductCard from "./components/products";
import NavBar from "./components/header";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="bg-gray-100 relative">
      <NavBar />
      <div className="container mx-auto">
        <Hero bgColor={"#8897E8"} />
        <Carousel />
        <ProductCard />
      </div>
      <Footer />
    </main>
  );
}
// className="flex min-h-screen flex-col items-center justify-between p-24"
