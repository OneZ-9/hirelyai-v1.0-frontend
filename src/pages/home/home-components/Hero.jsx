function Hero() {
  return (
    <section className="py-8 flex items-center justify-center rounded-xl shadow-sm shadow-gray-900  border-white hero text-center">
      <div>
        <h1 className="text-white animate-slidein [--slidein-delay:400ms] opacity-0">
          Find your dream job with{" "}
          <span className="animate-slidein [--slidein-delay:500ms] opacity-0 text-underlay-1">
            HirelyAi
          </span>
        </h1>
        <p className="text-slate-400 animate-slidein [--slidein-delay:600ms] opacity-0 text-sm">
          Explore endless opportunities and take the next step towards your
          professional growth. Your future starts here!
        </p>
      </div>
    </section>
  );
}

export default Hero;
