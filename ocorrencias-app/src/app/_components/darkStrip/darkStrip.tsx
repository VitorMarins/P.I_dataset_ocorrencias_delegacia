import React from "react";

interface DarkStripProps {
  title: string;
  children: React.ReactNode;
}

export default function DarkStrip({ title, children }: DarkStripProps) {
  return (
    <div className="-mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16 xl:-mx-24 p-0 mb-12 relative">
      <section className="relative bg-black text-white py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
        <h2 className="text-2xl font-extrabold mb-6 max-w-4xl mx-auto">{title}</h2>
        {children}

        <div className="pointer-events-none absolute top-0 left-0 w-1/2 h-24">
          <svg viewBox="0 0 600 140" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 130 L260 0" stroke="white" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
            <path d="M0 150 L320 0" stroke="white" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 w-1/2 h-24 rotate-180">
          <svg viewBox="0 0 600 140" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 130 L360 0" stroke="white" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
            <path d="M0 150 L460 0" stroke="white" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
            <path d="M0 110 L260 0" stroke="white" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
          </svg>
        </div>
      </section>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-3 h-10 bg-gradient-to-b from-black/40 to-transparent blur-md"
      />
    </div>
  );
}
