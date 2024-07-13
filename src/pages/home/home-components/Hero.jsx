function Hero() {
  return (
    // <section className="py-8 flex items-center justify-center rounded-xl shadow-sm shadow-gray-900  border-white hero text-center">
    <section className="py-16 flex items-center justify-center text-center">
      <div>
        <h1 className="animate-slidein [--slidein-delay:400ms] opacity-0">
          Find your dream job with{" "}
          <span className="animate-slidein [--slidein-delay:500ms] opacity-0 text-underlay-1">
            HirelyAi
          </span>
        </h1>
        <p className="animate-slidein [--slidein-delay:600ms] opacity-0 text-base">
          Explore endless opportunities and take the next step towards your
          professional growth. Your future starts here!
        </p>
      </div>
    </section>
  );
}

export default Hero;
