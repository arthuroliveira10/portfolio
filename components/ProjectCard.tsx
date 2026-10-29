"use client";

import type { Content, Project, Shot } from "@/content/content";

const statusStyle = {
  done: "text-ok border-ok/60",
  mvp: "text-ok border-ok/60",
  wip: "text-wip border-wip/60",
} as const;

interface Props {
  project: Project;
  t: Content;
  featured?: boolean;
  onOpen: (shot: Shot) => void;
}

export default function ProjectCard({ project: p, t, featured, onOpen }: Props) {
  const shots = p.shots ?? [];
  const wide = featured ? shots.slice(0, 2) : shots;
  const strip = featured ? shots.slice(2) : [];

  return (
    <article id={p.id} className="hud flex flex-col gap-4 p-5 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {featured && (
            <p className="mb-1 font-mono text-[0.7rem] tracking-[0.16em] text-accent uppercase">{t.featured}</p>
          )}
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{p.name}</h3>
          <p className="text-sm text-muted">{p.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.team && (
            <span className="border border-line px-2 py-0.5 font-mono text-[0.68rem] tracking-wider text-muted uppercase">
              {t.team}
            </span>
          )}
          <span className={`border px-2 py-0.5 font-mono text-[0.68rem] tracking-wider uppercase ${statusStyle[p.status]}`}>
            {t.status[p.status]}
          </span>
        </div>
      </header>

      <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
        {p.stack.map((s, i) => (
          <li key={s} className="font-mono text-[0.72rem] text-violet">
            {s}
            {i < p.stack.length - 1 && <span className="ml-1.5 text-muted/50" aria-hidden="true">·</span>}
          </li>
        ))}
      </ul>

      {p.flow && (
        <ol className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr">
          {p.flow.map((f, i) => (
            <li
              key={f.label}
              className={`relative border bg-ink/70 px-3 py-2 text-[0.8rem] leading-snug ${
                f.ai ? "border-violet/60" : "border-line"
              }`}
            >
              <span className={`block font-mono text-[0.68rem] tracking-wider uppercase ${f.ai ? "text-violet" : "text-accent"}`}>
                {String(i + 1).padStart(2, "0")} · {f.label}
              </span>
              {f.text}
            </li>
          ))}
        </ol>
      )}

      <ul className="flex flex-col gap-2 text-[0.95rem] leading-relaxed">
        {p.points.map((pt) => (
          <li key={pt} className="diamond">
            {pt}
          </li>
        ))}
      </ul>

      {p.rules && (
        <ul className="grid gap-3 sm:grid-cols-3">
          {p.rules.map((r) => (
            <li key={r} className="border-l-2 border-ok pl-3 text-sm">
              {r}
            </li>
          ))}
        </ul>
      )}

      {p.id === "neural" && <XorNet />}

      {wide.length > 0 && (
        <div className={`grid gap-3 ${wide.length === 3 ? "sm:grid-cols-3" : wide.length === 2 ? "sm:grid-cols-2" : ""}`}>
          {wide.map((s) => (
            <ShotFigure key={s.src} shot={s} onOpen={onOpen} tall={p.id === "f1"} />
          ))}
        </div>
      )}
      {strip.map((s) => (
        <ShotFigure key={s.src} shot={s} onOpen={onOpen} />
      ))}

      <a
        href={p.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-2 font-mono text-[0.78rem] text-accent hover:underline"
      >
        {t.repoLabel} <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

function ShotFigure({ shot, onOpen, tall }: { shot: Shot; onOpen: (s: Shot) => void; tall?: boolean }) {
  return (
    <figure className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(shot)}
        className="group block w-full cursor-zoom-in overflow-hidden border border-line bg-[#0d1320] text-left"
        aria-label={shot.alt}
      >
        <span className="flex items-center gap-1.5 border-b border-line px-2.5 py-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
          <i className="h-2 w-2 rounded-full bg-wip" />
          <i className="h-2 w-2 rounded-full bg-ok" />
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          className={`block w-full transition-transform duration-300 group-hover:scale-[1.02] ${
            tall ? "max-h-[28rem] object-cover object-top" : ""
          }`}
        />
      </button>
      {shot.caption && <figcaption className="mt-1.5 font-mono text-[0.72rem] text-muted">{shot.caption}</figcaption>}
    </figure>
  );
}

function XorNet() {
  const rows = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ];
  return (
    <div className="flex flex-wrap items-center gap-6 font-mono text-[0.7rem] text-muted">
      <div className="flex items-center gap-5" aria-hidden="true">
        {[
          ["x1", "x2"],
          ["h1", "h2"],
          ["y"],
        ].map((layer, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            {layer.map((n) => (
              <span
                key={n}
                className={`grid h-8 w-8 place-items-center rounded-full border text-fg ${i === 1 ? "border-violet" : "border-accent"}`}
              >
                {n}
              </span>
            ))}
          </div>
        ))}
      </div>
      <table className="border-collapse tabular-nums">
        <caption className="sr-only">XOR</caption>
        <thead>
          <tr>
            {["x1", "x2", "y"].map((h) => (
              <th key={h} className="border border-line px-3 py-1 font-medium text-accent">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("")}>
              {r.map((v, j) => (
                <td key={j} className={`border border-line px-3 py-1 text-center ${j === 2 ? "text-ok" : "text-fg"}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
