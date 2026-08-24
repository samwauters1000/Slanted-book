"use client";

import { useMemo, useState } from "react";
import type { BookData, ContentNode } from "@/lib/types";

type Theme = "light" | "dark";

function FolderIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.086a1.5 1.5 0 0 1 1.06.44l1.415 1.415a1.5 1.5 0 0 0 1.06.44H19.5A1.5 1.5 0 0 1 21 8.795V17.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 3.5h7L18.5 8v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M14 3.5V8h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunMoonIcon({ theme }: { theme: Theme }) {
  if (theme === "light") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4L17 17M7 7 5.6 5.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThemeSwitch({ theme, onToggle, line }: { theme: Theme; onToggle: () => void; line: string }) {
  const dark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Zet dagmodus aan" : "Zet nachtmodus aan"}
      title="Wissel thema"
      className={`relative flex h-6 w-11 shrink-0 items-center rounded-full border bg-current/5 transition-colors ${line}`}
    >
      <span
        className={`absolute left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-neutral400 shadow transition-transform duration-200 ${
          dark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        <SunMoonIcon theme={theme} />
      </span>
    </button>
  );
}

function Column({
  items,
  activeId,
  onSelect,
  label,
  line,
}: {
  items: ContentNode[];
  activeId: string | null;
  onSelect: (id: string) => void;
  label: string;
  line: string;
}) {
  return (
    <div className={`col-scroll flex h-full w-44 shrink-0 flex-col overflow-y-auto border-r sm:w-52 lg:w-60 ${line}`}>
      <div className="sticky top-0 z-10 px-3 pb-1.5 pt-3 font-plex text-[10px] font-medium uppercase tracking-[0.14em] opacity-45">
        {label}
      </div>
      <ul className="flex-1 px-1.5 pb-3">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const hasChildren = item.children.length > 0;
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-plex text-[12px] transition-colors sm:text-[13px] ${
                  isActive ? "bg-accent text-neutral400 font-medium" : "hover:bg-current/5"
                }`}
              >
                {hasChildren ? (
                  <FolderIcon className="h-4 w-4 shrink-0 opacity-70" />
                ) : (
                  <DocIcon className="h-4 w-4 shrink-0 opacity-50" />
                )}
                <span className="flex-1 truncate leading-snug">{item.title}</span>
                {hasChildren && <ChevronIcon className="h-3 w-3 shrink-0 opacity-35" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PreviewColumn({ data, line }: { data: BookData; line: string }) {
  return (
    <div className={`flex h-full w-44 shrink-0 flex-col border-r sm:w-52 lg:w-60 ${line}`}>
      <div className="px-3 pb-1.5 pt-3 font-plex text-[10px] font-medium uppercase tracking-[0.14em] opacity-45">
        Preview
      </div>
      <div className="col-scroll min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <h1 className="font-plex text-base font-semibold leading-snug sm:text-lg">{data.meta.title}</h1>
        {data.meta.subtitle && (
          <p className="mt-0.5 font-plex text-[12px] italic opacity-60">{data.meta.subtitle}</p>
        )}
        {data.meta.preview.map((p, i) => (
          <p key={i} className="mt-3 font-plex text-[12px] leading-relaxed opacity-80 first:mt-3 sm:text-[13px]">
            {p}
          </p>
        ))}
      </div>
      <div className="shrink-0 px-3 py-3">
        <p className="font-plex text-[12px] font-medium italic sm:text-[13px]">{data.meta.author}</p>
        {data.meta.institute && (
          <p className="mt-0.5 font-plex text-[11px] leading-snug opacity-60">{data.meta.institute}</p>
        )}
        <p className="mt-2 font-plex text-[11px] opacity-45">{data.meta.rights}</p>
        <p className="font-plex text-[11px] opacity-45">ISBN {data.meta.isbn}</p>
      </div>
    </div>
  );
}

function RealFigure({ src, index }: { src: string; index: number }) {
  return (
    <figure className="my-5 overflow-hidden rounded border border-current/10 bg-current/[0.03]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`Infografiek ${index}`} className="w-full object-contain" />
      <figcaption className="border-t border-current/10 px-3 py-1.5 font-plex text-[11px] italic opacity-50">
        Infografiek {index}
      </figcaption>
    </figure>
  );
}

function PlaceholderFigure({ index }: { index: number }) {
  return (
    <figure className="my-5 flex flex-col items-center justify-center gap-2 rounded border border-dashed border-current/25 bg-current/[0.03] px-4 py-10 text-center">
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 opacity-35">
        <rect x="3" y="4" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 15.5 8 11l3 2.5 4-3.5 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
      <figcaption className="font-plex text-[11px] italic opacity-45">
        Infografiek {index} — tijdelijke plaatshouder, volgt nog
      </figcaption>
    </figure>
  );
}

function NodeBody({ node, depth }: { node: ContentNode; depth: number }) {
  const HeadingTag = (["h2", "h2", "h3", "h4", "h5", "h6"][Math.min(node.level, 5)] ||
    "h4") as keyof JSX.IntrinsicElements;
  return (
    <div className={depth > 0 ? "mt-8 border-t border-current/10 pt-6" : ""}>
      {depth > 0 && (
        <HeadingTag className="font-plex text-lg font-medium leading-snug">{node.title}</HeadingTag>
      )}
      {node.paragraphs.map((p, i) => (
        <p key={i} className="mt-3 font-plex text-[15px] leading-[1.75] opacity-90 first:mt-4">
          {p}
        </p>
      ))}
      {node.graphics && node.graphics.length > 0
        ? node.graphics.map((src, i) => <RealFigure key={src} src={src} index={i + 1} />)
        : node.images.map((_, i) => <PlaceholderFigure key={i} index={i + 1} />)}
      {node.children.map((child) => (
        <NodeBody key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function FinderApp({ data }: { data: BookData }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [chapterId, setChapterId] = useState<string | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [subsectionId, setSubsectionId] = useState<string | null>(null);

  const chapter = useMemo(
    () => data.chapters.find((c) => c.id === chapterId) ?? null,
    [data, chapterId]
  );
  const section = useMemo(
    () => chapter?.children.find((s) => s.id === sectionId) ?? null,
    [chapter, sectionId]
  );
  const subsection = useMemo(
    () => section?.children.find((s) => s.id === subsectionId) ?? null,
    [section, subsectionId]
  );

  const activeNode = subsection ?? section ?? chapter;

  const dark = theme === "dark";
  const themeClass = dark ? "theme-dark" : "theme-light";
  const chrome = dark ? "bg-neutral400/90" : "bg-neutral50/90";
  const line = dark ? "border-neutral300/50" : "border-neutral100/70";

  const selectChapter = (id: string) => {
    setChapterId(id);
    setSectionId(null);
    setSubsectionId(null);
  };
  const selectSection = (id: string) => {
    setSectionId(id);
    setSubsectionId(null);
  };

  const breadcrumb = [chapter?.title, section?.title, subsection?.title].filter(Boolean);

  return (
    <div className={`flex h-screen w-screen flex-col overflow-hidden ${themeClass}`}>
      {/* Top nav */}
      <header
        className={`flex h-11 shrink-0 items-center gap-3 border-b px-3 backdrop-blur sm:h-12 sm:px-4 ${chrome} ${line}`}
      >
        <div className="font-plex text-base font-bold tracking-tight sm:text-xl">{data.meta.title}</div>
        <div className="flex-1" />
        <ThemeSwitch theme={theme} onToggle={() => setTheme(dark ? "light" : "dark")} line={line} />
      </header>

      {/* Body: columns + content, full-bleed, horizontally scrollable as a safety net on narrow web windows */}
      <div className="flex min-h-0 flex-1 overflow-x-auto">
        <PreviewColumn data={data} line={line} />
        <Column
          items={data.chapters}
          activeId={chapterId}
          onSelect={selectChapter}
          label="Hoofdstukken"
          line={line}
        />
        {chapter && chapter.children.length > 0 && (
          <Column
            items={chapter.children}
            activeId={sectionId}
            onSelect={selectSection}
            label="Secties"
            line={line}
          />
        )}
        {section && section.children.length > 0 && (
          <Column
            items={section.children}
            activeId={subsectionId}
            onSelect={setSubsectionId}
            label="Subsecties"
            line={line}
          />
        )}

        <div className="window-scroll min-w-[320px] flex-1 overflow-y-auto">
          <div className="mx-auto max-w-xl px-5 py-8 lg:max-w-2xl lg:px-8 lg:py-10">
            {!activeNode ? (
              <div className="flex h-full items-center justify-center">
                <p className="font-plex text-[13px] italic opacity-45">
                  Kies links een hoofdstuk om te beginnen.
                </p>
              </div>
            ) : (
              <article>
                <p className="font-plex text-[11px] uppercase tracking-[0.16em] opacity-40">
                  {breadcrumb.slice(0, -1).join(" / ") || data.meta.title}
                </p>
                <h1 className="mt-2 font-plex text-2xl font-semibold leading-tight sm:text-3xl">
                  {activeNode.title}
                </h1>
                <NodeBody node={activeNode} depth={0} />
                {activeNode.paragraphs.length === 0 &&
                  activeNode.images.length === 0 &&
                  activeNode.children.length === 0 && (
                    <p className="mt-6 font-plex text-[13px] italic opacity-45">
                      Deze sectie bevat geen doorlopende tekst — bekijk de subsecties links.
                    </p>
                  )}
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}