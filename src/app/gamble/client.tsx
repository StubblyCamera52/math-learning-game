"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { useEffect, useRef } from "react";

export default function GamebleClient() {
  const { coins, multiplyCoins } = useGame();

  useEffect(() => {
      multiplyCoins(2);
  }, [])

  return (<></>);
}
