import React from "react";
import Logo from "../assets/solestate-logo.png"; // Updated logo
import HeroBg from "../assets/hero-bg.jpg";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaDollarSign, FaCoins } from "react-icons/fa";

const Header = () => {
  return (
    <header
      className="relative mb-16 px-4 py-16 text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <img src={Logo} className="mx-auto w-32 mb-4" alt="SolEstate Logo" />

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Tokenized Real Estate Marketplace
        </h1>

        <p className="text-gray-300 text-sm md:text-lg mb-8">
          Buy, sell, and invest in <strong>real-world property</strong> using{" "}
          <strong>USDC</strong>, <strong>SOL</strong>, or <strong>$SEST</strong>
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <WalletMultiButton />

          <a
            href="/SolEstate_Whitepaper.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3
              rounded-xl border border-gray-500 text-white
              hover:bg-white hover:text-black transition"
          >
            📄 Download Whitepaper
          </a>
        </div>

        {/* $SEST Holder Benefits */}
        <div className="flex flex-col md:flex-row justify-center gap-4 text-white text-sm md:text-base">

          {/* Discounted fees */}
          <div className="relative group flex items-center gap-2 bg-gray-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-700 cursor-default">
            <FaDollarSign className="text-yellow-400" />
            Discounted marketplace fees for $SEST holders

            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
              w-72 text-xs text-gray-200 bg-black/90 border border-gray-700
              rounded-lg px-4 py-3 opacity-0 group-hover:opacity-100
              transition-opacity duration-300 pointer-events-none">
              Hold $SEST to unlock lower fees and free property listings — rewards
              based on your token balance.
            </div>
          </div>

          {/* Staking rewards */}
          <div className="relative group flex items-center gap-2 bg-gray-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-700 cursor-default">
            <FaCoins className="text-green-400" />
            Stake $SEST and earn 30% of platform profits

            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
              w-72 text-xs text-gray-200 bg-black/90 border border-gray-700
              rounded-lg px-4 py-3 opacity-0 group-hover:opacity-100
              transition-opacity duration-300 pointer-events-none">
              $SEST stakers receive 30% of marketplace revenue — distributed
              proportionally to the amount staked.
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
