import { css, cx } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
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
        className={cx(
          "group",
          gridItem({
            _active: {
              backgroundColor: "brand.subtle",
              borderColor: "brand",
            },
            _focusVisible: {
              borderColor: "brand",
              outline: "3px solid token(colors.brand)",
              outlineOffset: "4px",
            },
            _hover: {
              borderColor: "brand",
            },
            alignItems: "center",
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 2,
            color: "black",
            display: "inline-flex",
            gap: 3,
            justifySelf: "start",
            paddingBlock: 3,
            paddingInline: 6,
            transitionDuration: "fast",
            transitionProperty: "colors",
            transitionTimingFunction: "outDramatic",
          }),
        )}
        href="/3d-models"
      >
        <span>Browse Models</span>
        <FaArrowRight
          aria-hidden="true"
          className={arrowRecipe({
            direction: "right",
            distance: "default",
            size: "md",
          })}
        />
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
