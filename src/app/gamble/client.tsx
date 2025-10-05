"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { useEffect, useRef, useState } from "react";
import Matter, { Body } from "matter-js";
import { toast } from "sonner";

export default function GamebleClient() {
  const { coins, multiplyCoins } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const puckRef = useRef<Matter.Body>(null);

  useEffect(() => {
    // this is an aboslute nightmare... but it works.
    if (!canvasRef.current) return;

    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let Bodies = Matter.Bodies;
    let Events = Matter.Events;
    let Composite = Matter.Composite;

    let engine = Engine.create();
    let render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 700,
        background: "#FDFBD4",
        wireframeBackground: "#222",
        hasBounds: true,
        wireframes: false,
        showDebug: true,
      },
    });

    // @ts-ignore
    Matter.Render.setPixelRatio(render, "auto");

    let puck = Bodies.circle(100, 0, 10, {
      restitution: 0.8,
      friction: 0,
      render: {
        fillStyle: "#545333"
      },
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
        Bodies.circle(i * 60 + 30, 200, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 250, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 30, 300, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 350, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 30, 400, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 450, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 30, 500, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60, 550, 15, {
          isStatic: true,
        })
      );
      pegs.push(
        Bodies.circle(i * 60 + 30, 600, 15, {
          isStatic: true,
        })
      );
    }

    for (let i = 1; i < 10; i++) {
      pegs.push(Bodies.rectangle(60 * i, 700, 10, 130, { isStatic: true }));
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
          puckBody.render.fillStyle = "#ff0000";
          puckBody.isStatic = true;

          const x = puckBody.position.x;

          if (x < 60 || x > 540) {
            multiplyCoins(4);
            toast("4X COINS!!!");
          } else if ((x > 60 && x < 120) || (x < 540 && x > 480)) {
            multiplyCoins(2);
            toast("2X COINS");
          } else if ((x > 120 && x < 180) || (x < 480 && x > 420)) {
            multiplyCoins(1.5);
            toast("1.5X Coins");
          } else if ((x > 180 && x < 240) || (x < 420 && x > 360)) {
            multiplyCoins(1);
            toast("1X coins.");
          } else if (x > 240 && x < 360) {
            multiplyCoins(0.5);
            toast("0.5X Coins :(")
          }
          break;
        }
      }
    });

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && puckRef.current) {
        event.preventDefault();

        const randomX = Math.random() * 500 + 50;
        Body.setPosition(puckRef.current, { x: randomX, y: 50 });
        Body.setVelocity(puckRef.current, { x: 0, y: 0 });
        Body.setAngularVelocity(puckRef.current, 0);
        puckRef.current.render.fillStyle = "#545333"
        puckRef.current.isStatic = false;
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
      <canvas ref={canvasRef} className="rounded-xl"/>
    </div>
  );
}
