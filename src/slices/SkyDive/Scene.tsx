"use client";

import { Text, Cloud, Clouds, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  // Convert degrees to radians
  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => {
    // Calculates and returns the x position based on the distance and angle
    return distance * Math.cos(ANGLE);
  };
  const getYPosition = (distance: number) => {
    // Calculates and returns the x position based on the distance and angle
    return distance * Math.sin(ANGLE);
  };

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    // Check if all the refs are defined
    if (
      !cloudsRef.current ||
      !canRef.current ||
      !wordsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      // If any of the refs are not defined, return
      return;

    // Assuming all the refs are defined, set the clouds' z position
    gsap.set(cloudsRef.current.position, { z: 10 });

    // Make can move up and to the left
    gsap.set(canRef.current.position, {
      ...getXYPositions(-4),
    });

    // Move each individual word down and to the right
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      {
        ...getXYPositions(7),
        z: 2,
      },
    );

    // Make can spin on its own axis
    // Math.PI * 2 is 360 degrees
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    // Move clouds off-screen like can
    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    // We want to move each cloud up with different values
    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      // Waits until first cloud is half way through its cycle before starting
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollT1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000%",
        scrub: 1.5,
      },
    });

    scrollT1
      .fromTo(
        "body",
        { backgroundColor: "#d9f99d" }, // Initial color
        { backgroundColor: "#C0F0F5", overwrite: "auto", duration: 0.1 }, // Transition to new color
      )
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      // Make the can fly by and leave the scene after animation
      .to(canRef.current.position, {
        ...getXYPositions(4),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
  });

  return (
    <group ref={groupRef}>
      {/* Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
        >
          {/* Add a tinted light inside the can to glow itself and the surrounding scene */}
          <pointLight intensity={60} color="#ffa49c" decay={0.6} />
        </FloatingCan>
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {/* Check if there is a sentence before attempting to render it */}
        {sentence && <ThreeText sentence={sentence} color="#a8453d" />}
      </group>

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
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word: string, wordIndex: number) => (
    // Scale the text based on the screen size — desktop is 1, mobile is 0.5
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font={"/fonts/Alpino-Variable.woff"}
      fontWeight={900}
      anchorX="center"
      anchorY="middle"
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
}
