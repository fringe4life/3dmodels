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
  description:
    "Welcome to PrintForge - your go-to platform for discovering and sharing 3D printing models. Join our community of makers and explore thousands of STL files.",
  openGraph: {
    description:
      "Join our community of creators and explore a vast library of user-submitted 3D printing models.",
    title: "PrintForge - Discover 3D Printing Models",
  },
  title: "Home",
};

const Home = () => (
  <section
    className={grid({
      alignItems: "center",
      blockSize: "full",
      gap: 8,
      gridAutoFlow: { md: "column" },
      justifyContent: "space-between",
      marginInline: "auto",
      maxInlineSize: "7xl",
      paddingBlock: 12,
      paddingInline: { base: 2, sm: 6 },
    })}
  >
    <div className={grid({ rowGap: 6 })}>
      <p
        className={gridItem({
          color: "gray.600",
          display: { base: "none", md: "block" },
          fontSize: "sm",
          textTransform: "uppercase",
        })}
      >
        Your go-to platform for 3D printing files
      </p>
      <h1
        className={css({
          fontSize: { base: "4xl", md: "5xl" },
          fontWeight: "bold",
          lineHeight: "tight",
          textWrap: "balance",
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
          backgroundColor: { _hover: "black", base: "white" },
          borderColor: "black",
          borderWidth: 2,
          color: { _hover: "white", base: "black" },
          justifySelf: "start",
          paddingBlock: 3,
          paddingInline: 6,
          transitionDuration: "normal",
          transitionProperty: "colors",
        })}
        href="/3d-models"
      >
        Browse Models
      </Link>
    </div>
    <Image
      alt="a 3d printed model of the US Capital Building"
      className={gridItem({
        aspectRatio: "square",
        contain: "strict",
        inlineSize: "6xl",
        justifySelf: "center",
        maskImage: "url(/mask-1.svg)",
        maskSize: "cover",
        rounded: "lg",
      })}
      height={HERO_IMAGE_SQUARE_HEIGHT}
      priority
      src={HERO_IMAGE_SQUARE_SRC}
      width={HERO_IMAGE_SQUARE_WIDTH}
    />
  </section>
);

export default Home;
