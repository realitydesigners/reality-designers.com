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
					url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
					format: "woff2",
				}}
				fontWeight={400}
				fontStyle="normal"
			/>
		</Head>
		<Tailwind>
			<Body
				style={{
					backgroundColor: "#f8fafc",
					fontFamily: "'Space Grotesk', system-ui, sans-serif",
				}}
			>
				<Container
					style={{
						maxWidth: "640px",
						margin: "0 auto",
						backgroundColor: "#ffffff",
					}}
				>
					{/* Reality Designers Header */}
					<Section
						style={{
							backgroundColor: "#000000",
							padding: "32px",
							textAlign: "center",
						}}
					>
						<div style={{ marginBottom: "16px" }}>
							<div
								style={{
									display: "inline-block",
									padding: "8px 16px",
									backgroundColor: "rgba(255, 255, 255, 0.1)",
									borderRadius: "8px",
									border: "1px solid rgba(255, 255, 255, 0.2)",
								}}
							>
								<Text
									style={{
										color: "#ffffff",
										fontSize: "11px",
										fontWeight: "700",
										letterSpacing: "2px",
										textTransform: "uppercase",
										margin: "0",
									}}
								>
									REALITY DESIGNERS
								</Text>
							</div>
						</div>
						<Heading
							style={{
								color: "#ffffff",
								fontSize: "24px",
								fontWeight: "600",
								margin: "0",
								lineHeight: "1.3",
							}}
						>
							🎬 New Video Available
						</Heading>
						<Text
							style={{
								color: "rgba(255, 255, 255, 0.7)",
								fontSize: "14px",
								margin: "8px 0 0 0",
							}}
						>
							Fresh content just dropped
						</Text>
					</Section>

					{/* Main Content */}
					<Section style={{ padding: "40px 32px", backgroundColor: "#ffffff" }}>
						{/* Title */}
						<Heading
							style={{
								fontSize: "28px",
								fontWeight: "700",
								color: "#1f2937",
								lineHeight: "1.2",
								margin: "0 0 16px 0",
							}}
						>
							{heading || title}
						</Heading>

						{/* Subtitle */}
						{subheading && (
							<Text
								style={{
									fontSize: "18px",
									color: "#6b7280",
									lineHeight: "1.5",
									margin: "0 0 32px 0",
									fontWeight: "400",
								}}
							>
								{subheading}
							</Text>
						)}

						{/* Video Thumbnail */}
						{image && (
							<Section style={{ textAlign: "center", margin: "0 0 32px 0" }}>
								<div
									style={{
										position: "relative",
										display: "inline-block",
										borderRadius: "12px",
										overflow: "hidden",
										boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
									}}
								>
									<Img
										src={image}
										width="560"
										height="315"
										alt="Video thumbnail"
										style={{
											width: "100%",
											height: "auto",
											display: "block",
										}}
									/>
									{/* Play button overlay */}
									<div
										style={{
											position: "absolute",
											top: "50%",
											left: "50%",
											transform: "translate(-50%, -50%)",
											width: "72px",
											height: "72px",
											backgroundColor: "rgba(0, 0, 0, 0.8)",
											borderRadius: "50%",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												color: "#ffffff",
												fontSize: "24px",
												margin: "0",
												marginLeft: "4px",
											}}
										>
											▶
										</Text>
									</div>
								</div>
							</Section>
						)}

						{/* Description */}
						{excerpt && (
							<Section
								style={{
									padding: "24px",
									backgroundColor: "#f9fafb",
									borderRadius: "12px",
									borderLeft: "4px solid #000000",
									margin: "0 0 32px 0",
								}}
							>
								<Text
									style={{
										fontSize: "16px",
										color: "#374151",
										lineHeight: "1.6",
										margin: "0",
										fontWeight: "400",
									}}
								>
									{excerpt}
								</Text>
							</Section>
						)}

						{/* CTA Buttons */}
						<Section style={{ textAlign: "center", margin: "0 0 32px 0" }}>
							<div
								style={{
									display: "inline-block",
									marginRight: "16px",
									marginBottom: "12px",
								}}
							>
								<Button
									href={`https://www.reality-designers.com/videos/${slug}`}
									style={{
										backgroundColor: "#000000",
										color: "#ffffff",
										padding: "14px 28px",
										borderRadius: "8px",
										textDecoration: "none",
										fontWeight: "600",
										fontSize: "15px",
										display: "inline-block",
										border: "none",
									}}
								>
									📖 Read Full Post
								</Button>
							</div>
							{videoUrl && (
								<div style={{ display: "inline-block", marginBottom: "12px" }}>
									<Button
										href={videoUrl}
										style={{
											backgroundColor: "#dc2626",
											color: "#ffffff",
											padding: "14px 28px",
											borderRadius: "8px",
											textDecoration: "none",
											fontWeight: "600",
											fontSize: "15px",
											display: "inline-block",
											border: "none",
										}}
									>
										▶️ Watch on YouTube
									</Button>
								</div>
							)}
						</Section>

						{/* Team Credit */}
						{team && (
							<Section
								style={{
									padding: "20px 0",
									borderTop: "1px solid #e5e7eb",
									margin: "0 0 32px 0",
								}}
							>
								<div
									style={{ display: "flex", alignItems: "center", gap: "12px" }}
								>
									{team.image && (
										<Img
											src={team.image}
											width="48"
											height="48"
											alt={team.name}
											style={{
												borderRadius: "50%",
												border: "2px solid #e5e7eb",
											}}
										/>
									)}
									<div>
										<Text
											style={{
												fontSize: "16px",
												fontWeight: "600",
												color: "#1f2937",
												margin: "0",
											}}
										>
											{team.name}
										</Text>
										<Text
											style={{
												fontSize: "14px",
												color: "#6b7280",
												margin: "0",
											}}
										>
											{team.role}
										</Text>
									</div>
								</div>
							</Section>
						)}
					</Section>

					{/* Rich Content Preview */}
					{blocks && blocks.length > 0 && (
						<Section
							style={{
								backgroundColor: "#f9fafb",
								padding: "32px",
								borderTop: "1px solid #e5e7eb",
							}}
						>
							<Heading
								style={{
									fontSize: "20px",
									fontWeight: "600",
									color: "#1f2937",
									margin: "0 0 24px 0",
								}}
							>
								📝 What's Inside
							</Heading>
							{blocks.slice(0, 2).map((block, index) => (
								<div
									key={index}
									style={{
										marginBottom: index < blocks.length - 1 ? "32px" : "0",
									}}
								>
									{block.heading && (
										<Text
											style={{
												fontSize: "18px",
												fontWeight: "600",
												color: "#1f2937",
												margin: "0 0 8px 0",
											}}
										>
											{block.heading}
										</Text>
									)}
									{block.subheading && (
										<Text
											style={{
												fontSize: "16px",
												color: "#6b7280",
												margin: "0 0 16px 0",
												lineHeight: "1.5",
											}}
										>
											{block.subheading}
										</Text>
									)}
									{block.content && block.content.length > 0 && (
										<RichContentRenderer content={block.content} maxItems={3} />
									)}
								</div>
							))}
							{blocks.length > 2 && (
								<Section
									style={{
										textAlign: "center",
										padding: "20px",
										backgroundColor: "#ffffff",
										borderRadius: "8px",
										marginTop: "24px",
									}}
								>
									<Text
										style={{
											fontSize: "14px",
											color: "#6b7280",
											margin: "0",
										}}
									>
										...and {blocks.length - 2} more sections in the full post
									</Text>
								</Section>
							)}
						</Section>
					)}

					{/* Social Footer */}
					<Section
						style={{
							backgroundColor: "#1f2937",
							padding: "32px",
							textAlign: "center",
						}}
					>
						<Text
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "500",
								margin: "0 0 20px 0",
							}}
						>
							Stay Connected
						</Text>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								gap: "12px",
								flexWrap: "wrap",
							}}
						>
							<Button
								href="https://www.youtube.com/@realitydesigners"
								style={{
									backgroundColor: "#dc2626",
									color: "#ffffff",
									padding: "8px 16px",
									borderRadius: "6px",
									textDecoration: "none",
									fontSize: "13px",
									fontWeight: "500",
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
									fontWeight: "500",
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
									fontWeight: "500",
								}}
							>
								Twitter
							</Button>
						</div>
					</Section>

					{/* Brand Footer */}
					<Section
						style={{
							textAlign: "center",
							padding: "24px",
							backgroundColor: "#ffffff",
						}}
					>
						<Text
							style={{
								color: "#9ca3af",
								fontSize: "12px",
								margin: "0",
								letterSpacing: "1px",
							}}
						>
							REALITY DESIGNERS - CRAFTING DIGITAL EXPERIENCES
						</Text>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);
