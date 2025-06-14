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

interface VideoEmailProps {
	title: string;
	heading: string;
	subheading?: string;
	excerpt?: string;
	slug: string;
	videoUrl?: string;
	image?: string;
	team?: {
		name: string;
		role: string;
		image?: string;
	};
	blocks?: Array<{
		heading?: string;
		subheading?: string;
		content?: any[];
	}>;
}

export const NewVideo: React.FC<Readonly<VideoEmailProps>> = ({
	title,
	heading,
	subheading,
	excerpt,
	slug,
	videoUrl,
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
						🎬 New Video from Reality Designers
					</Heading>
					<Text className="text-gray-300 text-[14px] mt-2">
						Fresh content just dropped!
					</Text>
				</Section>

				{/* Main Video Content */}
				<Section className="bg-white mx-4 my-6 p-6 rounded-lg shadow-lg">
					<Heading className="text-[28px] font-bold text-black mb-4 leading-tight">
						{heading || title}
					</Heading>
					
					{subheading && (
						<Text className="text-[18px] text-gray-600 mb-6 leading-relaxed">
							{subheading}
						</Text>
					)}

					{/* Video Thumbnail */}
					{image && (
						<Section className="text-center mb-6">
							<Img 
								src={image} 
								width="600" 
								height="320" 
								alt="Video thumbnail"
								className="rounded-lg shadow-md"
								style={{ maxWidth: '100%', height: 'auto' }}
							/>
						</Section>
					)}

					{/* Video Description */}
					{excerpt && (
						<Section className="mb-6 p-4 bg-gray-100 rounded-lg">
							<Text className="text-[16px] text-gray-700 leading-relaxed m-0">
								{excerpt}
							</Text>
						</Section>
					)}

					{/* Action Buttons */}
					<Section className="text-center mb-6">
						<div style={{ display: 'inline-block', marginRight: '12px' }}>
							<Button
								href={`https://www.reality-designers.com/videos/${slug}`}
								className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
								style={{ textDecoration: 'none' }}
							>
								📖 Read Full Post
							</Button>
						</div>
						{videoUrl && (
							<div style={{ display: 'inline-block' }}>
								<Button
									href={videoUrl}
									className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
									style={{ textDecoration: 'none' }}
								>
									▶️ Watch on YouTube
								</Button>
							</div>
						)}
					</Section>

					{/* Team Info */}
					{team && (
						<Section className="border-t pt-4 mb-6">
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
									<Text className="font-semibold text-black m-0">{team.name}</Text>
									<Text className="text-gray-600 text-[14px] m-0">{team.role}</Text>
								</div>
							</div>
						</Section>
					)}
				</Section>

				{/* Content Blocks Preview */}
				{blocks && blocks.length > 0 && (
					<Section className="bg-white mx-4 my-6 p-6 rounded-lg shadow-lg">
						<Heading className="text-[20px] font-bold text-black mb-4">
							📝 What's Inside
						</Heading>
						{blocks.slice(0, 2).map((block, index) => (
							<div key={index} style={{ marginBottom: '16px' }}>
								{block.heading && (
									<Text className="font-semibold text-black text-[16px] mb-2">
										{block.heading}
									</Text>
								)}
								{block.subheading && (
									<Text className="text-gray-600 text-[14px] mb-0">
										{block.subheading}
									</Text>
								)}
								{index < blocks.length - 1 && <Hr className="my-4" />}
							</div>
						))}
						{blocks.length > 2 && (
							<Text className="text-gray-500 text-[14px] italic">
								...and more! Read the full post for all content.
							</Text>
						)}
					</Section>
				)}

				{/* Social Links */}
				<Section className="bg-gray-100 py-6 text-center">
					<Text className="text-[16px] text-gray-700 mb-4">
						Stay connected with Reality Designers
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
						Reality Designers - Crafting Digital Experiences
					</Text>
				</Section>
			</Body>
		</Tailwind>
	</Html>
); 