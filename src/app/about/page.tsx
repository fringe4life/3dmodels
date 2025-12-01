import type { Metadata } from "next";
import HeroImageSquare from "@/assets/images/hero-image-square.png";

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
    <section className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-center font-bold text-4xl">About PrintForge</h1>

      <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
        <div className="relative h-[300px] w-full">
          {/** biome-ignore lint/correctness/useImageSize: unsure of size */}
          <img
            alt="PrintForge Community - A group of makers collaborating on 3D printing projects"
            className="absolute inset-0 h-full w-full rounded-lg object-cover"
            height={300}
            src={HeroImageSquare.src}
          />
        </div>
        <div>
          <p
            aria-hidden="true"
            className="mb-4 text-gray-600 text-sm uppercase"
          >
            About PrintForge
          </p>
          <h2 className="mb-4 font-montserrat-alternates font-semibold text-2xl">
            Empowering Makers Worldwide
          </h2>
          <p className="mb-4 text-gray-700">
            Founded in 2023, PrintForge has quickly become the go-to platform
            for 3D printing enthusiasts, makers, and professional designers to
            share and discover amazing STL files for 3D printing.
          </p>
          <p className="text-gray-700">
            Our mission is to foster a vibrant community where creativity meets
            technology, enabling anyone to bring their ideas to life through 3D
            printing.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-gray-200" />

    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="sr-only">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-3 md:gap-0">
          <article className="bg-white p-6">
            <h3 className="mb-3 font-montserrat-alternates font-semibold text-xl">
              100K+ Models
            </h3>
            <p className="text-gray-600">
              Access our vast library of community-created 3D models, from
              practical tools to artistic creations.
            </p>
          </article>
          <article className="border-gray-400 bg-white p-6 md:border-x">
            <h3 className="mb-3 font-montserrat-alternates font-semibold text-xl">
              Active Community
            </h3>
            <p className="text-gray-600">
              Join thousands of makers who share tips, provide feedback, and
              collaborate on projects.
            </p>
          </article>
          <article className="bg-white p-6">
            <h3 className="mb-3 font-montserrat-alternates font-semibold text-xl">
              Free to Use
            </h3>
            <p className="text-gray-600">
              Most models are free to download, with optional premium features
              for power users.
            </p>
          </article>
        </div>
      </div>
    </section>

    <hr className="border-gray-200" />

    <section className="container mx-auto max-w-3xl px-4 py-8">
      <div className="prose max-w-none">
        <h2 className="mb-4 font-semibold text-2xl">Our Vision</h2>
        <p className="mb-4 text-gray-700">
          At PrintForge, we believe that 3D printing is revolutionizing the way
          we create, prototype, and manufacture. Our platform serves as a bridge
          between designers and makers, enabling the sharing of knowledge and
          creativity that pushes the boundaries of what's possible with 3D
          printing.
        </p>
        <p className="text-gray-700">
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
