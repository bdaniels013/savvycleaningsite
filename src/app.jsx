import React, { useMemo, useState, useEffect } from "react";

const BUSINESS_NAME = "Savvy Cleaning Pro & Fire Safety";
const PHONE_DISPLAY = "228-324-5430";
const PHONE_E164 = "+12283245430";
const EMAIL = "Savvycleaningpro@gmail.com";
const SERVICE_AREA = ["MS", "AL", "FL", "LA"];
const LOGO = new URL("./assets/photos/savvy cleaning logo.jpeg", import.meta.url).href;

const PHOTO_GALLERY = [
  { src: new URL("./assets/photos/drew cleaning.jpg", import.meta.url).href, alt: "Drew cleaning" },
  { src: new URL("./assets/photos/clean vent hood.JPG", import.meta.url).href, alt: "Clean vent hood" },
  { src: new URL("./assets/photos/clean hood 2.JPG", import.meta.url).href, alt: "Hood cleaning service" },
  { src: new URL("./assets/photos/savvy cleaning logo.jpeg", import.meta.url).href, alt: "Savvy Cleaning logo" },
  { src: new URL("./assets/photos/savvy cleaning sticker.JPG", import.meta.url).href, alt: "Savvy Cleaning sticker" }
];
const ACTION_PHOTOS = PHOTO_GALLERY.filter((p) => !/logo|sticker/i.test(p.alt));
const STICKER = PHOTO_GALLERY.find((p) => /sticker/i.test(p.alt)) || {
  src: new URL("./assets/photos/savvy cleaning sticker.JPG", import.meta.url).href,
  alt: "Savvy Cleaning sticker",
};

const SERVICES = [
  {
    title: "Commercial Hood Cleaning",
    description:
      "Professional exhaust hood, duct, and fan cleaning to reduce fire risk, improve airflow, and help meet inspection and insurance requirements.",
    bullets: ["Kitchen exhaust hoods", "Ductwork & fan cleaning", "Grease containment & cleanup", "Before/after documentation"],
  },
  {
    title: "Fire Suppression Systems",
    description:
      "Inspection-ready support for kitchen fire suppression systems—service, checks, and coordination to keep your system operational and compliant.",
    bullets: ["System inspection support", "Service & maintenance checks", "Deficiency identification", "Documentation for records"],
  },
  {
    title: "Fire Extinguishers",
    description:
      "Extinguisher checks, maintenance coordination, and placement support to help your business stay prepared and code-aware.",
    bullets: ["Condition & placement review", "Routine checks scheduling", "Tag/record support", "Recommendations by hazard area"],
  },
  {
    title: "Janitorial Cleaning",
    description:
      "Reliable recurring cleaning that keeps your facility guest-ready, staff-ready, and consistently presentable.",
    bullets: ["Restrooms & common areas", "Floors, glass, touchpoints", "Trash removal", "Custom schedules (daily/weekly)"],
  },
  {
    title: "Bar Cleaning & Sanitation",
    description:
      "Deep sanitation for bar stations and high-contact surfaces—built for busy nights, health standards, and better guest confidence.",
    bullets: ["Bar tops & wells", "Ice bin exterior sanitation", "High-touch disinfecting", "Back-of-house spot cleaning"],
  },
  {
    title: "Kitchen Equipment Deep Cleaning",
    description:
      "Targeted degreasing and deep cleaning for equipment and surrounding areas—ideal for resets, inspections, or seasonal maintenance.",
    bullets: ["Equipment exterior degreasing", "Behind/under equipment detail", "Walls, splash zones, baseboards", "Kitchen reset cleaning"],
  },
];

