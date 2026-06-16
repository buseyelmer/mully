"use client";

import TextureSection from "./TextureSection";
import MullyDiary from "./MullyDiary";
import HeroVideo from "./HeroVideo";
import MullyCompatibilityTest from "./MullyCompatibilityTest";
import StorySection from "./StorySection";
import TurkeyMap from "./TurkeyMap";
import HeroSection from "./hero-section";

export default function Home() {
  return (
    <>
      <section className="mully-bg-primary pt-[88px] sm:pt-[108px]">
        <div className="mx-auto max-w-6xl px-3 sm:px-6 md:px-10">
          <HeroVideo />
        </div>
      </section>
      <section className="mully-bg-primary pb-4 pt-10 sm:pb-6 sm:pt-14">
        <div className="mx-auto max-w-6xl px-3 sm:px-6 md:px-10">
          <MullyCompatibilityTest />
        </div>
      </section>
      <StorySection />
      <MullyDiary />
      <TextureSection />
      <HeroSection mapSlot={<TurkeyMap />} />
    </>
  );
}
