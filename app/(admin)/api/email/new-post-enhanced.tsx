import {
	Body,
	Button,
	Font,
	Head,
	Heading,
	Html,
	Img,
	Section,
	Tailwind,
	Text,
	Hr,
} from "@react-email/components";
import * as React from "react";

interface PostEmailProps {
	title: string;
	heading: string;
	subheading?: string;
	excerpt?: string;
	slug: string;
	image?: string;
	team?: {
		name: string;
		role: string;
		image?: string;
	};
	blocks?: Array<{
		_type?: string;
		heading?: string;
		subheading?: string;
		content?: any[];
		imageRef?: {
			imageUrl?: string;
			imageAlt?: string;
		};
		layout?: string;
		publicationDate?: string;
	}>;
}

const ContentBlock: React.FC<{ block: any }> = ({ block }) => (
	<Section className="mb-6">
		{block.heading && (
			<Heading className="text-[22px] font-bold text-black mb-3 leading-tight">
				{block.heading}
			</Heading>
		)}
		
		{block.subheading && (
			<Text className="text-[16px] text-gray-600 mb-4 leading-relaxed">
				{block.subheading}
			</Text>
		)}

		{block.imageRef?.imageUrl && (
			<Section className="text-center mb-4">
				<Img 
					src={block.imageRef.imageUrl} 
					alt={block.imageRef.imageAlt || "Content image"}
					width="600"
					style={{ maxWidth: '100%', height: 'auto' }}
					className="rounded-lg shadow-md"
				/>
			</Section>
		)}

		{block.content && block.content.length > 0 && (
			<div style={{ marginBottom: '16px' }}>
				{block.content.slice(0, 3).map((contentItem: any, index: number) => (
					<div key={index} style={{ marginBottom: '12px' }}>
						{contentItem.children && contentItem.children.map((child: any, childIndex: number) => (
							<Text 
								key={childIndex}
								className="text-[15px] text-gray-700 leading-relaxed mb-3"
							>
								{child.text}
							</Text>
						))}
					</div>
				))}
				{block.content.length > 3 && (
					<Text className="text-gray-500 text-[14px] italic">
						...continue reading in the full post
					</Text>
				)}
			</div>
		)}
	</Section>
);

export const NewPostEnhanced: React.FC<Readonly<PostEmailProps>> = ({
	title,
	heading,
	subheading,
	excerpt,
	slug,
	image,
	team,
	blocks,
}) => (
	<Html>
		<Head>
			<Font
				fontFamily="Space Grotesk"
				fallbackFontFamily="Verdana"
				webFont={{
					url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
					format: "woff2",
				}}
				fontWeight={400}
				fontStyle="normal"
			/>
		</Head>
		<Tailwind>
			<Body className="mx-auto my-auto font-sans bg-gray-50">
				{/* Header */}
				<Section className="bg-black py-8 text-center">
					<Heading className="text-[32px] font-bold text-white m-0">
						📖 New Post from Reality Designers
					</Heading>
					<Text className="text-gray-300 text-[14px] mt-2">
						Fresh insights and ideas just published!
					</Text>
				</Section>

				{/* Main Post Content */}
				<Section className="bg-white mx-4 my-6 p-6 rounded-lg shadow-lg">
					<Heading className="text-[32px] font-bold text-black mb-4 leading-tight">
						{heading || title}
					</Heading>
					
					{subheading && (
						<Text className="text-[18px] text-gray-600 mb-6 leading-relaxed italic">
							{subheading}
						</Text>
					)}

					{/* Featured Image */}
					{image && (
						<Section className="text-center mb-6">
							<Img 
								src={image} 
								width="600" 
								alt="Post featured image"
								className="rounded-lg shadow-md"
								style={{ maxWidth: '100%', height: 'auto' }}
							/>
						</Section>
					)}

					{/* Post Excerpt */}
					{excerpt && (
						<Section className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
							<Text className="text-[16px] text-gray-700 leading-relaxed m-0 font-medium">
								{excerpt}
							</Text>
						</Section>
					)}

					{/* Team Info */}
					{team && (
						<Section className="mb-6 p-4 bg-gray-100 rounded-lg">
							<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
								{team.image && (
									<Img 
										src={team.image} 
										width="48" 
										height="48" 
										alt={team.name}
										className="rounded-full"
									/>
								)}
								<div>
									<Text className="font-semibold text-black m-0">By {team.name}</Text>
									<Text className="text-gray-600 text-[14px] m-0">{team.role}</Text>
								</div>
							</div>
						</Section>
					)}

					{/* Action Button */}
					<Section className="text-center mb-6">
						<Button
							href={`https://www.reality-designers.com/posts/${slug}`}
							className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-[16px]"
							style={{ textDecoration: 'none' }}
						>
							📖 Read Full Article
						</Button>
					</Section>
				</Section>

				{/* Content Preview */}
				{blocks && blocks.length > 0 && (
					<Section className="bg-white mx-4 my-6 p-6 rounded-lg shadow-lg">
						<Heading className="text-[24px] font-bold text-black mb-6 border-b pb-3">
							📝 Article Preview
						</Heading>
						
						{blocks.slice(0, 2).map((block, index) => (
							<div key={index}>
								<ContentBlock block={block} />
								{index < Math.min(blocks.length - 1, 1) && <Hr className="my-6" />}
							</div>
						))}

						{blocks.length > 2 && (
							<Section className="text-center p-4 bg-gray-100 rounded-lg">
								<Text className="text-gray-600 text-[15px] mb-3">
									This is just a preview. Read the full article for complete content, images, and insights.
								</Text>
								<Button
									href={`https://www.reality-designers.com/posts/${slug}`}
									className="bg-blue-600 text-white px-6 py-2 rounded text-[14px]"
								>
									Continue Reading →
								</Button>
							</Section>
						)}
					</Section>
				)}

				{/* Social Links */}
				<Section className="bg-gray-100 py-6 text-center">
					<Text className="text-[16px] text-gray-700 mb-4">
						Join the Reality Designers community
					</Text>
					<div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
						<Button
							href="https://www.youtube.com/@realitydesigners"
							className="bg-red-600 text-white px-4 py-2 rounded text-[14px]"
						>
							YouTube
						</Button>
						<Button
							href="https://www.instagram.com/realitydesignerstv/"
							className="bg-purple-600 text-white px-4 py-2 rounded text-[14px]"
						>
							Instagram
						</Button>
						<Button
							href="https://www.twitter.com/realitydesignrs/"
							className="bg-blue-500 text-white px-4 py-2 rounded text-[14px]"
						>
							Twitter
						</Button>
					</div>
				</Section>

				{/* Footer */}
				<Section className="text-center py-4">
					<Text className="text-gray-500 text-[12px]">
						Reality Designers - Crafting Digital Experiences<br/>
						You're receiving this because you're part of our community.
					</Text>
				</Section>
			</Body>
		</Tailwind>
	</Html>
); 