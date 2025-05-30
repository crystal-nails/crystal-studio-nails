export default function Hero({ hero }) {
  return (
    <section className="relative w-full flex items-center justify-center text-white text-center overflow-hidden min-h-[80vh]">
      <img
        src="/uploads/hero/hero.webp"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black opacity-30 -z-10" />
      <div className="relative z-10 container px-4 py-8 md:p-8 rounded-lg bg-[#073891]/80 mx-3 mb-10">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 uppercase leading-tight text-white">
          {hero?.headline}
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-2xl uppercase inline text-[#B8860B] tracking-[1px] md:tracking-[3px] leading-tight">
          {hero?.subtext}
        </p>
      </div>
    </section>
  );
}