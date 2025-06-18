import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "portfolio",
  title: "Portfolio",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
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
      validation: (Rule) => Rule.min(2020).max(new Date().getFullYear()),
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "splineScene",
      title: "Spline Scene URL",
      type: "url",
      description: "URL to the Spline scene if applicable",
    }),
    defineField({
      name: "block",
      title: "Content Blocks",
      type: "array",
      of: [
        {
          type: "headingBlock",
          title: "Heading",
        },
        {
          type: "headingSplineBlock",
          title: "Heading Spline",
        },
        {
          type: "contentBlock",
          title: "Content",
        },
        {
          type: "teamBlock",
          title: "Team",
        },
        {
          title: "Image Canvas",
          type: "imageCanvasBlock",
        },
      ],
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
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
      category: "category",
    },
    prepare(selection) {
      const { title, subtitle, media, category } = selection;
      return {
        title: title || "Untitled",
        subtitle: `${category ? category.toUpperCase() : "PROJECT"} ${subtitle ? `• ${subtitle}` : ""}`,
        media: media,
      };
    },
  },
});

export interface PortfolioDocument {
  _type: "portfolio";
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  slug: {
    current: string;
  };
  category: string;
  featured?: boolean;
  image: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  gallery?: Array<{
    asset: {
      url: string;
    };
    alt?: string;
    caption?: string;
  }>;
  technologies?: string[];
  client?: string;
  year?: number;
  liveUrl?: string;
  githubUrl?: string;
  splineScene?: string;
  block?: Array<{
    _type: string;
    _key: string;
  }>;
  team?: Array<{
    _ref: string;
    _type: "reference";
  }>;
  publishedAt: string;
}
