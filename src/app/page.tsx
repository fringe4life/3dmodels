import type { Metadata } from "next";
import Link from "next/link";
import HeroImage from "@/assets/images/hero-image-square.png";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to PrintForge - your go-to platform for discovering and sharing 3D printing models. Join our community of makers and explore thousands of STL files.",
  openGraph: {
    title: "PrintForge - Discover 3D Printing Models",
    description:
      "Join our community of creators and explore a vast library of user-submitted 3D printing models.",
  },
};

const Home = () => (
  <section className="mx-auto grid h-full max-w-7xl items-center justify-between gap-8 px-6 py-12 md:grid-flow-col">
    <div className="grid gap-y-6">
      <p className="hidden text-pretty text-gray-600 text-sm uppercase md:block">
        Your go-to platform for 3D printing files
      </p>
      <h1 className="text-balance font-bold text-4xl md:text-5xl">
        Discover what's possible with 3D Printing
      </h1>
      <p className="text-pretty text-gray-600 text-lg">
        Join our community of creators and explore a vast library of
        user-submitted models.
      </p>

      <Link
        className="justify-self-start border-2 border-black bg-white px-6 py-3 text-black transition duration-100 hover:bg-black hover:text-white"
        href="/3d-models"
      >
        Browse Models
      </Link>
    </div>
    <img
      alt="a 3d printed model of the US Capital Building"
      className="mask-[url(/mask-1.svg)] mask-cover aspect-square w-[350px] justify-self-center rounded-lg"
      height={350}
      src={HeroImage.src}
      width={350}
    />
  </section>
);

export default Home;
