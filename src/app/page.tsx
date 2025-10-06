import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>
          Answer questions to get coins and then gamble those coins or unlock
          new question pools in the shop.
          <br />
          <br />
          Head over to practice to start!
        </p>
      </main>
    </div>
  );
}
