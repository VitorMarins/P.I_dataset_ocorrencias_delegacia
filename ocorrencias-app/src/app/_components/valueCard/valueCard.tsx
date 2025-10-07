import React from "react";

interface valueCardProps {
  title: string;
  description: string;
  color: string;
}

export default function valueCard({ title, description, color }: valueCardProps) {
  return (
    <div className={`p-4 rounded-lg border border-slate-200 dark:border-gray-700 ${color}`}>
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-lg text-black">{title}</h3>
      </div>
      <p className="mt-2 text-base text-black">{description}</p>
    </div>
  );
}