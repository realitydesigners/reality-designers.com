import { StructureBuilder } from "sanity/structure";

export const StudioStructure = (S: StructureBuilder) =>
	S.list()
		.title("Content")
		.items([
			// Pages
			S.listItem()
				.title("Pages")

				.child(S.documentTypeList("page")),

			// Content
			S.listItem()
				.title("Content")

				.child(
					S.list()
						.title("Content")
						.items([
							S.listItem().title("Posts")

							.child(S.documentTypeList("posts")),
							S.listItem().title("Modules")

							.child(S.documentTypeList("module")),
							S.listItem().title("Lessons")

							.child(S.documentTypeList("lesson")),
							S.listItem().title("Glossary")

							.child(S.documentTypeList("glossary")),
							S.listItem().title("FAQ")

							.child(S.documentTypeList("faq")),
							S.listItem().title("Team")

							.child(S.documentTypeList("team")),
							S.listItem().title("Categories")

							.child(S.documentTypeList("category")),
							S.listItem().title("Market Data")

							.child(S.documentTypeList("marketData")),
							S.listItem().title("Changelog")

							.child(S.documentTypeList("changelog")),
						]),
				),

			// Media
			S.listItem()
				.title("Media")

				.child(
					S.list()
						.title("Media")
						.items([
							S.listItem().title("Images")

							.child(S.documentTypeList("img")),
							S.listItem().title("Videos")

							.child(S.documentTypeList("video")),
							S.listItem().title("Audio")

							.child(S.documentTypeList("audio")),
						]),
				),
		]);
