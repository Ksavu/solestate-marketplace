import React from "react";
import Logo from "../assets/solestate-logo.png"; // Updated SolEstate logo
import { FaTelegramPlane } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X (formerly Twitter)

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="SolEstate Logo" className="w-20" />
          <span className="text-sm md:text-base text-gray-400">
            &copy; {new Date().getFullYear()} SolEstate Marketplace
          </span>
        </div>

        {/* Social links */}
        <div className="flex gap-4 text-xl">
          {/* X */}
          <a
            href="https://x.com/bruceaijames?s=21" // Update with your real X link
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-3 rounded-full bg-black text-white
                       hover:bg-gray-800 transition-colors duration-300"
            aria-label="X"
          >
            <SiX className="relative z-10 w-5 h-5" />
            <span className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-20"></span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/+7oS-knmsPsY4OGFk" // Updated Telegram link
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-3 rounded-full bg-[#0088cc] text-white
                       hover:bg-[#007ab8] transition-colors duration-300"
            aria-label="Telegram"
          >
            <FaTelegramPlane className="relative z-10 w-5 h-5" />
            <span className="absolute inset-0 rounded-full bg-[#00aaff]/30 blur-xl opacity-30"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
