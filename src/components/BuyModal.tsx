import React, { useState, useEffect } from "react";
import USDCIcon from "../assets/usdc.png";
import SOLIcon from "../assets/sol.png";
import sestIcon from "../assets/sest.png"; // Updated icon

interface Props {
  onBuySOL: (amount: string, solAmount: number) => void;
  onBuyUSDC: (amount: string) => void;
  onClose: () => void;
  maxSupply: number;
  sold: number;
  priceUSDC: number; // USDC price for 1 $SEST
}

const BuyModal: React.FC<Props> = ({
  onBuySOL,
  onBuyUSDC,
  onClose,
  maxSupply,
  sold,
  priceUSDC,
}) => {
  const [amount, setAmount] = useState("1");
  const [solPrice, setSolPrice] = useState<number>(0);
  const percent = Math.min((sold / maxSupply) * 100, 100);

  // Fetch SOL/USD price
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        setSolPrice(data.solana.usd);
      } catch (err) {
        console.error("Error fetching SOL price:", err);
      }
    };
    fetchSolPrice();
  }, []);

  // Calculate how much SOL is needed for given amount of $SEST
  const solAmount = solPrice ? (parseFloat(amount) * priceUSDC) / solPrice : 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-[#0b0b0b] p-6 rounded-xl max-w-md w-full border border-gray-700 shadow-xl">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">$SEST Presale</h2>
          <p className="text-gray-400 text-sm">
            Price: {priceUSDC} USDC (~{solAmount.toFixed(3)} SOL)
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span>
            {sold.toLocaleString()} / {maxSupply.toLocaleString()} $SEST sold
          </span>
        </div>

        {/* Input */}
        <input
          type="number"
          className="w-full p-3 rounded bg-black border border-gray-700 mb-4 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount of $SEST"
        />

        {/* Buy buttons */}
        <div className="flex flex-col gap-2 mb-4">
          {/* SOL button */}
          <button
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded bg-teal-400 text-black font-bold hover:opacity-90"
            onClick={() => onBuySOL(amount, solAmount)}
            title="$SEST holders get discounted buy fees & fee rewards from platform fees"
          >
            <img src={SOLIcon} alt="SOL" className="w-5 h-5" />
            Buy with SOL (~{solAmount.toFixed(3)} SOL)
          </button>
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
            <img src={sestIcon} className="w-4 h-4" alt="$SEST" />
            $SEST holders: discounted buy fees & fee rewards
          </p>

          {/* USDC button */}
          <button
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600"
            onClick={() => onBuyUSDC(amount)}
            title="$SEST holders get discounted buy fees & fee rewards from platform fees"
          >
            <img src={USDCIcon} alt="USDC" className="w-5 h-5" />
            Buy with USDC ({(parseFloat(amount) * priceUSDC).toLocaleString()} USDC)
          </button>
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
            <img src={sestIcon} className="w-4 h-4" alt="$SEST" />
            $SEST holders: discounted buy fees & fee rewards
          </p>
        </div>

        <button
          className="w-full p-3 rounded bg-gray-700 text-white hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyModal;
