"use client";
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

type ShopItem = {
  id: number;
  title: string;
  description: string;
  details: string;
  price: number;
  type: "unlock";
  unlockName: string; // name of unlock for usegamestate to actually unlock it.
  isUnlocked: boolean;
};

const shopItems: ShopItem[] = [
  {
    id: 1,
    title: "Unlock New Math for Practice Mode",
    description: "3 Digit Addition",
    details: "Unlocks 3 digit addition problems for practice mode",
    price: 30,
    type: "unlock",
    unlockName: "Addition3",
    isUnlocked: false,
  },
];

export default function ShopClient() {
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
              console.log(item.unlockName);
            }}
            isUnlocked={item.isUnlocked}
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