const TRUST_POINTS = [
  { label: "Commercial-Grade Service", sub: "Built for real kitchens & real inspections" },
  { label: "Safety + Sanitation Focus", sub: "Fire risk reduction & cleaner operations" },
  { label: "Professional Documentation", sub: "Clear service notes + accountability" },
  { label: "Fast Scheduling", sub: "Quick quotes and responsive communication" },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Icon({ name }) {
  const common = "w-5 h-5 shrink-0";
  switch (name) {
    case "phone":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.6 10.8c1.5 2.7 3.9 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.3 21 3 12.7 3 2c0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sms":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 15a3 3 0 0 1-3 3H9l-4 3v-3a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 9h10M7 12h7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m5 8 7 5 7-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 7 10 17l-4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function SavvyCleaningOnePage() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "Hood cleaning",
    message: "",
    preferred: "Text",
  });
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [slide, setSlide] = useState(0);
  const [photoMeta, setPhotoMeta] = useState({});

  useEffect(() => {
    const icon = document.querySelector('link[rel="icon"]') || document.createElement("link");
    icon.setAttribute("rel", "icon");
    icon.setAttribute("type", "image/jpeg");
    icon.setAttribute("href", LOGO);
    document.head.appendChild(icon);

    const apple = document.querySelector('link[rel="apple-touch-icon"]') || document.createElement("link");
    apple.setAttribute("rel", "apple-touch-icon");
    apple.setAttribute("href", LOGO);
    document.head.appendChild(apple);

    const abs = new URL(LOGO, window.location.origin).href;
    const ogImg = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
    ogImg.setAttribute("property", "og:image");
    ogImg.setAttribute("content", abs);
    document.head.appendChild(ogImg);

    const twImg = document.querySelector('meta[name="twitter:image"]') || document.createElement("meta");
    twImg.setAttribute("name", "twitter:image");
    twImg.setAttribute("content", abs);
    document.head.appendChild(twImg);

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", BUSINESS_NAME);
    document.head.appendChild(ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    ogDesc.setAttribute("content", "Commercial cleaning and fire-safety support for kitchens and facilities.");
    document.head.appendChild(ogDesc);

    const twCard = document.querySelector('meta[name="twitter:card"]') || document.createElement("meta");
    twCard.setAttribute("name", "twitter:card");
    twCard.setAttribute("content", "summary_large_image");
    document.head.appendChild(twCard);
  }, []);

  useEffect(() => {
    ACTION_PHOTOS.forEach((p) => {
      const img = new Image();
      img.src = p.src;
      img.onload = () => {
        setPhotoMeta((prev) => ({
          ...prev,
          [p.src]: { w: img.naturalWidth, h: img.naturalHeight },
        }));
      };
    });
  }, []);

  function isPortraitSrc(src) {
    const m = photoMeta[src];
    if (!m) return false;
    return m.h > m.w;
  }

  const heroImg = ACTION_PHOTOS.find((p) => !isPortraitSrc(p.src)) || ACTION_PHOTOS[0];
  const bannerCandidates = ACTION_PHOTOS.filter((p) => !isPortraitSrc(p.src));
  const bannerDeck = bannerCandidates.length ? bannerCandidates : ACTION_PHOTOS;
  const carouselIsPortrait = isPortraitSrc(ACTION_PHOTOS[slide]?.src);

  const actionLinks = useMemo(() => {
    const smsBody = encodeURIComponent(
      `Hi ${BUSINESS_NAME}! I'd like a quote for ${form.service}. My name is ${form.name || "[Name]"} and my business is ${
        form.business || "[Business]"
      }.`
    );
    const mailSubject = encodeURIComponent(`Quote Request — ${BUSINESS_NAME}`);
    const mailBody = encodeURIComponent(
      `Hi ${BUSINESS_NAME},\n\nI'd like a quote for: ${form.service}\n\nName: ${form.name}\nBusiness: ${form.business}\nPhone: ${form.phone}\nPreferred contact: ${form.preferred}\n\nDetails:\n${form.message}\n`
    );

    return {
      call: `tel:${PHONE_E164}`,
      text: `sms:${PHONE_E164}?&body=${smsBody}`,
      email: `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`,
    };
  }, [form]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setStatus({ type: "error", msg: "Please enter your name." });
    if (!form.phone.trim() && !form.email.trim())
      return setStatus({ type: "error", msg: "Add a phone number or email so we can reach you." });
    setStatus({ type: "success", msg: "Perfect — your request is ready. Use Call/Text/Email below to send it instantly." });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute top-56 -left-40 h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-160px] h-[520px] w-[520px] rounded-full bg-slate-400/10 blur-3xl" />
      </div>

      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt={`${BUSINESS_NAME} logo`} className="h-28 w-28 rounded-[1.6rem] object-cover ring-2 ring-red-500/50 sm:h-40 sm:w-40" />
            <div>
              <div className="text-2xl font-semibold tracking-wide text-white sm:text-3xl">{BUSINESS_NAME}</div>
              <div className="text-xs text-slate-300">Commercial Cleaning • Fire Safety • Compliance Support</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={actionLinks.call}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
            >
              <Icon name="phone" />
              Call
            </a>
            <a
              href={actionLinks.text}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 ring-1 ring-red-400/20 hover:bg-red-500/20"
            >
              <Icon name="sms" />
              Text
            </a>
            <a
              href={actionLinks.email}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
            >
              <Icon name="mail" />
              Email
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <img
              src={heroImg.src}
              alt={heroImg.alt}
              className="h-full w-full object-cover opacity-20"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/70" />
          </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-xs font-semibold text-red-200 ring-1 ring-red-400/20">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Fast quotes • Professional service • Built for inspections
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Clean kitchens. Safer businesses.{" "}
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  One team.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {BUSINESS_NAME} delivers commercial cleaning and fire-safety support—hood cleaning, suppression system
                readiness, extinguishers, janitorial, bar sanitation, and deep equipment cleaning—so your operation looks
                sharp and stays prepared.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#lead"
                  className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Get a Quote
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                >
                  View Services
                </a>
              </div>

              <div className="mt-6 text-sm text-slate-300">
                <span className="font-semibold">Call/Text:</span>{" "}
                <a className="underline decoration-white/30 hover:decoration-white" href={actionLinks.call}>
                  {PHONE_DISPLAY}
                </a>
                <span className="mx-2 text-slate-500">•</span>
                <span className="font-semibold">Service Area:</span> {SERVICE_AREA.join(", ")}
              </div>

              
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    { label: TRUST_POINTS[0].label, sub: TRUST_POINTS[0].sub },
                    { label: TRUST_POINTS[1].label, sub: TRUST_POINTS[1].sub },
                    { label: TRUST_POINTS[2].label, sub: TRUST_POINTS[2].sub },
                    { label: TRUST_POINTS[3].label, sub: TRUST_POINTS[3].sub },
                  ].map((t) => (
                    <div key={t.label} className="rounded-2xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-red-500/15 p-2 text-red-200 ring-1 ring-red-400/20">
                          <Icon name="check" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{t.label}</div>
                          <div className="mt-1 text-xs text-slate-300">{t.sub}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/0 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold text-white">Need a quick quote?</div>
                  <div className="mt-1 text-xs text-slate-300">
                    Tap to call/text/email — or submit the form below and we’ll respond fast.
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={actionLinks.call}
                      className="flex-1 rounded-xl bg-white/5 px-4 py-2 text-center text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                    >
                      Call
                    </a>
                    <a
                      href={actionLinks.text}
                      className="flex-1 rounded-xl bg-red-500/15 px-4 py-2 text-center text-sm font-semibold text-red-100 ring-1 ring-red-400/20 hover:bg-red-500/20"
                    >
                      Text
                    </a>
                    <a
                      href={actionLinks.email}
                      className="flex-1 rounded-xl bg-white/5 px-4 py-2 text-center text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className={`relative ${carouselIsPortrait ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[16/9]"} w-full overflow-hidden rounded-2xl bg-slate-900`}>
              <img
                src={ACTION_PHOTOS[slide].src}
                alt={ACTION_PHOTOS[slide].alt}
                className={carouselIsPortrait ? "h-full w-full object-contain" : "h-full w-full object-cover"}
              />
              <button
                type="button"
                onClick={() => setSlide((p) => (p - 1 + ACTION_PHOTOS.length) % ACTION_PHOTOS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl bg-slate-950/70 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-slate-900/80"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setSlide((p) => (p + 1) % ACTION_PHOTOS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-slate-950/70 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-slate-900/80"
              >
                Next
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {ACTION_PHOTOS.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={classNames(
                    "overflow-hidden rounded-xl ring-1 transition",
                    i === slide ? "ring-red-400/40" : "ring-white/10 hover:ring-white/20"
                  )}
                >
                  <img src={p.src} alt={p.alt} className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="sticker" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                <img
                  src={STICKER.src}
                  alt={STICKER.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Service Sticker</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                A branded service sticker can be placed after work is completed. It reinforces accountability and helps
                staff and inspectors quickly identify service history on‑site.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-100 ring-1 ring-red-400/20">
                  Visible on equipment
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ring-1 ring-white/10">
                  Supports inspections
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ring-1 ring-white/10">
                  Records & dates
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Services</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                Built for restaurants, bars, commercial kitchens, and facilities that need consistent cleaning and
                safety-first support.
              </p>
            </div>
            <a
              href="#lead"
              className="hidden rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 sm:inline-flex"
            >
              Request a Quote
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const cardImg = bannerDeck[i % bannerDeck.length];
              const cardIsPortrait = isPortraitSrc(cardImg.src);
              return (
                <div
                  key={s.title}
                  className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/[0.07] transition"
                >
                  <div
                    className={classNames(
                      "mb-4 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-slate-900",
                      cardIsPortrait ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[16/9]"
                    )}
                  >
                    <img
                      src={cardImg.src}
                      alt={cardImg.alt}
                      className={cardIsPortrait ? "h-full w-full object-contain" : "h-full w-full object-cover"}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                    </div>
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-red-400/80" />
                        <span className="text-slate-200">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, service: s.title }))}
                      className="rounded-xl bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 ring-1 ring-red-400/20 hover:bg-red-500/20"
                    >
                      Select for Quote
                    </button>
                    <a
                      href={actionLinks.text}
                      className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                    >
                      Text About This
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="photos" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">On‑Site Results</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">A quick look at recent work</p>

          <div className="mt-6">
            <div className="relative mx-auto h-[260px] max-w-4xl sm:h-[320px] md:h-[360px]">
              <div className="absolute left-8 top-4 z-10 overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src={bannerDeck[0].src}
                  alt={bannerDeck[0].alt}
                  className="h-40 w-56 rotate-[-6deg] object-cover opacity-95 sm:h-48 sm:w-64 md:h-56 md:w-72"
                  loading="lazy"
                />
              </div>
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 overflow-hidden rounded-3xl ring-2 ring-red-500/30">
                <img
                  src={heroImg.src}
                  alt={heroImg.alt}
                  className="h-56 w-72 object-cover opacity-95 sm:h-64 sm:w-80 md:h-72 md:w-96"
                  loading="lazy"
                />
              </div>
              <div className="absolute right-8 top-6 z-10 overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src={bannerDeck[1 % bannerDeck.length].src}
                  alt={bannerDeck[1 % bannerDeck.length].alt}
                  className="h-40 w-56 rotate-[6deg] object-cover opacity-95 sm:h-48 sm:w-64 md:h-56 md:w-72"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">How it works</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                { step: "01", title: "Tell us what you need", desc: "Call, text, email, or submit the form. Pick the service and share your timeline." },
                { step: "02", title: "We confirm scope + schedule", desc: "We’ll clarify details, confirm access, and lock in the plan with professional communication." },
                { step: "03", title: "Service + documentation", desc: "We complete the work and keep it clean, clear, and record-friendly for your business." },
              ].map((x) => (
                <div key={x.step} className="rounded-3xl bg-slate-950/40 p-6 ring-1 ring-white/10">
                  <div className="text-xs font-semibold text-red-300">{x.step}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{x.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-300">{x.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="lead" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Customer Intake Form</h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">Fill out the form and we’ll respond quickly.</p>

              <div className="mt-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-sm font-semibold text-white">Direct contact</div>
                <div className="mt-3 grid gap-2 text-sm text-slate-200">
                  <a href={actionLinks.call} className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10">
                    <Icon name="phone" />
                    <span className="font-semibold">Call:</span> {PHONE_DISPLAY}
                  </a>
                  <a href={actionLinks.text} className="inline-flex items-center gap-2 rounded-2xl bg-red-500/15 px-4 py-3 text-red-100 ring-1 ring-red-400/20 hover:bg-red-500/20">
                    <Icon name="sms" />
                    <span className="font-semibold">Text:</span> {PHONE_DISPLAY}
                  </a>
                  <a href={actionLinks.email} className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10">
                    <Icon name="mail" />
                    <span className="font-semibold">Email:</span> {EMAIL}
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-sm font-semibold text-white">Most-requested services</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Hood cleaning",
                    "Fire suppression systems",
                    "Fire extinguishers",
                    "Janitorial cleaning",
                    "Bar cleaning & sanitation",
                    "Kitchen equipment deep cleaning",
                  ].map((x) => (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, service: x }))}
                      className={classNames(
                        "rounded-full px-4 py-2 text-xs font-semibold ring-1 transition",
                        form.service === x
                          ? "bg-red-500/20 text-red-100 ring-red-400/30"
                          : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                      )}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={onSubmit} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-200">Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder="First + last name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-200">Business / Location</label>
                    <input
                      name="business"
                      value={form.business}
                      onChange={onChange}
                      className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder="Restaurant, bar, facility name"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-200">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder="###-###-####"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-200">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder="name@company.com"
                    />
                  </div>

                  <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-200">Service Needed</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={onChange}
                        className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      >
                        {[
                          "Hood cleaning",
                          "Fire suppression systems",
                          "Fire extinguishers",
                          "Janitorial cleaning",
                          "Bar cleaning and sanitation",
                          "Kitchen equipment deep cleaning",
                        ].map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-200">Preferred Contact</label>
                      <select
                        name="preferred"
                        value={form.preferred}
                        onChange={onChange}
                        className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      >
                        {["Text", "Call", "Email"].map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-200">Details</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      rows={5}
                      className="mt-2 w-full rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      placeholder="Tell us your timeline, kitchen size, frequency, or what you need help with."
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500"
                  >
                    Prepare My Request
                  </button>

                  <div className="flex gap-2">
                    <a
                      href={actionLinks.text}
                      className="inline-flex items-center gap-2 rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100 ring-1 ring-red-400/20 hover:bg-red-500/20"
                    >
                      <Icon name="sms" />
                      Text Now
                    </a>
                    <a
                      href={actionLinks.call}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                    >
                      <Icon name="phone" />
                      Call
                    </a>
                  </div>
                </div>

                {status.type !== "idle" && (
                  <div
                    className={classNames(
                      "mt-5 rounded-2xl px-4 py-3 text-sm ring-1",
                      status.type === "success"
                        ? "bg-green-50 text-green-700 ring-green-200"
                        : "bg-red-50 text-red-700 ring-red-200"
                    )}
                  >
                    {status.msg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Do you service restaurants, bars, and commercial kitchens?",
                a: "Yes—our services are designed specifically for commercial operations, including restaurants, bars, and facilities with kitchen exhaust systems.",
              },
              {
                q: "Can you help us get ready for an inspection?",
                a: "Absolutely. We’ll focus on high-impact areas, provide clear documentation, and coordinate around your timeline so you’re prepared.",
              },
              {
                q: "Do you offer recurring janitorial schedules?",
                a: "Yes—daily, weekly, and custom schedules are available depending on your facility size and needs.",
              },
              {
                q: "How do we get a quote?",
                a: "Call, text, or submit the form above. We’ll ask a few quick questions and respond with next steps fast.",
              },
            ].map((f) => (
              <div key={f.q} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-sm font-semibold text-white">{f.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-300">{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold text-slate-200">{BUSINESS_NAME}</div>
                <div className="mt-1">
                  <a className="hover:text-white" href={actionLinks.call}>
                    {PHONE_DISPLAY}
                  </a>
                  <span className="mx-2 text-slate-600">•</span>
                  <a className="hover:text-white" href={actionLinks.email}>
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
              </div>
            </div>
          </div>
        </footer>

        <div className="fixed bottom-3 left-0 right-0 z-50 px-3 sm:hidden">
          <div className="mx-auto flex max-w-md gap-2 rounded-3xl bg-slate-950/80 p-2 ring-1 ring-white/10 backdrop-blur">
            <a
              href={actionLinks.call}
              className="flex-1 rounded-2xl bg-white/5 px-3 py-3 text-center text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
            >
              Call
            </a>
            <a
              href={actionLinks.text}
              className="flex-1 rounded-2xl bg-red-600 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-red-500"
            >
              Text
            </a>
            <a
              href={actionLinks.email}
              className="flex-1 rounded-2xl bg-white/5 px-3 py-3 text-center text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
            >
              Email
            </a>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: BUSINESS_NAME,
              telephone: PHONE_DISPLAY,
              email: EMAIL,
              areaServed: SERVICE_AREA,
              description:
                "Commercial hood cleaning, fire suppression system readiness, fire extinguisher support, janitorial cleaning, bar sanitation, and kitchen equipment deep cleaning.",
            },
            null,
            2
          ),
        }}
      />
    </div>
  );
}
