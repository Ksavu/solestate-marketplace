import miamiImg from "./assets/miami-house.jpg";
import romeImg from "./assets/rome-apartment.jpg";
import dubaiImg from "./assets/dubai-apartment.jpg";
import React from "react";
import Header from "./components/Header";
import PropertyCard from "./components/PropertyCard";
import Footer from "./components/Footer";

const properties = [
  {
    image: romeImg,
    title: "Rome Apartment",
    location: "Rome, Italy",
    priceUSDC: 350_000,
  },
  {
    image: miamiImg,
    title: "Miami House",
    location: "Miami, FL",
    priceUSDC: 1_200_000,
  },
  {
    image: dubaiImg,
    title: "Dubai Apartment",
    location: "Dubai, UAE",
    priceUSDC: 900_000,
  },
];

function App() {
  return (
    <div className="min-h-screen bg-black text-white px-4 flex flex-col">
      <Header />

      {/* Intro section */}
      <section className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Explore Tokenized Real Estate with $SEST
        </h2>
        <p className="text-gray-300 text-sm md:text-lg">
          Buy, sell, and invest in real-world properties on the Solana blockchain. 
          Use <strong>USDC</strong>, <strong>SOL</strong>, or <strong>$SEST</strong>.
        </p>
      </section>

      {/* Properties grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {properties.map((p, idx) => (
          <PropertyCard
            key={idx}
            image={p.image}
            title={p.title}
            location={p.location}
            priceUSDC={p.priceUSDC}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;
