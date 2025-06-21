import { Metadata } from "next";
import ServicesHeroSection from "@/components/sections/HomePageHeroSection";
import NewsletterSignup from "@/components/forms/NewsletterSignup";
import BlogPostsSection from "@/components/sections/BlogPostsSection";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export const metadata: Metadata = {
  title: "Services - Reality Designers",
  description:
    "Premium design services for the next generation of digital experiences. We craft immersive realities through cutting-edge design and technology.",
};

export default async function HomePage() {
  // Fetch blog posts on the server
  const posts: PostsPayload[] = await sanityFetch({
    query: postsQuery,
    tags: ["posts"],
  });

  // Get the first 6 posts for the homepage section
  const featuredPosts = posts.slice(0, 6);

  return (
    <main className="flex w-full flex-col min-h-screen ">
      <ServicesHeroSection />

      {/* Blog Posts Section */}
      <BlogPostsSection posts={featuredPosts} />

      <NewsletterSignup
        variant="enhanced"
        title="Stay Ahead of the Curve"
        description="Be the first to know about our latest projects, design insights, and cutting-edge techniques. Join our community of forward-thinking designers and developers."
      />

      {/* Uncomment these sections as needed */}
      {/* <ServicesRealmsSection /> */}
      {/* 	<ServicesCTASection />
			
			<HeroNarrativeSection />

			<ServicesNarrativeSection />

			<TechnologyShowcaseSection />

			<ProcessTimelineSection />

			<CallToActionSection /> */}
    </main>
  );
}
