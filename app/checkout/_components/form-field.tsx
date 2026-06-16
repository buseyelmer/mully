"use client";

import type { InputHTMLAttributes } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20";

export function FormField({ label, error, id, className, ...props }: FormFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div>
      <label htmlFor={fieldId} className="text-sm font-medium text-stone-300">
        {label}
      </label>
      <input id={fieldId} className={`${inputClass} ${className ?? ""}`} {...props} />
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export function FormTextarea({
  label,
  error,
  id,
  className,
  ...props
}: {
  label: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? props.name;

  return (
    <div>
      <label htmlFor={fieldId} className="text-sm font-medium text-stone-300">
        {label}
      </label>
      <textarea
        id={fieldId}
        className={`${inputClass} min-h-[96px] resize-y ${className ?? ""}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
