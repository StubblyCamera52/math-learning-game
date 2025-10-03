import React from "react";

interface CoinCounterProps {
  coins: number;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ coins }) => {
  return (
    <div className="flex items-center gap-2 bg-yellow-400 px-3 py-0.5 rounded-lg border border-yellow-300">
      <span className="text-xl">🪙</span>
      <span className="font-semibold text-yellow-800">{coins}</span>
    </div>
  );
};

export default CoinCounter;