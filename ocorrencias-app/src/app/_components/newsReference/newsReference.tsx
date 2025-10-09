import React from "react";

interface newsReferenceProps {
  date: string;
  title: string;
  source: string;
  imageSrc?: string; 
  summary?: string;  
  href?: string;
}

export default function NewsReference({ date, title, source, imageSrc, summary, href }: newsReferenceProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block my-6 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="w-full h-48 sm:h-56 bg-slate-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <h4 className="font-extrabold text-gray-900 leading-snug">
          {title}
        </h4>
        <p className="mt-3 text-sm text-gray-500">{date}</p>
        {summary && (
          <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
            {summary}
          </p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          Fonte: {source}
          <span className="ml-2 inline-block text-gray-400 group-hover:text-gray-600">↗</span>
        </div>
      </div>
    </a>
  );
}