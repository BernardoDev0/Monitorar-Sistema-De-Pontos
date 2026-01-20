import React from "react";
import { ICONS, IconName } from "@/lib/icon-map";

type CleanIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

export function CleanIcon({ name, size = 16, className, title }: CleanIconProps) {
  const svg = ICONS[name] as string;
  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    lineHeight: 0,
    color: "currentColor"
  };
  return (
    <span
      aria-hidden
      title={title}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
