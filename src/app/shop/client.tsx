"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

type ShopItem = {
  id: number;
  title: string;
  description: string;
  details: string;
  price: number;
  type: "unlock";
  unlockName: string; // name of unlock for usegamestate to actually unlock it.
};

const shopItems: ShopItem[] = [
  {
    id: 1,
    title: "Unlock New Math",
    description: "3 Digit Addition",
    details: "3 digit addition problems for practice mode",
    price: 5,
    type: "unlock",
    unlockName: "arithmetic_addition_3",
  },
  {
    id: 2,
    title: "Unlock New Math",
    description: "1 Step Rational Equation",
    details: "1 step rational equations for practice mode",
    price: 5,
    type: "unlock",
    unlockName: "rational_one_step",
  },
];

export default function ShopClient() {
  const gameState = useGame();

  return (
    <div>
      {shopItems.map((item, index) => {
        return (
          <ShopItemCard
            id={item.id}
            title={item.title}
            description={item.description}
            key={index}
            details={item.details}
            price={item.price}
            type={item.type}
            onBuy={() => {
              if (
                gameState.coins >= item.price &&
                !gameState.unlockedQuestionPools.includes(item.unlockName)
              ) {
                console.log(item.unlockName);
                gameState.unlockQuestionPool(item.unlockName);
                gameState.setCoins((prevCoins) => prevCoins - item.price);
              } else {
                toast(
                  "Not enough coins. Maybe go do some gambling or answer some math questions."
                );
              }
            }}
            isUnlocked={gameState.unlockedQuestionPools.includes(
              item.unlockName
            )}
          />
        );
      })}
    </div>
  );
}

interface ShopItemProps {
  id: number;
  title: string;
  description: string;
  details: string;
  price: number;
  type: "unlock";
  isUnlocked: boolean;
  onBuy: () => void;
}

const ShopItemCard: React.FC<ShopItemProps> = (props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">{props.title}</CardTitle>
        <CardDescription className="text-center">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.details}</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="font-bold">{props.price} Coins</p>
        {props.isUnlocked ? (
          <Button className="w-full" variant={"ghost"}>
            Bought
          </Button>
        ) : (
          <Button className="w-full" variant={"outline"} onClick={props.onBuy}>
            Buy
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
