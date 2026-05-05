import type { Metadata } from "next";
import Image from "next/image";
import { HERO_IMAGE_SQUARE_SRC } from "@/lib/hero-image";
import { css, cx } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { prose } from "../../../styled-system/recipes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PrintForge - the go-to platform for 3D printing enthusiasts, makers, and professional designers. Discover our mission to empower makers worldwide.",
  openGraph: {
    title: "About PrintForge - Empowering Makers Worldwide",
    description:
      "Founded in 2023, PrintForge has quickly become the go-to platform for 3D printing enthusiasts to share and discover amazing STL files.",
  },
};

const AboutPage = () => (
  <>
    <section
      className={css({
        maxInlineSize: "4xl",
        marginInline: "auto",
        paddingInline: 4,
        paddingBlock: 8,
      })}
    >
      <h1
        className={css({
          marginBlockEnd: 6,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "4xl",
        })}
      >
        About PrintForge
      </h1>
      <div
        className={grid({
          marginBlockEnd: 12,
          columns: { md: 2 },
          gap: 8,
          alignItems: "center",
        })}
      >
        <div
          className={css({
            blockSize: "sm",
            inlineSize: "full",
            position: "relative",
          })}
        >
          <Image
            alt="PrintForge Community - A group of makers collaborating on 3D printing projects"
            className={css({ rounded: "lg", objectFit: "cover" })}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            src={HERO_IMAGE_SQUARE_SRC}
          />
        </div>
        <div className={grid({ rowGap: 4 })}>
          <p
            aria-hidden="true"
            className={css({
              color: "gray.600",
              fontSize: "sm",
              textTransform: "uppercase",
            })}
          >
            About PrintForge
          </p>
          <h2 className={css({ fontWeight: "semibold", fontSize: "2xl" })}>
            Empowering Makers Worldwide
          </h2>
          <p className={css({ color: "gray.700" })}>
            Founded in 2023, PrintForge has quickly become the go-to platform
            for 3D printing enthusiasts, makers, and professional designers to
            share and discover amazing STL files for 3D printing.
          </p>
          <p className={css({ color: "gray.700" })}>
            Our mission is to foster a vibrant community where creativity meets
            technology, enabling anyone to bring their ideas to life through 3D
            printing.
          </p>
        </div>
      </div>
    </section>

    <hr className={css({ borderColor: "gray.200" })} />

    <section className={css({ paddingBlock: 12 })}>
      <div
        className={css({
          maxInlineSize: "7xl",
          marginInline: "auto",
          paddingInline: { base: 2, sm: 6 },
        })}
      >
        <h2 className={css({ srOnly: true })}>Key Features</h2>
        <div className={grid({ gap: { base: 6, md: 0 }, columns: { md: 3 } })}>
          <article
            className={css({
              backgroundColor: "white",
              padding: 6,
            })}
          >
            <h3
              className={css({
                marginBlockEnd: 3,
                fontWeight: "semibold",
                fontSize: "xl",
              })}
            >
              100K+ Models
            </h3>
            <p className={css({ color: "gray.600" })}>
              Access our vast library of community-created 3D models, from
              practical tools to artistic creations.
            </p>
          </article>
          <article
            className={css({
              borderColor: "gray.400",
              backgroundColor: "white",
              padding: 6,
              borderInlineWidth: { md: "1px" },
            })}
          >
            <h3
              className={css({
                marginBlockEnd: 3,
                fontWeight: "semibold",
                fontSize: "xl",
              })}
            >
              Active Community
            </h3>
            <p className={css({ color: "gray.600" })}>
              Join thousands of makers who share tips, provide feedback, and
              collaborate on projects.
            </p>
          </article>
          <article className={css({ backgroundColor: "white", padding: 6 })}>
            <h3
              className={css({
                marginBlockEnd: 3,
                fontWeight: "semibold",
                fontSize: "xl",
              })}
            >
              Free to Use
            </h3>
            <p className={css({ color: "gray.600" })}>
              Most models are free to download, with optional premium features
              for power users.
            </p>
          </article>
        </div>
      </div>
    </section>

    <hr className={css({ borderColor: "gray.200" })} />

    <section
      className={css({
        maxInlineSize: "3xl",
        marginInline: "auto",
        paddingInline: 4,
        paddingBlock: 8,
      })}
    >
      <div
        className={cx(
          grid({
            maxInlineSize: "none",
            gridAutoRows: "min",
            gap: 6,
          }),
          prose(),
        )}
      >
        <h2
          className={css({
            marginBlockEnd: 0,
            fontWeight: "semibold",
            fontSize: "2xl",
          })}
        >
          Our Vision
        </h2>
        <p className={css({ marginBlockEnd: 0, color: "gray.700" })}>
          At PrintForge, we believe that 3D printing is revolutionizing the way
          we create, prototype, and manufacture. Our platform serves as a bridge
          between designers and makers, enabling the sharing of knowledge and
          creativity that pushes the boundaries of what's possible with 3D
          printing.
        </p>
        <p
          className={css({
            marginBlockEnd: 0,
            marginBlockStart: 0,
            color: "gray.700",
          })}
        >
          Whether you're a hobbyist looking for your next weekend project, an
          educator seeking teaching materials, or a professional designer
          wanting to share your creations, PrintForge provides the tools and
          community to support your journey in 3D printing.
        </p>
      </div>
    </section>
  </>
);

export default AboutPage;
