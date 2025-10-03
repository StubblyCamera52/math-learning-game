"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import useGameState, { GameState } from "@/hooks/useGameState";

const GameContext = createContext<GameState | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};

export const GameProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const gameState = useGameState();

  useEffect(() => {
    console.log('GameProvider mounted');
    return () => console.log('GameProvider unmounting');
  }, []);

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}