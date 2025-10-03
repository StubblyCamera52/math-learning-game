"use client";

import { SidebarTrigger } from "./ui/sidebar";
import CoinCounter from "./game/coinCounter";
import { useGame } from "./game/gameContextProvider";

export default function TopBar() {
  const gameState = useGame();

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <SidebarTrigger />
      <CoinCounter coins={gameState.coins} />
    </div>
  );
}
