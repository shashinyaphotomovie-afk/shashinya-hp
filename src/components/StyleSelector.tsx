"use client";

import { BACKGROUND_STYLE_OPTIONS, type BackgroundStyle } from "@/types/image";

type StyleSelectorProps = {
  value: BackgroundStyle;
  onChange: (value: BackgroundStyle) => void;
};

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="styleGrid">
      {BACKGROUND_STYLE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`styleCard ${value === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          <span className={`styleSwatch ${option.value}`} />
          <strong>{option.label}</strong>
          <small>{option.description}</small>
        </button>
      ))}
    </div>
  );
}
