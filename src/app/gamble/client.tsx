"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function GamebleClient() {
  const { coins, multiplyCoins } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    multiplyCoins(2);
    if (!canvasRef.current) return;

    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let Runner = Matter.Runner;
    let Bodies = Matter.Bodies;
    let Composite = Matter.Composite;

    let engine = Engine.create();
    let render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 700,
        pixelRatio: 1,
        background: "#fafafa",
        wireframeBackground: "#222",
        hasBounds: false,
        //enabled: true,
        wireframes: true,
        showSleeping: true,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        //showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false,
      },
    });

    let puck = Bodies.circle(290, 0, 10, {restitution: 0.99})
    let ground = Bodies.rectangle(300, 700, 700, 60, { isStatic: true });

    let pegs: Matter.Body[] = [];

    for (let i = 0; i < 10; i++) {
      console.log("e");
      pegs.push(Bodies.circle(i * 60+30, 200, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60, 250, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60+30, 300, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60, 350, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60+30, 400, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60, 450, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60+30, 500, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60, 550, 15, {isStatic: true}));
      pegs.push(Bodies.circle(i * 60+30, 600, 15, {isStatic: true}));
    }

    Composite.add(engine.world, [puck, ground, ...pegs]);

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
