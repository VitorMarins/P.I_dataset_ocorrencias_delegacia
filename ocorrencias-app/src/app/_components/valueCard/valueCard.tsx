import React from "react";

interface valueCardProps {
  title: string;
  description: string;
  color: string;
  icon?: React.ReactNode;
}

export default function valueCard({ title, description, color, icon }: valueCardProps) {
  const pickAccent = (c: string): string => {
    const s = (c || "").toLowerCase();
    if (s.includes("red")) return "#ED1313";
    if (s.includes("blue")) return "#120C69";
    if (s.includes("cyan")) return "#A17516";
    if (s.includes("green")) return "#0C690C";
    if (s.includes("yellow")) return "#AD7409";
    if (s.startsWith("#")) return s;
    return "#1f2937";
  };

  const accent = pickAccent(color);

  return (
    <div
      className="relative bg-white p-5 shadow-sm mx-4 my-4"
      style={{
        border: `3px dashed ${accent}`,
      }}
    >
      <div className="pointer-events-none absolute -top-2 left-4 right-4 flex items-center justify-between">
        <span
          className="h-[3px] w-10 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span
          className="h-[3px] w-2/5 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="flex items-center gap-3">
        <h3
          className="font-extrabold text-[17px]"
          style={{ color: accent }}
        >
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-black">{description}</p>
    </div>
  );
}