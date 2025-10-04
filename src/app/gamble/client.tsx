"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function GamebleClient() {
  const { coins, multiplyCoins } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    multiplyCoins(2);

    // this is an aboslute nightmare... but it works.
    if (!canvasRef.current) return;

    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let Runner = Matter.Runner;
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
        background: "#fafafa",
        wireframeBackground: "#222",
        hasBounds: true,
        wireframes: false,
        showDebug: true,
      },
    });

    // @ts-ignore
    Matter.Render.setPixelRatio(render, "auto");

    let puck = Bodies.circle(100, 0, 10, { restitution: 0.99, friction: 0 });
    let walls: Matter.Body[] = [];
    walls.push(
      Bodies.rectangle(300, 700, 700, 10, {
        isStatic: true,
      })
    );
    walls.push(
      Bodies.rectangle(0, 350, 10, 800, {
        isStatic: true,
      })
    );
    walls.push(
      Bodies.rectangle(600, 350, 10, 800, {
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

        if (pair.bodyA === plinkoDetector) {
          pair.bodyB.render.fillStyle = "#ff0000";
          pair.bodyB.isStatic = true;
          if (pair.bodyB.position.x < 60 || pair.bodyB.position.x > 540) {
            multiplyCoins(4);
          } else if (
            (pair.bodyB.position.x > 60 && pair.bodyB.position.x < 120) ||
            (pair.bodyB.position.x < 540 && pair.bodyB.position.x > 480)
          ) {
            multiplyCoins(2);
          } else if (
            (pair.bodyB.position.x > 120 && pair.bodyB.position.x < 180) ||
            (pair.bodyB.position.x < 480 && pair.bodyB.position.x > 420)
          ) {
            multiplyCoins(1.5);
          } else if (
            (pair.bodyB.position.x > 180 && pair.bodyB.position.x < 240) ||
            (pair.bodyB.position.x < 420 && pair.bodyB.position.x > 360)
          ) {
            multiplyCoins(0.5);
          } else if (
            pair.bodyB.position.x > 240 &&
            pair.bodyB.position.x < 360
          ) {
            multiplyCoins(0.25);
          }
        } else if (pair.bodyB === plinkoDetector) {
          pair.bodyA.render.fillStyle = "#ff0000";
          pair.bodyA.isStatic = true;
          if (pair.bodyA.position.x < 60 || pair.bodyA.position.x > 540) {
            multiplyCoins(4);
          } else if (
            (pair.bodyA.position.x > 60 && pair.bodyA.position.x < 120) ||
            (pair.bodyA.position.x < 540 && pair.bodyA.position.x > 480)
          ) {
            multiplyCoins(2);
          } else if (
            (pair.bodyA.position.x > 120 && pair.bodyA.position.x < 180) ||
            (pair.bodyA.position.x < 480 && pair.bodyA.position.x > 420)
          ) {
            multiplyCoins(1.5);
          } else if (
            (pair.bodyA.position.x > 180 && pair.bodyA.position.x < 240) ||
            (pair.bodyA.position.x < 420 && pair.bodyA.position.x > 360)
          ) {
            multiplyCoins(0.5);
          } else if (
            pair.bodyA.position.x > 240 &&
            pair.bodyA.position.x < 360
          ) {
            multiplyCoins(0.25);
          }
        }
      }
    });

    Composite.add(engine.world, [puck, plinkoDetector, ...walls, ...pegs]);

    Render.run(render);

    let runner = Runner.create();

    Runner.run(runner, engine);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
