"use client";

import React from "react";

const faqData = [
  {
    id: "about-gyrup",
    label: "About GYR UP Universe",
    questions: [
      {
        q: "What is GYR UP Universe?",
        a: "GYR UP Universe is a structured, credibility-driven business networking and referral growth platform for entrepreneurs who want consistent, verified business opportunities and leadership development. The ecosystem operates through Zones, Regions, and Chapters to ensure strong local, regional, and national reach.",
      },
      {
        q: "How is GYR UP different from typical networking groups?",
        a: "GYR UP is not a casual meetup; it is a premium referral verification ecosystem built on verified and quality-controlled referrals, fortnightly structured business meetings, industry seat exclusivity, strict eligibility criteria, leadership development and training, and a professional culture with accountability.",
      },
    ],
  },
  {
    id: "referrals-meetings",
    label: "Referral System & Meetings",
    questions: [
      {
        q: "How does GYR UP ensure high-quality referrals?",
        a: "GYR UP uses a multi-level referral verification process. A member submits a referral, the GYR UP verification team checks authenticity, validates the requirement, confirms prospect awareness, and assesses seriousness. Only after approval is the referral passed to a member, ensuring conversion-ready, serious business opportunities.",
      },
      {
        q: "How often do chapters meet?",
        a: "All GYR UP chapters conduct fortnightly meetings (once every two weeks). This rhythm supports higher attendance, better-prepared presentations, quality referrals, and meaningful business discussions—ideal for busy entrepreneurs.",
      },
      {
        q: "What happens during a GYR UP meeting?",
        a: "A typical meeting includes member introductions, referral exchange, verification updates, testimonials, success stories, collaboration discussions, and leadership announcements—run on a clear agenda to maximise business value.",
      },
    ],
  },
  {
    id: "membership-eligibility",
    label: "Membership & Eligibility",
    questions: [
      {
        q: "Who is eligible to join GYR UP Universe?",
        a: "Membership is selective and based on credibility. Applicants are expected to have a minimum of 3 years of business experience, stable operations, a strong CIBIL score, and a positive reputation with credible references, so each chapter stays trustworthy and serious.",
      },
      {
        q: "Why does GYR UP check CIBIL score?",
        a: "A strong CIBIL score reflects financial discipline and professional integrity. This helps maintain a credible, safe, and trustworthy network for all members.",
      },
      {
        q: "What types of businesses can join?",
        a: "Any business that benefits from trust-based referrals can join—consultants, service providers, startups, technology companies, finance and legal services, real estate, health and wellness, lifestyle brands, traders, manufacturers, and more. Each category receives exclusive representation per chapter.",
      },
      {
        q: "Can two people from the same industry join one chapter?",
        a: "No. GYR UP follows strict industry seat exclusivity to avoid internal competition and preserve referral quality.",
      },
      {
        q: "Can I visit a chapter before joining?",
        a: "Yes. You may attend one or two meetings as a guest to experience the culture and structure before applying for membership.",
      },
    ],
  },
  {
    id: "leadership",
    label: "Chapter Director & Leadership Opportunities",
    questions: [
      {
        q: "What is the role of a Chapter Director?",
        a: "Chapter Directors lead the chapter, build member credibility, maintain referral quality, drive the business culture, and coordinate closely with regional leadership. They are central to GYR UP’s growth ecosystem.",
      },
      {
        q: "What are the benefits of becoming a Chapter Director?",
        a: "Chapter Directors gain leadership recognition, enhanced personal branding, massive business visibility, wider networking opportunities, first priority in regional expansion, and the opportunity to build multiple chapters—ideal for entrepreneurs who want influence, growth, and impact.",
      },
    ],
  },
  {
    id: "growth-results",
    label: "Business Growth & Results",
    questions: [
      {
        q: "How much business can I expect from GYR UP?",
        a: "Results depend on your engagement in meetings, the relationships you build, the value you provide to fellow members, and how professionally you follow up on referrals. Active, consistent members generate steady, high-quality business through verified referrals.",
      },
      {
        q: "Why does business networking matter in 2025 and beyond?",
        a: "In a world of rising digital marketing costs, intense competition, trust-based buying decisions, and community-led brands, strategic networking is no longer optional. GYR UP helps entrepreneurs stay ahead by turning trusted relationships into real business.",
      },
      {
        q: "How does GYR UP support members outside meetings?",
        a: "Support continues beyond formal meetings through WhatsApp communities, regional networking, leadership groups, specialised training, referral follow-ups, and events or summits—offering 24/7 community support, not just meeting-time interaction.",
      },
    ],
  },
  {
    id: "expansion",
    label: "Expansion & Local Presence",
    questions: [
      {
        q: "In how many cities does GYR UP operate?",
        a: "GYR UP expands based on verified leadership availability, demand for chapters, a geographic radius policy between chapters, and a clear regional growth strategy, ensuring balanced and sustainable expansion.",
      },
      {
        q: "Can I open a new chapter in my area?",
        a: "Yes. If your category is filled or you want to step into leadership, you can apply to become a Chapter Director and launch a new chapter with full training and support from the core team.",
      },
    ],
  },
  {
    id: "general",
    label: "General Questions",
    questions: [
      {
        q: "Does GYR UP help with personal branding?",
        a: "Yes. Members gain stage presence, opportunities for business presentations, visibility across regions, digital exposure through photos, videos, and social content, and expert positioning via referrals and testimonials, all strengthening both business reputation and personal brand.",
      },
      {
        q: "Is GYR UP suitable for new entrepreneurs?",
        a: "New entrepreneurs can join if they meet the eligibility standards. The goal is to maintain a strong, credible business network—quality is always prioritised over quantity.",
      },
      {
        q: "What is the biggest advantage of joining GYR UP Universe?",
        a: "The biggest advantage is trust. You step into a verified network of credible, experienced, and financially disciplined entrepreneurs exchanging serious, meaningful business referrals in a structured environment.",
      },
    ],
  },
];

export default function FAQSection({ title = "Frequently Asked Questions", highlight = "FAQ" }) {
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-primary text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3">
            {highlight}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0e1d34] leading-tight mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Get quick answers to how GYR UP Universe works—from membership and
            referrals to leadership, expansion, and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Section navigation */}
          <div className="space-y-3">
            {faqData.map((group) => (
              <a
                key={group.id}
                href={`#faq-${group.id}`}
                className="block text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-primary/60 hover:bg-primary/5 transition-colors text-sm md:text-base font-medium text-[#0e1d34]"
              >
                {group.label}
              </a>
            ))}
          </div>

          {/* Right: Questions */}
          <div className="lg:col-span-2 space-y-10">
            {faqData.map((group) => (
              <div
                key={group.id}
                id={`faq-${group.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#0e1d34] mb-4">
                  {group.label}
                </h3>
                <div className="space-y-4">
                  {group.questions.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b last:border-b-0 border-gray-100 pb-4 last:pb-0"
                    >
                      <p className="font-semibold text-sm md:text-base text-[#0e1d34] mb-1">
                        {item.q}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

