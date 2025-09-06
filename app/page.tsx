"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturedProducts from "@/components/product";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
      {/* You can add more page content here */}
    </>
  );
}
