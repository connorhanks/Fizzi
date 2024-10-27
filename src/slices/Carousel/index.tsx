"use client";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { Center, Environment, View } from "@react-three/drei";

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

/**
 * Basic component that renders a sample div.
 */
const Carousel = (): JSX.Element => {
  return (
    <section className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      {/* Stacking the colour tint over the background */}
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <h2 className="relative text-center text-5xl font-bold">
        Choose Your Flavour
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* left */}
        {/* can */}
        {/* aspect-square to ensure it always maintains the same aspect ratio */}
        <View className="aspect-square h-[70vmin] min-h-40">
          {/* 1.5 brings the can forward */}
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              flavor="blackCherry"
              floatIntensity={0.3}
              rotationIntensity={1}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* right */}
      </div>
    </section>
  );
};

export default Carousel;
