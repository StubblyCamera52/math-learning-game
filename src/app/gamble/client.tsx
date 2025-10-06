"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { useEffect, useRef, useState } from "react";
import Matter, { Body, World } from "matter-js";
import { toast } from "sonner";

export default function GamebleClient() {
  const { coins, multiplyCoins, setCoins } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const puckRef = useRef<Matter.Body>(null);
  const coinsRef = useRef<number>(coins);
  const [notDropped, setNotDropped] = useState<boolean>(true);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    // this is an aboslute nightmare... but it works.
    if (!canvasRef.current) return;

    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let Bodies = Matter.Bodies;
    let Events = Matter.Events;
    let Composite = Matter.Composite;
    let Sleeping = Matter.Sleeping;

    let engine = Engine.create();
    let render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 700,
        background: "#FDFBD4",
        wireframeBackground: "#222",
        hasBounds: false,
        wireframes: false,
        showDebug: false,
        showSleeping: false,
      },
    });

    engine.enableSleeping = true;

    // @ts-ignore
    Matter.Render.setPixelRatio(render, "auto");

    let puck = Bodies.circle(100, 50, 10, {
      restitution: 0.9,
      friction: 0,
      render: {
        fillStyle: "#545333",
      },
      isStatic: true,
    });

    puckRef.current = puck;

    let walls: Matter.Body[] = [];
    walls.push(
      Bodies.rectangle(300, 704, 700, 10, {
        isStatic: true,
      })
    );
    walls.push(
      Bodies.rectangle(-4, 350, 10, 800, {
        isStatic: true,
      })
    );
    walls.push(
      Bodies.rectangle(604, 350, 10, 800, {
        isStatic: true,
      })
    );
    let plinkoDetector = Bodies.rectangle(300, 700, 700, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: "transparent",
      },
    });

    let plinkoTexture = Bodies.rectangle(345, 670, 1, 1, {
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: "transparent",
        sprite: { texture: "/Multiplier.png", xScale: 0.5, yScale: 0.5 },
      },
    });

    let pegs: Matter.Body[] = [];

    for (let i = 0; i < 11; i++) {
      pegs.push(
        Bodies.circle(i * 60, 250, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 350, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 450, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 550, 15, {
          isStatic: true,
        })
      );
    }

    for (let i = 0; i < 8; i++) {
      pegs.push(
        Bodies.circle(i * 60 + 90, 200, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 90, 300, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 90, 400, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 90, 500, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 90, 600, 15, {
          isStatic: true,
        })
      );
    }

    for (let i = 1; i < 10; i++) {
      pegs.push(Bodies.rectangle(60 * i, 700, 2, 130, { isStatic: true }));
    }

    Events.on(engine, "collisionStart", function (event) {
      var pairs = event.pairs;

      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        let puckBody: Matter.Body | null = null;

        if (pair.bodyA === plinkoDetector && !pair.bodyB.isStatic) {
          puckBody = pair.bodyB;
          // console.log("a");
        } else if (pair.bodyB === plinkoDetector && !pair.bodyA.isStatic) {
          puckBody = pair.bodyA;
          // console.log("b");
        }

        if (puckBody) {
          //puckBody.render.fillStyle = "#ff0000";
          puckBody.isStatic = true;

          const x = puckBody.position.x;

          if (x < 60 || x > 540) {
            setCoins((c) => c + 8);
            toast("Net +6 Coins");
          } else if ((x > 60 && x < 120) || (x < 540 && x > 480)) {
            setCoins((c) => c + 4);
            toast("Net +2 Coins");
          } else if ((x > 120 && x < 180) || (x < 480 && x > 420)) {
            setCoins((c) => c + 3);
            toast("Net +1 Coin");
          } else if ((x > 180 && x < 240) || (x < 420 && x > 360)) {
            setCoins((c) => c + 2);
            toast("Net +0 Coins");
          } else if (x > 240 && x < 360) {
            setCoins((c) => c + 1);
            multiplyCoins(0.5);
            toast("Net -1 Coin");
          }
          setNotDropped(true);
          break;
        }
      }
    });

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && puckRef.current) {
        console.log(coinsRef.current);
        if (coinsRef.current < 2) {
          toast("your broke 😭 (you need 2 coins to play)");
          return;
        }

        if (puckRef.current.isStatic == true && notDropped) {
          setCoins((c) => c - 2);
          let p: Matter.Vector = { x: puckRef.current.position.x, y: 50 };
          event.preventDefault();
          World.remove(engine.world, puckRef.current);
          puckRef.current = null;
          let b = Bodies.circle(p.x, p.y, 10, {
            restitution: 0.9,
            friction: 0,
            render: {
              fillStyle: "#545333",
            },
          });
          Composite.add(engine.world, b);
          setNotDropped((b) => false);
          puckRef.current = b;
        } else if (puckRef.current.isSleeping == true) {
          setCoins((c) => c + 2);
          setNotDropped((b) => true);
          puckRef.current.isStatic = true;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    Composite.add(engine.world, [
      plinkoTexture,
      puck,
      plinkoDetector,
      ...walls,
      ...pegs,
    ]);

    Render.run(render);

    setInterval(function () {
      if (notDropped && puckRef.current && puckRef.current.isStatic) {
        Body.setPosition(puckRef.current, {
          x: Math.sin(engine.timing.timestamp / 1000) * 180 + 300,
          y: 50,
        });
      }

      Engine.update(engine, 1000 / 60);
    }, 1000 / 60);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div>
      <h1 className="text-lg">Press Space to play, Costs 2 Coins per Play</h1>
      <h3 className="text-sm">
        If puck gets stuck press space and you'll get your coins back
      </h3>
      <canvas ref={canvasRef} className="rounded-xl" />
    </div>
  );
}
