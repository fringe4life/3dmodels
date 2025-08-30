import Link from "next/link";
import HeroImage from "@/public/hero-image.png";

export default function Home() {
  return (
    <main>
      <section className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-8 px-6 py-12 md:flex-row">
        <div className="flex-1 space-y-6">
          <p className="hidden text-gray-600 text-sm uppercase md:block">
            Your go-to platform for 3D printing files
          </p>
          <h1 className="font-bold text-4xl md:text-5xl">
            Discover what's possible with 3D Printing
          </h1>
          <p className="text-gray-600 text-lg">
            Join our community of creators and explore a vast library of
            user-submitted models.
          </p>

          <div className="flex gap-4">
            <Link
              href="/3d-models"
              className="border-2 border-black bg-white px-6 py-3 text-black transition duration-100 hover:bg-black hover:text-white"
            >
              Browse Models
            </Link>
          </div>
        </div>
        <img
          src={HeroImage.src}
          className="h-auto w-[350px] rounded-lg"
          alt="Hero Image"
        />
      </section>
    </main>
  );
}
