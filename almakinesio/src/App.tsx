import { useEffect, useState, type ReactNode } from "react";

type Lang = "fr" | "es";

const copy = {
  fr: {
    nav: ["La kinésiologie", "Pour qui ?", "Une séance", "À propos"],
    navIds: ["kinesiologie", "pour-qui", "seance", "a-propos"],
    booking: "Prendre rendez-vous",
    eyebrow: "Kinésiologue à Llíria · Espagne",
    heroTitle: (
      <>
        Retrouver l’équilibre,
        <br />
        <em>naturellement.</em>
      </>
    ),
    heroText:
      "Une approche douce et globale pour mieux comprendre ce qui vous traverse, libérer les tensions et avancer avec plus de sérénité.",
    heroCta: "Découvrir la kinésiologie",
    scroll: "Faire défiler",
    introTag: "Corps · émotions · énergie",
    introTitle: "Votre corps connaît le chemin.",
    introText:
      "La kinésiologie est une approche humaine globale, à la croisée de la physiologie occidentale, de l’énergétique traditionnelle chinoise et des neurosciences. Elle aide à identifier l’origine d’un déséquilibre et à libérer les charges émotionnelles qui y sont associées.",
    quote:
      "Retrouver un espace intérieur plus calme, où le corps et l’esprit peuvent à nouveau dialoguer.",
    forTag: "Un accompagnement pour chacun",
    forTitle: "Dans quel cas faire appel à la kinésiologie ?",
    forIntro:
      "À tout âge de la vie, la kinésiologie vous accompagne dans les périodes de tension, de transition ou de questionnement.",
    needs: [
      ["Équilibre & vitalité", "Fatigue, sommeil difficile, baisse d’énergie ou sensation d’être constamment sous tension."],
      ["Stress & émotions", "Apaiser la charge mentale, mieux accueillir ses émotions et retrouver de la sérénité."],
      ["Relations & confiance", "Dépasser les schémas récurrents et construire des relations plus justes et apaisées."],
      ["Enfants & apprentissage", "Accompagner les difficultés scolaires, la concentration, les peurs ou le sommeil."],
      ["Changements de vie", "Traverser plus sereinement une séparation, un deuil, un déménagement ou un nouveau départ."],
      ["Connaissance de soi", "Mieux comprendre ses réactions, ses besoins et remettre du mouvement là où tout semble bloqué."],
    ],
    sessionTag: "Votre séance",
    sessionTitle: "Un temps pour vous, à votre rythme.",
    sessionIntro:
      "Chaque accompagnement est unique. La séance se déroule dans un cadre confidentiel, avec écoute, douceur et sans jugement.",
    steps: [
      ["01", "Échanger", "Nous commençons par un temps d’écoute pour clarifier ce que vous vivez et définir ensemble votre objectif."],
      ["02", "Interroger le corps", "Grâce à une légère pression sur le bras, le test musculaire nous guide vers les déséquilibres prioritaires."],
      ["03", "Rééquilibrer", "Des techniques douces permettent de libérer le stress associé et de soutenir vos propres ressources."],
    ],
    aboutTag: "Votre praticienne",
    aboutTitle: "Bonjour, je suis Laetitia.",
    aboutText1:
      "Je vous accompagne avec bienveillance vers un mieux-être durable. Mon approche place l’écoute, la confiance et le respect de votre rythme au cœur de chaque séance.",
    aboutText2:
      "Je reçois enfants, adolescents et adultes au cabinet à Llíria ou à domicile, en français, espagnol et anglais.",
    signature: "Laetitia Sanchez Jolibert",
    location: "Cabinet & domicile · Llíria",
    shareTag: "À garder et à partager",
    shareTitle: "La kinésiologie pourrait aider quelqu’un autour de vous ?",
    shareText:
      "Téléchargez le flyer pour le conserver, l’imprimer ou le transmettre simplement à vos proches.",
    shareDownload: "Télécharger le flyer",
    shareFile: "Flyer en français · PDF",
    placeTag: "Le cabinet",
    placeTitle: "Un espace calme, pensé pour vous accueillir.",
    placeText:
      "Laetitia vous reçoit dans un cadre chaleureux et confidentiel à Alma Kinesio, à Llíria. Les séances sont également possibles à domicile.",
    placeDirections: "Ouvrir l’itinéraire",
    placePhotoAlt: "L’intérieur chaleureux du cabinet de kinésiologie de Laetitia à Llíria",
    placeMapTitle: "Localisation du cabinet de Laetitia à Llíria",
    contactTag: "Le premier pas",
    contactTitle: "Et si nous en parlions ?",
    contactText:
      "Une question avant de prendre rendez-vous ? Appelez-moi ou écrivez-moi, je vous répondrai avec plaisir.",
    call: "Appeler Laetitia",
    email: "Écrire sur WhatsApp",
    addressLabel: "Le cabinet",
    address: "Alma Kinesio\nApartado 235, 46160 Llíria · Espagne",
    appointment: "Sur rendez-vous, au cabinet et à domicile",
    disclaimer:
      "La kinésiologie est une méthode d’accompagnement au bien-être. Elle ne remplace pas un avis, un diagnostic ou un traitement médical.",
    footer: "Kinésiologie avec douceur à Llíria, Espagne.",
    menu: "Menu",
    close: "Fermer",
  },
  es: {
    nav: ["La kinesiología", "¿Para quién?", "Una sesión", "Sobre mí"],
    navIds: ["kinesiologie", "pour-qui", "seance", "a-propos"],
    booking: "Pedir cita",
    eyebrow: "Kinesióloga en Llíria · España",
    heroTitle: (
      <>
        Recupera tu equilibrio,
        <br />
        <em>de forma natural.</em>
      </>
    ),
    heroText:
      "Un enfoque suave e integral para comprender mejor lo que te ocurre, liberar tensiones y avanzar con mayor serenidad.",
    heroCta: "Descubrir la kinesiología",
    scroll: "Deslizar",
    introTag: "Cuerpo · emociones · energía",
    introTitle: "Tu cuerpo conoce el camino.",
    introText:
      "La kinesiología es un enfoque humano e integral que reúne la fisiología occidental, la energética tradicional china y las neurociencias. Ayuda a identificar el origen de un desequilibrio y a liberar las cargas emocionales asociadas.",
    quote:
      "Recuperar un espacio interior más tranquilo, donde el cuerpo y la mente puedan volver a dialogar.",
    forTag: "Un acompañamiento para cada persona",
    forTitle: "¿Cuándo recurrir a la kinesiología?",
    forIntro:
      "En cualquier etapa de la vida, la kinesiología puede acompañarte en momentos de tensión, transición o cuestionamiento.",
    needs: [
      ["Equilibrio y vitalidad", "Cansancio, sueño difícil, falta de energía o sensación de estar siempre bajo tensión."],
      ["Estrés y emociones", "Aliviar la carga mental, acoger mejor tus emociones y recuperar la serenidad."],
      ["Relaciones y confianza", "Superar patrones recurrentes y construir relaciones más sanas y tranquilas."],
      ["Infancia y aprendizaje", "Acompañar dificultades escolares, concentración, miedos o problemas de sueño."],
      ["Cambios vitales", "Afrontar con más serenidad una separación, un duelo, una mudanza o un nuevo comienzo."],
      ["Conocimiento personal", "Comprender tus reacciones y necesidades, y volver a avanzar cuando todo parece bloqueado."],
    ],
    sessionTag: "Tu sesión",
    sessionTitle: "Un momento para ti, a tu ritmo.",
    sessionIntro:
      "Cada acompañamiento es único. La sesión se desarrolla en un espacio confidencial, con escucha, suavidad y sin juicios.",
    steps: [
      ["01", "Conversar", "Empezamos escuchando lo que estás viviendo y definiendo juntos el objetivo de la sesión."],
      ["02", "Escuchar el cuerpo", "Mediante una suave presión sobre el brazo, el test muscular nos orienta hacia los desequilibrios prioritarios."],
      ["03", "Reequilibrar", "Técnicas suaves permiten liberar el estrés asociado y apoyar tus propios recursos."],
    ],
    aboutTag: "Tu kinesióloga",
    aboutTitle: "Hola, soy Laetitia.",
    aboutText1:
      "Te acompaño con atención y calidez hacia un bienestar duradero. La escucha, la confianza y el respeto de tu ritmo están en el centro de cada sesión.",
    aboutText2:
      "Recibo a niños, adolescentes y adultos en mi consulta de Llíria o a domicilio, en francés, español e inglés.",
    signature: "Laetitia Sanchez Jolibert",
    location: "Consulta y domicilio · Llíria",
    shareTag: "Para guardar y compartir",
    shareTitle: "¿La kinesiología podría ayudar a alguien de tu entorno?",
    shareText:
      "Descarga el folleto para guardarlo, imprimirlo o compartirlo fácilmente con tus familiares y amigos.",
    shareDownload: "Descargar el folleto",
    shareFile: "Folleto en español · PDF",
    placeTag: "La consulta",
    placeTitle: "Un espacio tranquilo, pensado para recibirte.",
    placeText:
      "Laetitia te recibe en un entorno cálido y confidencial en Alma Kinesio, en Llíria. Las sesiones también pueden realizarse a domicilio.",
    placeDirections: "Abrir la ruta",
    placePhotoAlt: "El interior acogedor de la consulta de kinesiología de Laetitia en Llíria",
    placeMapTitle: "Ubicación de la consulta de Laetitia en Llíria",
    contactTag: "El primer paso",
    contactTitle: "¿Hablamos?",
    contactText:
      "¿Tienes alguna pregunta antes de pedir cita? Llámame o escríbeme, estaré encantada de responderte.",
    call: "Llamar a Laetitia",
    email: "Escribir por WhatsApp",
    addressLabel: "La consulta",
    address: "Alma Kinesio\nApartado 235, 46160 Llíria · España",
    appointment: "Con cita previa, en consulta y a domicilio",
    disclaimer:
      "La kinesiología es un método de acompañamiento para el bienestar. No sustituye el asesoramiento, el diagnóstico ni el tratamiento médico.",
    footer: "Kinesiología con suavidad en Llíria, España.",
    menu: "Menú",
    close: "Cerrar",
  },
};

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

