import fr from "./content/fr.json";
import es from "./content/es.json";
import site from "./content/site.json";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

type Lang = "fr" | "es";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const copy = { fr, es };
const navIds = ["kinesiologie", "pour-qui", "seance", "a-propos"];
const phoneDigits = site.phoneDisplay.replace(/[^0-9]/g, "");

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={diagonal ? "M5 19 19 5M9 5h10v10" : "M5 12h14M14 7l5 5-5 5"} />
    </svg>
  );
}

function Butterfly({ className = "" }: { className?: string }) {
  return (
    <span className={`butterfly ${className}`} aria-hidden="true">
      <img src="/assets/flyer-butterfly.png" alt="" />
    </span>
  );
}

function SectionTitle({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div className="section-heading reveal">
      <span className="kicker">{tag}</span>
      <h2>{children}</h2>
    </div>
  );
}

const calendlyUrl = site.calendlyUrl;

function CalendlyEmbed({ title, lang }: { title: string; lang: Lang }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetUrl = `${calendlyUrl}?background_color=f8f7f7&text_color=2662af&primary_color=398080&locale=${lang}&hide_gdpr_banner=1`;

  useEffect(() => {
    const initializeWidget = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.replaceChildren();
      window.Calendly.initInlineWidget({
        url: widgetUrl,
        parentElement: containerRef.current,
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    if (window.Calendly) {
      initializeWidget();
      return;
    }

    const script = existingScript ?? document.createElement("script");
    script.addEventListener("load", initializeWidget);

    if (!existingScript) {
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }

    return () => script.removeEventListener("load", initializeWidget);
  }, [widgetUrl]);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget"
      data-url={widgetUrl}
      aria-label={title}
    />
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() =>
    window.location.pathname.startsWith("/es") ? "es" : "fr",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const localizedCalendlyUrl = `${calendlyUrl}?locale=${lang}`;

  useEffect(() => {
    document.documentElement.lang = lang;
    const isSpanish = lang === "es";
    const title = copy[lang].seoTitle;
    const description = copy[lang].seoDescription;
    const canonical = `https://www.almakinesio.com${isSpanish ? "/es/" : "/"}`;

    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
  }, [lang]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const syncLanguageWithUrl = () =>
      setLang(window.location.pathname.startsWith("/es") ? "es" : "fr");
    window.addEventListener("popstate", syncLanguageWithUrl);
    return () => window.removeEventListener("popstate", syncLanguageWithUrl);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const changeLanguage = (nextLanguage: Lang) => {
    setLang(nextLanguage);
    window.history.pushState({}, "", nextLanguage === "es" ? "/es/" : "/");
  };

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="site-shell">
      <header className="header">
        <button className="brand" onClick={() => goTo("accueil")} aria-label="Retour à l’accueil">
          <img className="brand-logo" src="/assets/logo-laetitia.png" alt="Laetitia Sanchez" />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          {t.nav.map((label, index) => (
            <button key={label} onClick={() => goTo(navIds[index])}>
              {label}
            </button>
          ))}
          <button
            className="nav-booking mobile-booking"
            onClick={() => goTo("rendez-vous")}
          >
            {t.booking}
          </button>
        </nav>
        <div className="header-actions">
          <div className="language" aria-label="Choisir la langue">
            <button
              className={lang === "fr" ? "active" : ""}
              onClick={() => changeLanguage("fr")}
            >
              FR
            </button>
            <span>/</span>
            <button
              className={lang === "es" ? "active" : ""}
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>
          </div>
          <button className="nav-booking" onClick={() => goTo("rendez-vous")}>
            {t.booking} <Arrow diagonal />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.close : t.menu}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <Butterfly className="hero-butterfly" />
          <div className="orbit-note orbit-one" aria-hidden="true">respirer</div>
          <div className="orbit-note orbit-two" aria-hidden="true">écouter</div>
          <div className="hero-copy">
            <span className="kicker hero-kicker">{t.eyebrow}</span>
            <h1>
              {t.heroTitleLine1}
              <br />
              <em>{t.heroTitleEmphasis}</em>
            </h1>
            <p>{t.heroText}</p>
            <button className="text-link" onClick={() => goTo("kinesiologie")}>
              {t.heroCta} <Arrow />
            </button>
          </div>
          <div className="portrait-wrap" aria-label="Portrait de Laetitia Sanchez Jolibert">
            <div className="portrait-halo" />
            <img src={site.portrait} alt="Laetitia Sanchez Jolibert, kinésiologue à Llíria" />
            <span className="portrait-note">Llíria<br />Valencia</span>
          </div>
          <span className="scroll-hint">{t.scroll}<i /></span>
        </section>

        <section className="intro section" id="kinesiologie">
          <SectionTitle tag={t.introTag}>{t.introTitle}</SectionTitle>
          <div className="intro-body reveal">
            <p>{t.introText}</p>
            <blockquote>{t.quote}</blockquote>
          </div>
          <Butterfly className="intro-butterfly" />
        </section>

        <section className="needs section" id="pour-qui">
          <div className="needs-top">
            <SectionTitle tag={t.forTag}>{t.forTitle}</SectionTitle>
            <p className="lead reveal">{t.forIntro}</p>
          </div>
          <div className="needs-grid">
            <svg
              className="journey-path"
              viewBox="0 0 800 1280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="hand-drawn-arrow"
                  viewBox="0 0 10 14"
                  refX="8"
                  refY="7"
                  markerWidth="10"
                  markerHeight="14"
                  orient="auto"
                >
                  <path className="arrow-tip" d="M1 1 Q5 3.5 8 7 M1 13 Q5 10.5 8 7" />
                </marker>
              </defs>
              <path
                markerEnd="url(#hand-drawn-arrow)"
                d="M176 0 C176 105 624 105 624 213 S176 320 176 426 S624 533 624 640 S176 747 176 853 C176 940 330 1067 465 1067"
              />
            </svg>
            {t.needs.map(({ title, text }) => (
              <article className="need-card reveal" key={title}>
                <div className="need-icon">
                  <svg viewBox="0 0 52 52" aria-hidden="true">
                    <path d="M26 3c2 11 8 17 19 19-11 2-17 8-19 19-2-11-8-17-19-19C18 20 24 14 26 3Z" />
                    <circle cx="26" cy="22" r="4" />
                  </svg>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="session section" id="seance">
          <div className="session-title-wrap">
            <SectionTitle tag={t.sessionTag}>{t.sessionTitle}</SectionTitle>
            <p className="lead reveal">{t.sessionIntro}</p>
          </div>
          <div className="steps">
            {t.steps.map(({ title, text }) => (
              <article className="step reveal" key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="a-propos">
          <div className="about-portrait reveal">
            <div className="about-circle" />
            <img src={site.aboutPortrait} alt="" />
          </div>
          <div className="about-copy">
            <SectionTitle tag={t.aboutTag}>{t.aboutTitle}</SectionTitle>
            <div className="reveal">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <div className="signature">
                <strong>{t.signature}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="place section">
          <div className="place-photo reveal">
            <img src={site.sessionPhoto} alt={t.placePhotoAlt} />
          </div>
          <div className="place-details">
            <div className="place-copy reveal">
              <span className="kicker">{t.placeTag}</span>
              <h2>{t.placeTitle}</h2>
              <p>{t.placeText}</p>
            </div>
            <div className="map-wrap reveal">
              <iframe
                title={t.placeMapTitle}
                src="https://www.google.com/maps?q=Nucleo%20Barranquet%20Montarago%20167%2C%2046160%20Lliria&output=embed&z=15"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="map-place-label"
                href="https://www.google.com/maps/search/?api=1&query=Nucleo%20Barranquet%20Montarago%20167%2C%2046160%20Lliria"
                target="_blank"
                rel="noreferrer"
                aria-label="Ouvrir Alma Kinesio dans Google Maps"
              >
                Alma Kinesio
              </a>
              <div className="map-caption">
                <p>{t.address}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Nucleo%20Barranquet%20Montarago%20167%2C%2046160%20Lliria"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.placeDirections} <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="booking-section section" id="rendez-vous">
          <div className="booking-intro reveal">
            <span className="kicker">{t.bookingTag}</span>
            <h2>{t.bookingTitle}</h2>
            <p>{t.bookingText}</p>
          </div>
          <div className="calendly-shell reveal">
            <CalendlyEmbed key={lang} title={t.bookingTitle} lang={lang} />
          </div>
          <a
            className="calendly-fallback"
            href={localizedCalendlyUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t.bookingFallback} <Arrow diagonal />
          </a>
        </section>

        <section className="share section">
          <Butterfly className="share-butterfly" />
          <div className="share-copy reveal">
            <span className="kicker">{t.shareTag}</span>
            <h2>{t.shareTitle}</h2>
            <p>{t.shareText}</p>
          </div>
          <a
            className="flyer-preview reveal"
            href={t.flyerPdf}
            download
            aria-label={`${t.shareDownload} — ${t.shareFile}`}
          >
            <div className="flyer-sheet flyer-sheet-back" />
            <div className="flyer-sheet flyer-sheet-front">
              <img src="/assets/logo-laetitia.png" alt="" />
              <span>{t.flyerLine1}</span>
              <strong>{t.flyerLine2}</strong>
              <i />
              <small>almakinesio.com</small>
            </div>
            <span className="pdf-badge">PDF</span>
          </a>
        </section>

        <section className="contact section" id="contact">
          <Butterfly className="contact-butterfly" />
          <div className="contact-main">
            <SectionTitle tag={t.contactTag}>{t.contactTitle}</SectionTitle>
            <p className="reveal">{t.contactText}</p>
            <div className="contact-actions reveal">
              <a className="primary-button" href={`tel:+${phoneDigits}`}>
                {t.call} <Arrow diagonal />
              </a>
              <a
                className="secondary-button"
                href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent(t.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.email} <Arrow />
              </a>
            </div>
            <form className="contact-email-form reveal" onSubmit={prepareEmail}>
              <div className="contact-email-heading">
                <h3>{t.shareContactTitle}</h3>
                <p>{t.shareContactText}</p>
              </div>
              <label>
                <span>{t.shareSubject}</span>
                <input
                  type="text"
                  name="subject"
                  placeholder={t.shareSubjectPlaceholder}
                  required
                />
              </label>
              <label>
                <span>{t.shareMessage}</span>
                <textarea
                  name="message"
                  placeholder={t.shareMessagePlaceholder}
                  rows={3}
                  required
                />
              </label>
              <div className="contact-email-actions">
                <button type="submit">
                  {t.shareSend} <Arrow diagonal />
                </button>
                <p>
                  {t.shareDirect}{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
            </form>
          </div>
          <aside className="contact-card reveal">
            <span className="kicker">{t.addressLabel}</span>
            <p>{t.address}</p>
            <a href={`tel:+${phoneDigits}`}>{site.phoneDisplay}</a>
            <span>{t.appointment}</span>
          </aside>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/assets/logo-laetitia-white.svg"
            alt="Laetitia Sanchez"
          />
          <div>
            <span>{t.footer}</span>
          </div>
        </div>
        <p>{t.disclaimer}</p>
        <div className="footer-links">
          <a href={`tel:+${phoneDigits}`}>{site.phoneDisplay}</a>
          <a href="https://www.almakinesio.com">almakinesio.com</a>
        </div>
        <div className="footer-legal">
          <span>© Laetitia Sanchez — Almakinesio.com</span>
          <a
            className="studio-credit"
            href="https://wa.me/33782679989?text=Bonjour%20Matavai%20Studio%2C%20je%20vous%20contacte%20depuis%20le%20site%20Almakinesio."
            target="_blank"
            rel="noreferrer"
            aria-label="Contacter Matavai Studio sur WhatsApp"
          >
            <span>Proudly created and developed by</span>
            <img
              className="studio-logo"
              src="/assets/logo-matavai-studio.png"
              alt="Matavai Studio"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
