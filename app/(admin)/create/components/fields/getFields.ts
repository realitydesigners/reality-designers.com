import {
  TextField,
  TextAreaField,
  ImageField,
  AudioField,
  ReferenceField,
  HeadingBlockField,
} from ".";
import type { ImageDocument } from "@/sanity/schemas/img";
import type { AudioDocument } from "@/sanity/schemas/audio";
import type { TeamDocument } from "@/sanity/schemas/team";


export interface Field {
  name: keyof SchemaType;
  type: string;
  title: string;
  description?: string;
  component: any;
  options?: any;
}

const fieldComponents: Record<string, any> = {
  string: TextField,
  text: TextAreaField,
  image: ImageField,
  file: AudioField,
  reference: ReferenceField,
  headingBlock: HeadingBlockField,
};

type SchemaType = ImageDocument | AudioDocument | TeamDocument | any;
type SchemaTypes = {
  img: ImageDocument;
  audio: AudioDocument;
  team: TeamDocument;
  headingBlock: any;
};

// Map schema types to their field configurations
const schemaFieldConfigs: Record<
  keyof SchemaTypes,
  Record<string, Partial<Field>>
> = {
  img: {
    title: {
      type: "string",
      title: "Title",
      component: fieldComponents.string,
    },
    image: {
      type: "image",
      title: "Image",
      component: fieldComponents.image,
    },
    alt: {
      type: "string",
      title: "Alt Text",
      description: "Alternative text for accessibility",
      component: fieldComponents.string,
    },
    team: {
      type: "reference",
      title: "Team Member",
      description: "Credit the team member who created this",
      component: fieldComponents.reference,
    },
  },
  audio: {
    title: {
      type: "string",
      title: "Title",
      description: "Title of the audio track",
      component: fieldComponents.string,
    },
    description: {
      type: "text",
      title: "Description",
      description: "A short description of this audio file",
      component: fieldComponents.text,
    },
    audioFile: {
      type: "file",
      title: "Audio File",
      description: "Upload the audio file",
      component: fieldComponents.file,
      options: { accept: "audio/*" },
    },
    team: {
      type: "reference",
      title: "Team Member",
      description: "Credit the team member who created this",
      component: fieldComponents.reference,
    },
  },
  team: {
    name: {
      type: "string",
      title: "Name",
      description: "Full name of the team member",
      component: fieldComponents.string,
    },
    role: {
      type: "string",
      title: "Role",
      description: "Role or position in the team",
      component: fieldComponents.string,
    },
    image: {
      type: "image",
      title: "Profile Image",
      description: "Profile photo of the team member",
      component: fieldComponents.image,
    },
    shortBio: {
      type: "text",
      title: "Short Bio",
      description: "A brief biography of the team member",
      component: fieldComponents.text,
    },
  },
  headingBlock: {
    layout: {
      type: "string",
      title: "Layout",
      component: fieldComponents.string,
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
          { title: "Transparent", value: "transparent" },
        ],
      },
    },
    imageRef: {
      type: "reference",
      title: "Featured Image",
      component: fieldComponents.reference,
    },
    heading: {
      type: "string",
      title: "Heading",
      component: fieldComponents.string,
    },
    subheading: {
      type: "text",
      title: "Subheading",
      component: fieldComponents.text,
    },
    publicationDate: {
      type: "date",
      title: "Publication Date",
      component: fieldComponents.string,
      options: {
        dateFormat: "DD-MM-YYYY",
      },
    },
    team: {
      type: "reference",
      title: "Team Member",
      component: fieldComponents.reference,
    },
    category: {
      type: "reference",
      title: "Category",
      component: fieldComponents.reference,
    },
  },
};

export function getFields(type: keyof SchemaTypes): Field[] {
  const config = schemaFieldConfigs[type];
  if (!config) return [];

  // Convert the config into an array of fields
  return Object.entries(config).map(([name, field]) => ({
    name: name as keyof SchemaType,
    ...field,
  })) as Field[];
}
