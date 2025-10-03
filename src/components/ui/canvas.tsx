import React, { useState, useEffect, useRef } from "react";

const Canvas = (props: React.CanvasHTMLAttributes<HTMLCanvasElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) return;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
