import {
	Text,
	Img,
	Section,
	Heading,
	Button,
	Hr,
} from "@react-email/components";
import * as React from "react";

interface RichContentProps {
	content: any[];
	maxItems?: number;
}

const RichTextBlock: React.FC<{ block: any }> = ({ block }) => {
	if (!block.children) return null;

	return (
		<Text className="text-[15px] text-gray-700 leading-relaxed mb-4">
			{block.children.map((child: any, index: number) => {
				let text = child.text || "";
				
				// Apply text formatting based on marks
				if (child.marks && child.marks.length > 0) {
					child.marks.forEach((mark: string) => {
						switch (mark) {
							case "strong":
								text = <strong key={index}>{text}</strong>;
								break;
							case "em":
								text = <em key={index}>{text}</em>;
								break;
							case "underline":
								text = <u key={index}>{text}</u>;
								break;
						}
					});
				}
				
				return text;
			})}
		</Text>
	);
};

const VideoRefBlock: React.FC<{ videoRef: any }> = ({ videoRef }) => (
	<Section className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-red-500">
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
			{videoRef.videoImage && (
				<Img 
					src={videoRef.videoImage} 
					width="80" 
					height="60" 
					alt={videoRef.videoTitle || "Video"}
					className="rounded"
				/>
			)}
			<div style={{ flex: 1 }}>
				<Text className="font-semibold text-black text-[14px] mb-1">
					🎥 {videoRef.videoTitle || "Related Video"}
				</Text>
				{videoRef.videoUrl && (
					<Button
						href={videoRef.videoUrl}
						className="bg-red-600 text-white px-3 py-1 rounded text-[12px]"
					>
						Watch Video
					</Button>
				)}
			</div>
		</div>
	</Section>
);

const QuoteBlock: React.FC<{ quoteRef: any }> = ({ quoteRef }) => (
	<Section className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
		<Text className="text-[16px] text-gray-800 italic mb-2 font-medium">
			"{quoteRef.quoteTitle}"
		</Text>
		{quoteRef.quoteAuthor && (
			<Text className="text-[14px] text-gray-600 font-semibold">
				— {quoteRef.quoteAuthor}
			</Text>
		)}
	</Section>
);

const PostRefBlock: React.FC<{ postsRef: any }> = ({ postsRef }) => (
	<Section className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
			{postsRef.postsImage && (
				<Img 
					src={postsRef.postsImage} 
					width="60" 
					height="60" 
					alt={postsRef.postsHeading || "Related post"}
					className="rounded"
				/>
			)}
			<div style={{ flex: 1 }}>
				<Text className="font-semibold text-black text-[14px] mb-1">
					📖 {postsRef.postsHeading || "Related Post"}
				</Text>
				{postsRef.postsSlug && (
					<Button
						href={`https://www.reality-designers.com/posts/${postsRef.postsSlug}`}
						className="bg-green-600 text-white px-3 py-1 rounded text-[12px]"
					>
						Read Post
					</Button>
				)}
			</div>
		</div>
	</Section>
);

const ImageBlock: React.FC<{ image: any }> = ({ image }) => (
	<Section className="text-center mb-6">
		<Img 
			src={image.imageUrl} 
			alt={image.alt || "Content image"}
			width="500"
			style={{ maxWidth: '100%', height: 'auto' }}
			className="rounded-lg shadow-md"
		/>
		{image.alt && (
			<Text className="text-[12px] text-gray-500 italic mt-2">
				{image.alt}
			</Text>
		)}
	</Section>
);

export const RichContentRenderer: React.FC<RichContentProps> = ({ 
	content, 
	maxItems = 5 
}) => {
	if (!content || content.length === 0) {
		return (
			<Text className="text-gray-500 italic text-[14px]">
				No content available
			</Text>
		);
	}

	const itemsToRender = content.slice(0, maxItems);

	return (
		<div>
			{itemsToRender.map((item, index) => {
				// Handle different content types
				switch (item._type) {
					case "block":
						return <RichTextBlock key={index} block={item} />;
					
					case "image":
						return item.image ? <ImageBlock key={index} image={item.image} /> : null;
					
					default:
						// Handle content with references
						if (item.videoRef?.videoTitle) {
							return <VideoRefBlock key={index} videoRef={item.videoRef} />;
						}
						
						if (item.quoteRef?.quoteTitle) {
							return <QuoteBlock key={index} quoteRef={item.quoteRef} />;
						}
						
						if (item.postsRef?.postsHeading) {
							return <PostRefBlock key={index} postsRef={item.postsRef} />;
						}
						
						// Fallback for rich text blocks
						if (item.children) {
							return <RichTextBlock key={index} block={item} />;
						}
						
						return null;
				}
			})}
			
			{content.length > maxItems && (
				<Section className="text-center mt-4 p-3 bg-gray-100 rounded-lg">
					<Text className="text-gray-600 text-[14px]">
						...and {content.length - maxItems} more content blocks in the full post
					</Text>
				</Section>
			)}
		</div>
	);
}; 