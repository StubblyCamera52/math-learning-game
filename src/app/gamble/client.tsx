"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { useEffect, useRef } from "react";
import Canvas from "@/components/ui/canvas";

export default function GamebleClient() {
  const { coins, multiplyCoins } = useGame();

  useEffect(() => {
      multiplyCoins(2);
  }, [])

  return (<div><Canvas /></div>);
}
