export default function WhyGyrUp({ usps }) {
  return (
    <section
      className="min-h-dvh bg-top bg-cover pt-16 md:pt-22 pb-32"
      style={{ backgroundImage: "url('/service-bg.png')" }}
      data-gsap="why-trigger"
    >
      <div className="container mx-auto text-center mb-14 md:mb-20 px-6 lg:px-12 gsap-fade-up font-jakarta">
        <h4 className="text-secondary text-lg md:text-xl font-bold uppercase tracking-widest mb-3">
          Why GYR UP?
        </h4>
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#0e1d34] mb-6">
          Trusted Network
        </h2>
        <p className="text-gray-600 text-base md:text-lg xl:max-w-3xl px-2 md:px-0 mx-auto">
          We are not just a networking group we are a growth-driven business
          community where credibility, ethics, and collaboration come first.
        </p>
      </div>

      <div
        data-gsap="usps-wrapper"
        className="container mx-auto px-5 xl:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {usps.map((item, index) => (
          <div
            key={index}
            className="gsap-usps-card bg-transparent p-6 md:p-8 border border-[#e4e7ea] hover:shadow-lg hover:-translate-y-2 duration-300 rounded-lg group"
          >
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#0e1d34] transition-colors">
              <div className="text-secondary group-hover:text-white transition-colors">
                {item.icon}
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#0e1d34] mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
