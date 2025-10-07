import React from "react";

interface newsReferenceProps {
  date: string;
  title: string;
  source: string;
  url: string;
}

export default function NewsReference({ date, title, source, url }: newsReferenceProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 my-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-sky-500 transition-all duration-300"
    >
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{date}</p>
      <h4 className="font-bold text-gray-800 dark:text-white my-1">{title}</h4>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        Fonte: {source} <span className="ml-2">🔗</span>
      </div>
    </a>
  );
}