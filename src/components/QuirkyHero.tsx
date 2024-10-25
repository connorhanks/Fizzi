"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { Bounded } from "@/components/Bounded";
import { SodaCan } from "./SodaCan";

type QuirkyHeroProps = {
  title: string;
};

const QuirkyHero = ({ title }: QuirkyHeroProps) => {
  return (
    <Bounded className="relative flex justify-center items-center py-20">
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <Float>
          <SodaCan />
          <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
        </Float>
      </Canvas>
      <h1 className="text-4xl font-bold text-center">{title}</h1>
    </Bounded>
  );
};

export default QuirkyHero;
