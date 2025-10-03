import GamebleClient from "./client";

export default function GamblePage() {
  return (
      <div className="flex flex-col gap-8 items-center justify-center bg-background h-full">
        <GamebleClient />
      </div>
    );
}