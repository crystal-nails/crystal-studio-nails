import Image from 'next/image';
import dbConnect from '../utils/dbConnect';
import HeroModel from '../models/Hero';

export default async function Hero() {
  await dbConnect();
  const hero = await HeroModel.findOne().lean();

  if (!hero) return null;

  return (
    <section
      className="relative w-full flex items-center justify-center text-white text-center overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/uploads/hero/hero.webp"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 container px-4 py-8 md:p-8 rounded-lg bg-[#073891]/80 mx-3 mb-10">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4 uppercase leading-tight">
          {hero.headline}
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-2xl uppercase inline text-[#B8860B] tracking-[1px] md:tracking-[3px] leading-tight">
          {hero.subtext}
        </p>
      </div>
    </section>
  );
}