import React from "react";

interface projectSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function projectSection({ title, children }: projectSectionProps) {
  return (
    <section className="mb-12 max-w-4xl mx-auto">
      <h2 className="text-xl font-extrabold text-black dark:text-black pb-2 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}