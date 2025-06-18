"use client";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  contentBlock,
  headingBlock,
  headingSplineBlock,
  imageCanvasBlock,
  portfolioSplineBlock,
  teamBlock,
} from "@/sanity/blocks/index";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import {
  audio,
  category,
  glossary,
  img,
  library,
  model,
  portfolio,
  posts,
  quote,
  team,
  video,
} from "@/sanity/schemas";
import { myTheme } from "@/sanity/ui/theme";

import { CustomItem } from "@/sanity/ui/CustomItem";
import { CustomField } from "@/sanity/ui/CustomField";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Reality Designers";

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    types: [
      posts,
      portfolio,
      img,
      audio,
      video,
      quote,
      team,
      category,
      library,
      model,
      glossary,
      headingBlock,
      headingSplineBlock,
      contentBlock,
      teamBlock,
      imageCanvasBlock,
      portfolioSplineBlock,
    ],
  },
  form: {
    components: {
      item: CustomItem,
      field: CustomField,
    },
  },
  theme: myTheme,
  plugins: [structureTool({}), visionTool({ defaultApiVersion: apiVersion })],
});
