"use client";

import FloatingCan from "@/components/FloatingCan";
import {
  Text,
  Cloud,
  Clouds,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type SkyDiveProps = {
  sentence: string | null;
  flavor:
    | "lemonLime"
    | "grape"
    | "blackCherry"
    | "strawberryLemonade"
    | "watermelon"
    | undefined;
};

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan ref={canRef} flavor={flavor}></FloatingCan>
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {/* Check if there is a sentence before attempting to render it */}
        {sentence && <ThreeText sentence={sentence} />}
      </group>

      <OrbitControls />

      {/* Lighting */}
      <ambientLight intensity={2} color="#9BDEFA" />
      <Environment preset="sunset" environmentIntensity={1.5} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  return <Text>{sentence}</Text>;
}