export default function App() {
  const [lang, setLang] = useState<Lang>(() =>
    window.location.pathname.startsWith("/es") ? "es" : "fr",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    const isSpanish = lang === "es";
    const title = isSpanish
      ? "Laetitia Sanchez | Kinesióloga en Llíria, Valencia"
      : "Laetitia Sanchez | Kinésiologue à Llíria, Espagne";
    const description = isSpanish
      ? "Laetitia Sanchez, kinesióloga en Llíria, Valencia. Sesiones para niños, adolescentes y adultos en español, francés e inglés."
      : "Laetitia Sanchez, kinésiologue à Llíria près de Valencia. Séances pour enfants, adolescents et adultes en français, espagnol et anglais.";
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

  return (
    <div className="site-shell">
      <header className="header">
        <button className="brand" onClick={() => goTo("accueil")} aria-label="Retour à l’accueil">
          <img className="brand-logo" src="/assets/logo-laetitia.png" alt="Laetitia Sanchez" />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          {t.nav.map((label, index) => (
            <button key={label} onClick={() => goTo(t.navIds[index])}>
              {label}
            </button>
          ))}
          <a className="nav-booking mobile-booking" href="tel:+34611935465">
            {t.booking}
          </a>
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
          <a className="nav-booking" href="tel:+34611935465">
            {t.booking} <Arrow diagonal />
          </a>
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
            <h1>{t.heroTitle}</h1>
            <p>{t.heroText}</p>
            <button className="text-link" onClick={() => goTo("kinesiologie")}>
              {t.heroCta} <Arrow />
            </button>
          </div>
          <div className="portrait-wrap" aria-label="Portrait de Laetitia Sanchez Jolibert">
            <div className="portrait-halo" />
            <img src="/assets/laetitia-retouchee.png" alt="Laetitia Sanchez Jolibert, kinésiologue à Llíria" />
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
            {t.needs.map(([title, text]) => (
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
            {t.steps.map(([number, title, text]) => (
              <article className="step reveal" key={number}>
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
            <img src="/assets/laetitia-retouchee.png" alt="" />
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
            <img src="/assets/cabinet-laetitia.png" alt={t.placePhotoAlt} />
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
                src="https://www.google.com/maps?q=39.645194%2C-0.6426005&output=embed&z=15"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="map-place-label"
                href="https://www.google.com/maps/search/?api=1&query=39.645194%2C-0.6426005"
                target="_blank"
                rel="noreferrer"
                aria-label="Ouvrir Alma Kinesio dans Google Maps"
              >
                Alma Kinesio
              </a>
              <div className="map-caption">
                <p>{t.address}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=39.645194%2C-0.6426005"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.placeDirections} <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
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
            href={
              lang === "fr"
                ? "/documents/flyer-kinesiologie-laetitia-fr.pdf"
                : "/documents/flyer-kinesiologie-laetitia-es.pdf"
            }
            download
            aria-label={`${t.shareDownload} — ${t.shareFile}`}
          >
            <div className="flyer-sheet flyer-sheet-back" />
            <div className="flyer-sheet flyer-sheet-front">
              <img src="/assets/logo-laetitia.png" alt="" />
              <span>{lang === "fr" ? "Découvrez" : "Descubre"}</span>
              <strong>{lang === "fr" ? "la kinésiologie" : "la kinesiología"}</strong>
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
              <a className="primary-button" href="tel:+34611935465">
                {t.call} <Arrow diagonal />
              </a>
              <a
                className="secondary-button"
                href={`https://wa.me/34611935465?text=${encodeURIComponent(
                  lang === "fr"
                    ? "Bonjour Laetitia, je souhaiterais avoir des informations sur une séance de kinésiologie."
                    : "Hola Laetitia, me gustaría recibir información sobre una sesión de kinesiología.",
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.email} <Arrow />
              </a>
            </div>
          </div>
          <aside className="contact-card reveal">
            <span className="kicker">{t.addressLabel}</span>
            <p>{t.address}</p>
            <a href="tel:+34611935465">+34 611 93 54 65</a>
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
          <a href="tel:+34611935465">+34 611 93 54 65</a>
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
