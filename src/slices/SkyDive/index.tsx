"use client";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";

/**
 * Basic component that renders a sample div.
 */
const SkyDive = (): JSX.Element => {
  return (
    <Bounded className="skydive h-screen">
      <h2 className="sr-only">Slice.Primary.Sentence goes here</h2>
      <View className="h-screen w-screen">
        <Scene sentence={"This is a test"} flavor={"watermelon"} />
      </View>
    </Bounded>
  );
};

export default SkyDive;
