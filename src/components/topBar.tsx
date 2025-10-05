"use client";

import { SidebarTrigger } from "./ui/sidebar";
import CoinCounter from "./game/coinCounter";
import { useGame } from "./game/gameContextProvider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TopBar() {
  const gameState = useGame();

  return (
    <div className="flex justify-between items-center gap-3 p-2 fixed">
      <SidebarTrigger />
      <h2 className="font-bold">Question Pool: </h2>
      <Select
        defaultValue="linear_two_step"
        onValueChange={(value) => {
          gameState.setCurrentQuestionPool(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Question Pool" />
        </SelectTrigger>
        <SelectContent>
          {gameState.unlockedQuestionPools.map((pool, index) => {
            return (
              <SelectItem value={pool} key={index}>
                {pool}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <CoinCounter coins={gameState.coins} />
    </div>
  );
}
