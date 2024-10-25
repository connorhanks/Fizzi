import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Scene from "./Scene";
import { View } from "@react-three/drei";
import { Bounded } from "@/components/Bounded";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  console.log("Rendering Hero component");
  return (
    <Bounded>
      <View>
        <Scene />
      </View>
    </Bounded>
  );
};

export default Hero;
