"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Scene from "@/slices/Hero/Scene";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  console.log("Rendering Hero component");
  return (
    <Bounded>
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem]">
              Live Gutsy
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              Soda Perfected
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              3.9g sugar Shop now
            </div>
          </div>
        </div>
        <div className="grid text-side relative z-[80]"></div>
      </div>
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        {/* <Scene /> */}
      </View>
    </Bounded>
  );
};

export default Hero;
