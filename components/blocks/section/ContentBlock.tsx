"use client";
import {
  DarkTemplate,
  LightTemplate,
  TeamTemplate,
  VideoTemplate,
  PortfolioTemplate,
} from "@/components/blocks/templates/Templates";
import {
  ContentBlockProps,
  LayoutTheme,
  TemplateTheme,
} from "@/components/blocks/Blocks";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";

const templateStyles: Record<TemplateTheme, string> = {
  dark: "w-full bg-black/90 backdrop-blur-sm",
  light: "w-full bg-white/90 backdrop-blur-sm",
  transparent: "w-full bg-transparent",
  portfolio: "w-full bg-black",
};

const containerStyles: Record<TemplateTheme, string> = {
  dark: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white/90",
  light: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-black/90",
  transparent: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white/90",
  portfolio: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-white/90",
};

const templateComponents: Record<LayoutTheme, PortableTextComponents> = {
  dark: DarkTemplate as PortableTextComponents,
  light: LightTemplate as PortableTextComponents,
  team: TeamTemplate as PortableTextComponents,
  video: VideoTemplate as PortableTextComponents,
  portfolio: PortfolioTemplate as PortableTextComponents,
};

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  const { content, layout, theme } = block;
  const templateTheme = layout || "light"; // For template selection
  const dataTheme = theme || "light"; // For data-theme attribute
  const styles = templateStyles[templateTheme];
  const containerStyle = containerStyles[templateTheme];

  return (
    <div
      className={`min-h-[50vh] w-full ${styles} relative transition-colors duration-300`}
      data-theme={dataTheme}
    >
      <div className={containerStyle}>
        <div className="prose prose-lg max-w-none">
          <PortableText
            value={content}
            components={
              templateComponents[templateTheme] || templateComponents.light
            }
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentBlock);
