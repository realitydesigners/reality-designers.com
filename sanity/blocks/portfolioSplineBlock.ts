import { defineField } from "sanity";

export default {
  type: "object",
  name: "portfolioSplineBlock",
  title: "Portfolio Spline Block",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Spline Animation", value: "spline" },
          { title: "Three.js Experience", value: "threejs" },
          { title: "Brand Identity", value: "brand" },
          { title: "Motion Graphics", value: "motion" },
          { title: "Web Experience", value: "web" },
          { title: "Interactive Design", value: "interactive" },
        ],
      },
      initialValue: "spline",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Preview Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "splineScene",
      title: "Spline Scene URL",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.min(2000).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Full Screen", value: "fullscreen" },
          { title: "Contained", value: "contained" },
        ],
      },
      initialValue: "fullscreen",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
      },
      initialValue: "dark",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "team" }],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      media: "image",
      layout: "layout",
      theme: "theme",
    },
    prepare(selection) {
      const { title, category, media, layout, theme } = selection;
      const categoryLabels = {
        spline: "Spline Animation",
        threejs: "Three.js Experience",
        brand: "Brand Identity",
        motion: "Motion Graphics",
        web: "Web Experience",
        interactive: "Interactive Design",
      };
      const categoryLabel =
        categoryLabels[category] || category || "No category";

      return {
        title: title || "Untitled Portfolio",
        subtitle: `Portfolio Spline Scene | ${categoryLabel} | ${layout || "fullscreen"} | ${theme || "dark"} theme`,
        media: media,
      };
    },
  },
};
