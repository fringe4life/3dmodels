import { css } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HERO_IMAGE_SQUARE_HEIGHT,
  HERO_IMAGE_SQUARE_SRC,
  HERO_IMAGE_SQUARE_WIDTH,
} from "@/lib/hero-image";

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
  <section
    className={grid({
      blockSize: "full",
      maxInlineSize: "7xl",
      marginInline: "auto",
      gap: 8,
      paddingInline: { base: 2, sm: 6 },
      paddingBlock: 12,
      gridAutoFlow: { md: "column" },
      justifyContent: "space-between",
      alignItems: "center",
    })}
  >
    <div className={grid({ rowGap: 6 })}>
      <p
        className={gridItem({
          display: { base: "none", md: "block" },
          color: "gray.600",
          fontSize: "sm",
          textTransform: "uppercase",
        })}
      >
        Your go-to platform for 3D printing files
      </p>
      <h1
        className={css({
          textWrap: "balance",
          fontWeight: "bold",
          fontSize: { base: "4xl", md: "5xl" },
          lineHeight: "tight",
        })}
      >
        Discover what's possible with 3D Printing
      </h1>
      <p
        className={css({
          color: "gray.600",
          fontSize: "lg",
        })}
      >
        Join our community of creators and explore a vast library of
        user-submitted models.
      </p>
      <Link
        className={gridItem({
          justifySelf: "start",
          borderColor: "black",
          borderWidth: 2,
          backgroundColor: { base: "white", _hover: "black" },
          paddingInline: 6,
          paddingBlock: 3,
          color: { base: "black", _hover: "white" },
          transitionProperty: "colors",
          transitionDuration: "normal",
        })}
        href="/3d-models"
      >
        Browse Models
      </Link>
    </div>
    <Image
      alt="a 3d printed model of the US Capital Building"
      className={gridItem({
        maskImage: "url(/mask-1.svg)",
        maskSize: "cover",
        inlineSize: "6xl",
        justifySelf: "center",
        aspectRatio: "square",
        rounded: "lg",
        contain: "strict",
      })}
      height={HERO_IMAGE_SQUARE_HEIGHT}
      priority
      src={HERO_IMAGE_SQUARE_SRC}
      width={HERO_IMAGE_SQUARE_WIDTH}
    />
  </section>
);

export default Home;
