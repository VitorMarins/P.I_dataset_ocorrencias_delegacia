import React from "react";

interface projectSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function projectSection({ title, children }: projectSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-black dark:text-black pb-2 mb-6">
        {title}
      </h2>
      <div className="prose prose-lg dark:prose-invert max-w-none text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}