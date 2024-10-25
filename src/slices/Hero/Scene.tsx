"use client";

import { Environment } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";

type Props = {};

export default function Scene({}: Props) {
  return (
    <group>
      <FloatingCan />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
