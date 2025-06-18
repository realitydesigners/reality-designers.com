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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "block",
      title: "Content Blocks",
      type: "array",
      of: [
        {
          type: "headingSplineBlock",
          title: "Heading Spline",
        },
        {
          type: "contentBlock",
          title: "Content",
        },
        {
          type: "portfolioSplineBlock",
          title: "Portfolio Spline",
        },
      ],
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
