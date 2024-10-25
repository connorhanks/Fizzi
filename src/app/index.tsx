"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Scene from "@/slices/Hero/Scene";
import { View } from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { Bubbles } from "@/slices/Hero/Bubbles";

import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  // Check if the page is ready before animating to avoid unordered animations
  const ready = useStore((state) => state.ready);

  useGSAP(
    () => {
      // If the page is not ready, do nothing
      if (!ready) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power2.inOut",
          delay: 0.3,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          markers: true,
        },
      });

      scrollTl
        .fromTo(
          ".hero",
          { backgroundColor: "#FDE047" },
          { backgroundColor: "#D9F99D", overwrite: "auto" },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          opacity: 0,
          y: 20,
        });
    },
    // As soon as this value changes, the animation will run
    { dependencies: [ready] },
  );

  return (
    <Bounded className="hero opacity-0">
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <Scene />
        <Bubbles count={300} speed={2} repeat={true} />
      </View>
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem]">
              <TextSplitter
                text="Live Gutsy"
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              Soda Perfected
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              3.9g sugar, 9g fiber, 5 delicious flavours
            </div>
            <Button
              buttonLink="/shop"
              buttonText="Shop now"
              className="hero-button mt-12"
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <img
            className="md:hidden w-full"
            src="/img/all-cans-bunched.png"
            alt="Live Gutsy"
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text="Try all five flavours" />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              Live Gutsy is a low-sugar, high-fiber soda that is perfect for
              anyone looking to reduce their sugar intake. With just 3.9g of
              sugar and 9g of fiber per can, it's a refreshing and healthy
              alternative to sugary drinks.
            </div>
          </div>
        </div>

        <div className="grid text-side relative z-[80]"></div>
      </div>
    </Bounded>
  );
};

export default Hero;
