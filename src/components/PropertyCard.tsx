import React, { useEffect, useState } from "react";
import solIcon from "../assets/sol.png";
import usdcIcon from "../assets/usdc.png";
import sestIcon from "../assets/sest.png"; // Updated SEST icon

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface Props {
  image: string;
  title: string;
  location: string;
  priceUSDC: number;
}

// Wallet koji prima novac (seller / escrow)
const SELLER_WALLET = new PublicKey(
  "7ALEjJAikbPcRcTRT6722UEa18tHLf5cnz72SABy5NUg"
);

const PropertyCard: React.FC<Props> = ({ image, title, location, priceUSDC }) => {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  const [solPrice, setSolPrice] = useState<number>(0);

  // Fetch SOL/USD price
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        const solUsd = data.solana.usd;
        setSolPrice(priceUSDC / solUsd);
      } catch (err) {
        console.error("Error fetching SOL price:", err);
      }
    };
    fetchSolPrice();
  }, [priceUSDC]);

  const buyWithSOL = async () => {
    if (!publicKey) {
      alert("Please connect your wallet");
      return;
    }

    try {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: SELLER_WALLET,
          lamports: Math.round(solPrice * LAMPORTS_PER_SOL),
        })
      );

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      alert("Property purchased successfully with SOL!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  const buyWithUSDC = async () => {
    // TODO: Implement USDC transfer logic via SPL token
    alert("USDC purchase coming soon!");
  };

  return (
    <div className="bg-[#0b0b0b] border border-gray-700 rounded-xl shadow-lg overflow-hidden max-w-sm">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{location}</p>

        {/* Buy buttons */}
        <div className="flex flex-col gap-2 mt-3">
          {/* USDC button */}
          <button
            onClick={buyWithUSDC}
            disabled={!connected}
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded text-white font-bold
              ${connected ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 cursor-not-allowed"}`}
            title="$SEST holders get discounted buy fees & rewards from platform fees"
          >
            <img src={usdcIcon} className="w-5 h-5" alt="USDC" />
            {priceUSDC.toLocaleString()} USDC
          </button>
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
            <img src={sestIcon} className="w-4 h-4" alt="$SEST" />
            $SEST holders: discounted buy fees & rewards
          </p>

          {/* SOL button */}
          <button
            onClick={buyWithSOL}
            disabled={!connected || solPrice === 0}
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded text-white font-bold
              ${connected && solPrice > 0 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-600 cursor-not-allowed"}`}
            title="$SEST holders get discounted buy fees & rewards from platform fees"
          >
            <img src={solIcon} className="w-5 h-5" alt="SOL" />
            {solPrice > 0 ? solPrice.toFixed(3) : "..."} SOL
          </button>
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
            <img src={sestIcon} className="w-4 h-4" alt="$SEST" />
            $SEST holders: discounted buy fees & rewards
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
