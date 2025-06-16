import { groq } from "next-sanity";

// Common fragments
const blockFragment = groq`
  ...,
  heading,
  subheading,
  image,
  tags,
  layout,
  title,
  publicationDate,
  team->{
    ...,
    name,
    role,
    image,
    shortBio,
  },
  category->{
    ...,
    title,
    slug,
  },
`;

const imageRefFragment = groq`
  "imageRef": {
    ...,
    "imageUrl": imageRef->image.asset->url,
    "imageAlt": imageRef->alt,
  },
`;

const teamFragment = groq`
  team->{
    ...,
    name,
    role,
    image,
    shortBio,
  },
`;

const categoryFragment = groq`
  category->{
    ...,
    title,
    slug,
  },
`;

const subcategoriesFragment = groq`
  subcategories[]->{
    ...,
    name,
    title,
  },
`;

const contentFragment = groq`
  content[] {
    ...,
    ${blockFragment}
    image-> {
      ...,
      className->{name},
      team->,
    },
    

    markDefs[] {
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    },

    "videoRef": {
      ...,
      "videoTitle": video->title,
      "videoFileUrl": video->video.asset->url,
      "videoImage": video->image.asset->url,
      "videoUrl": video->url,
      "videoTeam": video->team,
    },
    
    "audioRefData": {
      "audioTitle": audio->title,
      "audioFileUrl": audio->audioFile.asset->url
    },
    
    "quoteRef": {
      "quoteTitle": quote->quote,
      "quoteAuthor": quote->author,
      "quoteImage": quote->mediaRef.image->image,
      "quoteLayout": quote->mediaRef.layout,
    },

         "postsRef": {
       "postsHeading": posts->block[0].heading,
       "postsSubheading": posts->block[0].subheading,
       "postsSlug": posts->slug.current,
       "postsImage": posts->block[0].imageRef->image.asset->url,
       "postsCategory": posts->block[0].category->title,
       "postsAuthor": posts->block[0].team->name,
       "postsAuthorImage": posts->block[0].team->image,
     },
  },
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`;

export const feedQuery = groq`
*[(_type == "posts" || _type == "video" || _type =="img")] | order(_createdAt desc) {
  _type,
  title,
  category,  
  excerpt,
  tags,
  slug,
  image,
  ${subcategoriesFragment}
  publicationDate,
  title,
  slug,
  excerpt,
  image,
  block[]{
    ${blockFragment}
  },
}
`;

export const postsQuery = groq`
 *[_type == "posts"] | order(_createdAt desc)[0...40] {
    slug,
     block[]{
       ${blockFragment}
       ${imageRefFragment}
    },
 }`;

export const postsBySlugQuery = groq`
*[_type == "posts" && slug.current == $slug][0] {
    slug,
    block[] {
        ${blockFragment}
        _type == "imageCanvasBlock" => {
            layout,
            image->,
            ${teamFragment}
            alt,
        },
        ${imageRefFragment}

        ${contentFragment}
    },
}
`;

export const categoryQuery = groq`
*[_type == "category"] {
   _id,
   _type,
   title,
   isMain,
   slug,
   model->{...,
     file,
      },
   sceneIdentifier,
  }
  `;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
   _id,
   _type,
   title,
   isMain,
   slug,
   model->{...,
     file,
      },
   sceneIdentifier,
   "subCategories": *[_type == "category" && references(^._id)] {
     _id,
     _type,
     title,
     slug,
     isMain,
     model->{...,
       file,
        },
     "refPosts": *[_type == "posts" && references(^._id)] {
       _id,
       title,
       slug,
       block[]{
        ${blockFragment}
       },
     }
   },
  }
  `;

export const getVideosQuery = groq`
*[_type == "video"][0..30] |  order(_createdAt desc) {
 title,
 slug,
 url,
 image,
 video,
 ${subcategoriesFragment}
 }`;

export const getVideoBySlugQuery = groq`
*[_type == "video" && slug.current == $slug][0] {
   title,
   slug,
   url,
   image,
   video,
   ${subcategoriesFragment}
   block[]{
    ${blockFragment}
    ${contentFragment}
   },
}`;

export const teamQuery = groq`
 *[_type == "team"] |  order(_createdAt asc) {
 name,
 role,
 image,
 scene,
 shortBio,
 bio[]{
  ...,
 },
 content[]{
  ...,
 }
 slug,
 title,    
}`;

export const teamBySlugQuery = groq`
*[_type == "team" && slug.current == $slug][0] {
 name,
 role,
 image,
 scene,
 shortBio,
 block[]{
  ${blockFragment}
  ${contentFragment}
 },
 slug,
 title,    
 instagram,
 twitter,
 website,
 tiktok,
}`;

export const glossaryQuery = groq`
 *[_type == "glossary"] |  order(_createdAt asc) {
 name,
 role,
 title,
 image,
 scene,
 shortBio,
 bio[]{
  ...,
 },
 content[]{
  ...,
 },
 slug,
 title,    
}`;

export const glossaryBySlugQuery = groq`
*[_type == "glossary" && slug.current == $slug][0] {
 name,
 image,
 scene,
 block[]{
  ...,
  heading,
  subHeading,
  image,
  tags,
  layout,
  title,
  ${contentFragment}
 },
 slug,
 title,    
 instagram,
 twitter,
 website,
 tiktok,
}`;
