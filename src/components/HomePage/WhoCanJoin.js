import { Clock, ShieldCheck, TrendingUp } from "lucide-react";

export default function WhoCanJoin() {
  return (
    <section className="pt-14 pb-0 md:pt-26 md:pb-26 bg-gray-50">
      <div
        data-gsap="join-container"
        className="container mx-auto px-3 md:px-6 lg:px-12"
      >
        <div
          data-gsap="join-card"
          className="bg-white p-6 md:p-10 lg:p-16 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-12 items-center border-l-8 border-primary gsap-fade-up"
        >
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#0e1d34] mb-6">
              Who Can Join?
            </h2>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              We maintain high standards to ensure quality referrals.
            </p>

            <ul className="space-y-4 text-base md:text-lg">
              <li className="flex flex-col md:flex-row items-center gap-3">
                <TrendingUp className="text-secondary w-5 h-5" />
                <span className="font-semibold text-[#0e1d34]">Turnover:</span>
                <span className="text-gray-600">
                  ₹1 Cr+ (Trade) OR ₹10L+ (Service)
                </span>
              </li>

              <li className="flex flex-col md:flex-row items-center gap-3">
                <Clock className="text-secondary w-5 h-5" />
                <span className="font-semibold text-[#0e1d34]">
                  Experience:
                </span>
                <span className="text-gray-600">Minimum 3 Years</span>
              </li>

              <li className="flex flex-col md:flex-row items-center gap-3">
                <ShieldCheck className="text-secondary w-5 h-5" />
                <span className="font-semibold text-[#0e1d34]">
                  CIBIL Screening
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="bg-[#0e1d34] p-8 rounded-lg text-white">
              <p className="italic text-base md:text-lg mb-4">
                "The strength of the wolf is the pack."
              </p>
              <p className="text-gray-400 text-sm md:text-lg">
                We verify ethical practices, strong reputation, and ensure
                non-conflicting categories for every member.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
