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
	Container,
} from "@react-email/components";
import * as React from "react";
import { RichContentRenderer } from "./components/RichContentRenderer";

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
	<Section style={{ marginBottom: "32px" }}>
		{block.heading && (
			<Heading style={{ 
				fontSize: "20px", 
				fontWeight: "600", 
				color: "#1f2937", 
				margin: "0 0 12px 0",
				lineHeight: "1.3"
			}}>
				{block.heading}
			</Heading>
		)}
		
		{block.subheading && (
			<Text style={{ 
				fontSize: "16px", 
				color: "#6b7280", 
				margin: "0 0 20px 0",
				lineHeight: "1.5"
			}}>
				{block.subheading}
			</Text>
		)}

		{block.imageRef?.imageUrl && (
			<Section style={{ textAlign: "center", margin: "0 0 20px 0" }}>
				<Img 
					src={block.imageRef.imageUrl} 
					alt={block.imageRef.imageAlt || "Content image"}
					width="560"
					style={{ 
						width: "100%", 
						height: "auto",
						borderRadius: "8px",
						boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
					}}
				/>
			</Section>
		)}

		{block.content && block.content.length > 0 && (
			<RichContentRenderer content={block.content} maxItems={4} />
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
					url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
					format: "woff2",
				}}
				fontWeight={400}
				fontStyle="normal"
			/>
		</Head>
		<Tailwind>
			<Body style={{ backgroundColor: "#f8fafc", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
				<Container style={{ maxWidth: "640px", margin: "0 auto", backgroundColor: "#ffffff" }}>
					
					{/* Reality Designers Header */}
					<Section style={{ backgroundColor: "#000000", padding: "32px", textAlign: "center" }}>
						<div style={{ marginBottom: "16px" }}>
							<div style={{
								display: "inline-block",
								padding: "8px 16px",
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "8px",
								border: "1px solid rgba(255, 255, 255, 0.2)"
							}}>
								<Text style={{ 
									color: "#ffffff", 
									fontSize: "11px", 
									fontWeight: "700", 
									letterSpacing: "2px", 
									textTransform: "uppercase",
									margin: "0"
								}}>
									REALITY DESIGNERS
								</Text>
							</div>
						</div>
						<Heading style={{ 
							color: "#ffffff", 
							fontSize: "24px", 
							fontWeight: "600", 
							margin: "0",
							lineHeight: "1.3"
						}}>
							📖 New Article Published
						</Heading>
						<Text style={{ 
							color: "rgba(255, 255, 255, 0.7)", 
							fontSize: "14px", 
							margin: "8px 0 0 0"
						}}>
							Fresh insights and ideas just published
						</Text>
					</Section>

					{/* Main Content */}
					<Section style={{ padding: "40px 32px", backgroundColor: "#ffffff" }}>
						
						{/* Title */}
						<Heading style={{ 
							fontSize: "32px", 
							fontWeight: "700", 
							color: "#1f2937", 
							lineHeight: "1.2",
							margin: "0 0 16px 0"
						}}>
							{heading || title}
						</Heading>
						
						{/* Subtitle */}
						{subheading && (
							<Text style={{ 
								fontSize: "20px", 
								color: "#6b7280", 
								lineHeight: "1.4",
								margin: "0 0 32px 0",
								fontWeight: "400",
								fontStyle: "italic"
							}}>
								{subheading}
							</Text>
						)}

						{/* Featured Image */}
						{image && (
							<Section style={{ textAlign: "center", margin: "0 0 32px 0" }}>
								<Img 
									src={image} 
									width="560" 
									alt="Post featured image"
									style={{ 
										width: "100%", 
										height: "auto",
										borderRadius: "12px",
										boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
									}}
								/>
							</Section>
						)}

						{/* Post Excerpt */}
						{excerpt && (
							<Section style={{ 
								padding: "24px", 
								backgroundColor: "#f0f9ff", 
								borderRadius: "12px",
								borderLeft: "4px solid #0ea5e9",
								margin: "0 0 32px 0"
							}}>
								<Text style={{ 
									fontSize: "17px", 
									color: "#0c4a6e", 
									lineHeight: "1.6",
									margin: "0",
									fontWeight: "500"
								}}>
									{excerpt}
								</Text>
							</Section>
						)}

						{/* Team Credit */}
						{team && (
							<Section style={{ 
								padding: "20px", 
								backgroundColor: "#f9fafb",
								borderRadius: "12px",
								margin: "0 0 32px 0"
							}}>
								<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
									{team.image && (
										<Img 
											src={team.image} 
											width="56" 
											height="56" 
											alt={team.name}
											style={{ 
												borderRadius: "50%",
												border: "3px solid #ffffff",
												boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
											}}
										/>
									)}
									<div>
										<Text style={{ 
											fontSize: "16px", 
											fontWeight: "600", 
											color: "#1f2937", 
											margin: "0 0 4px 0"
										}}>
											By {team.name}
										</Text>
										<Text style={{ 
											fontSize: "14px", 
											color: "#6b7280", 
											margin: "0"
										}}>
											{team.role}
										</Text>
									</div>
								</div>
							</Section>
						)}

						{/* CTA Button */}
						<Section style={{ textAlign: "center", margin: "0 0 32px 0" }}>
							<Button
								href={`https://www.reality-designers.com/posts/${slug}`}
								style={{
									backgroundColor: "#000000",
									color: "#ffffff",
									padding: "16px 32px",
									borderRadius: "8px",
									textDecoration: "none",
									fontWeight: "600",
									fontSize: "16px",
									display: "inline-block",
									border: "none"
								}}
							>
								📖 Read Full Article
							</Button>
						</Section>
					</Section>

					{/* Content Preview */}
					{blocks && blocks.length > 0 && (
						<Section style={{ 
							backgroundColor: "#f9fafb", 
							padding: "32px",
							borderTop: "1px solid #e5e7eb"
						}}>
							<Heading style={{ 
								fontSize: "24px", 
								fontWeight: "600", 
								color: "#1f2937", 
								margin: "0 0 24px 0",
								textAlign: "center"
							}}>
								📝 Article Preview
							</Heading>
							
							{blocks.slice(0, 2).map((block, index) => (
								<div key={index}>
									<ContentBlock block={block} />
									{index < Math.min(blocks.length - 1, 1) && (
										<Hr style={{ 
											border: "none", 
											borderTop: "1px solid #e5e7eb", 
											margin: "32px 0" 
										}} />
									)}
								</div>
							))}

							{blocks.length > 2 && (
								<Section style={{ 
									textAlign: "center", 
									padding: "24px",
									backgroundColor: "#ffffff",
									borderRadius: "12px",
									boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
								}}>
									<Text style={{ 
										fontSize: "16px", 
										color: "#6b7280", 
										margin: "0 0 16px 0",
										lineHeight: "1.5"
									}}>
										This is just a preview. Read the full article for complete content, images, and insights.
									</Text>
									<Button
										href={`https://www.reality-designers.com/posts/${slug}`}
										style={{
											backgroundColor: "#3b82f6",
											color: "#ffffff",
											padding: "12px 24px",
											borderRadius: "6px",
											textDecoration: "none",
											fontSize: "14px",
											fontWeight: "500"
										}}
									>
										Continue Reading →
									</Button>
								</Section>
							)}
						</Section>
					)}

					{/* Social Footer */}
					<Section style={{ 
						backgroundColor: "#1f2937", 
						padding: "32px", 
						textAlign: "center"
					}}>
						<Text style={{ 
							color: "#ffffff", 
							fontSize: "16px", 
							fontWeight: "500",
							margin: "0 0 20px 0"
						}}>
							Join the Community
						</Text>
						<div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
							<Button
								href="https://www.youtube.com/@realitydesigners"
								style={{
									backgroundColor: "#dc2626",
									color: "#ffffff",
									padding: "8px 16px",
									borderRadius: "6px",
									textDecoration: "none",
									fontSize: "13px",
									fontWeight: "500"
								}}
							>
								YouTube
							</Button>
							<Button
								href="https://www.instagram.com/realitydesignerstv/"
								style={{
									backgroundColor: "#8b5cf6",
									color: "#ffffff",
									padding: "8px 16px",
									borderRadius: "6px",
									textDecoration: "none",
									fontSize: "13px",
									fontWeight: "500"
								}}
							>
								Instagram
							</Button>
							<Button
								href="https://www.twitter.com/realitydesignrs/"
								style={{
									backgroundColor: "#3b82f6",
									color: "#ffffff",
									padding: "8px 16px",
									borderRadius: "6px",
									textDecoration: "none",
									fontSize: "13px",
									fontWeight: "500"
								}}
							>
								Twitter
							</Button>
						</div>
					</Section>

					{/* Brand Footer */}
					<Section style={{ 
						textAlign: "center", 
						padding: "24px",
						backgroundColor: "#ffffff"
					}}>
						<Text style={{ 
							color: "#9ca3af", 
							fontSize: "12px",
							margin: "0",
							letterSpacing: "1px"
						}}>
							REALITY DESIGNERS - CRAFTING DIGITAL EXPERIENCES<br/>
							You're receiving this because you're part of our community.
						</Text>
					</Section>

				</Container>
			</Body>
		</Tailwind>
	</Html>
); 