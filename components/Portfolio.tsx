"use client";

import { useEffect, useState } from "react";
import { content, links, type Lang, type Shot } from "@/content/content";
import ProjectCard from "./ProjectCard";

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("pt");
  const [shot, setShot] = useState<Shot | null>(null);
  const [copied, setCopied] = useState(false);
  const t = content[lang];

  // restore language choice, or use the browser language on first visit
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "pt" || saved === "en") setLang(saved);
      else if (!navigator.language.toLowerCase().startsWith("pt")) setLang("en");
    } catch {
      /* storage unavailable: keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  useEffect(() => {
    if (!shot) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShot(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shot]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is visible and selectable */
    }
  }

  const [featured, ...otherAi] = t.aiProjects;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-panel focus:p-2">
        Skip to content
      </a>

      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="font-mono text-sm tracking-widest text-fg">
            ARTHUR<span className="text-accent">.</span>OLIVEIRA
          </a>
          <ul className="hidden items-center gap-6 font-mono text-[0.78rem] tracking-wider text-muted uppercase md:flex">
            <li><a className="hover:text-accent" href="#about">{t.nav.about}</a></li>
            <li><a className="hover:text-accent" href="#ai">{t.nav.ai}</a></li>
            <li><a className="hover:text-accent" href="#web">{t.nav.web}</a></li>
            <li><a className="hover:text-accent" href="#stack">{t.nav.stack}</a></li>
            <li><a className="hover:text-accent" href="#contact">{t.nav.contact}</a></li>
          </ul>
          <div className="flex border border-line font-mono text-[0.75rem]" role="group" aria-label="Idioma / Language">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-3 py-1 uppercase tracking-wider ${lang === l ? "bg-accent text-ink" : "text-muted hover:text-fg"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main id="main" className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-16 sm:px-6">
        {/* hero */}
        <section id="top" className="rise grid gap-10 pt-16 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.78rem] tracking-[0.18em] text-accent uppercase">{t.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] font-bold text-white sm:text-7xl">
              Arthur
              <br />
              Oliveira<span className="blink text-accent">_</span>
            </h1>
            <p className="mt-5 font-display text-xl text-fg sm:text-2xl">
              {t.hero.role} <span className="text-accent">{t.hero.roleAccent}</span>
            </p>
            <p className="mt-4 max-w-[60ch] text-[1.02rem] leading-relaxed text-muted">{t.hero.pitch}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#ai" className="bg-accent px-5 py-3 font-mono text-sm font-medium text-ink hover:bg-white">
                {t.hero.ctaProjects} →
              </a>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent/60 px-5 py-3 font-mono text-sm text-accent hover:bg-accent/10"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* console card */}
          <div className="hud p-5 font-mono text-[0.8rem] leading-7">
            <p className="text-muted">$ whoami</p>
            <p className="text-fg">arthur.oliveira — {t.hero.location}</p>
            <p className="mt-2 text-muted">$ ls ./links</p>
            <p>
              <a className="text-accent hover:underline" href={links.github} target="_blank" rel="noopener noreferrer">github/arthuroliveira10</a>
            </p>
            <p>
              <a className="text-accent hover:underline" href={links.linkedin} target="_blank" rel="noopener noreferrer">linkedin/arthur-oliveira</a>
            </p>
            <p className="text-fg select-all">{links.email}</p>
            <p className="mt-2 text-muted">$ cat stack.txt</p>
            <p className="text-violet">Python · FastAPI · Next.js · TypeScript · Groq · Gemini</p>
          </div>
        </section>

        {/* about */}
        <section id="about" className="flex flex-col gap-6">
          <h2 className="section-label">{t.about.title}</h2>
          <p className="max-w-[68ch] text-lg leading-relaxed">{t.about.text}</p>
          <ul className="grid gap-4 md:grid-cols-3">
            {t.about.principles.map((p) => (
              <li key={p.title} className="border-l-2 border-accent bg-panel/60 px-4 py-3">
                <p className="font-display text-base font-semibold text-white">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* AI projects */}
        <section id="ai" className="flex flex-col gap-6">
          <h2 className="section-label">{t.aiTitle}</h2>
          <ProjectCard project={featured} t={t} featured onOpen={setShot} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <ProjectCard project={otherAi[0]} t={t} onOpen={setShot} />
            </div>
            {otherAi.slice(1).map((p) => (
              <ProjectCard key={p.id} project={p} t={t} onOpen={setShot} />
            ))}
          </div>
        </section>

        {/* web projects */}
        <section id="web" className="flex flex-col gap-6">
          <h2 className="section-label">{t.webTitle}</h2>
          <ProjectCard project={t.webProjects[0]} t={t} onOpen={setShot} />
          <div className="grid gap-6 md:grid-cols-2">
            {t.webProjects.slice(1).map((p, i, arr) => (
              <div key={p.id} className={arr.length % 2 === 1 && i === arr.length - 1 ? "md:col-span-2" : ""}>
                <ProjectCard project={p} t={t} onOpen={setShot} />
              </div>
            ))}
          </div>
        </section>

        {/* stack + education */}
        <section id="stack" className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-6">
            <h2 className="section-label">{t.stackTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.stack.map((g) => (
                <div key={g.group} className="hud p-4">
                  <h3 className="font-display text-base font-semibold text-white">{g.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((i) => (
                      <li key={i} className="border border-line bg-ink/60 px-2 py-0.5 font-mono text-[0.72rem]">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="section-label">{t.eduTitle}</h2>
            <div className="hud p-4">
              <h3 className="font-display text-lg font-semibold text-white">{t.edu.degree}</h3>
              <p className="text-sm text-muted">{t.edu.school}</p>
              <p className="mt-1 font-mono text-[0.72rem] tracking-wider text-accent uppercase">{t.edu.when}</p>
              <ul className="mt-3 flex flex-col gap-1 text-sm">
                {t.edu.courses.map((c) => (
                  <li key={c}>
                    <span className="text-accent">› </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hud p-4">
              <h3 className="font-display text-base font-semibold text-white">{t.langTitle}</h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {t.langs.map((l) => (
                  <li key={l.name} className="flex items-center justify-between gap-3">
                    <span>
                      {l.name} <span className="text-muted">· {l.label}</span>
                    </span>
                    <span className="flex gap-1" aria-label={`${l.level}/4`}>
                      {[1, 2, 3, 4].map((n) => (
                        <i key={n} className={`h-1.5 w-4 ${n <= l.level ? "bg-accent" : "bg-line"}`} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="hud flex flex-col gap-5 p-6 sm:p-10">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{t.contactTitle}</h2>
          <p className="max-w-[60ch] text-muted">{t.contactText}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-line bg-ink/60 px-4 py-3 font-mono text-sm select-all">{links.email}</span>
            <button
              type="button"
              onClick={copyEmail}
              className="bg-accent px-4 py-3 font-mono text-sm font-medium text-ink hover:bg-white"
            >
              {copied ? (lang === "pt" ? "Copiado ✓" : "Copied ✓") : lang === "pt" ? "Copiar e-mail" : "Copy email"}
            </button>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="border border-accent/60 px-4 py-3 font-mono text-sm text-accent hover:bg-accent/10">
              LinkedIn ↗
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="border border-accent/60 px-4 py-3 font-mono text-sm text-accent hover:bg-accent/10">
              GitHub ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 font-mono text-[0.72rem] tracking-wider text-muted sm:px-6">
          © {new Date().getFullYear()} Arthur Oliveira · {t.footer}
        </p>
      </footer>

      {/* lightbox */}
      {shot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={shot.alt}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-ink/95 p-4"
          onClick={() => setShot(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot.src} alt={shot.alt} className="max-h-[85vh] max-w-full border border-line object-contain" />
          <p className="font-mono text-xs text-muted">{shot.caption ?? shot.alt} · Esc</p>
        </div>
      )}
    </>
  );
}
