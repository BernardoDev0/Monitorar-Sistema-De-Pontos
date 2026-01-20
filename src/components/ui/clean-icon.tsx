import React from "react";
import { ICONS, IconName } from "@/lib/icon-map";

type CleanIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

export function CleanIcon({ name, size = 16, className, title }: CleanIconProps) {
  const src = ICONS[name];
  const style: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: "currentColor",
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    display: "inline-block",
  };
  return <span aria-hidden title={title} className={className} style={style} />;
}
