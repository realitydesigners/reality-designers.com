import Button from "@/components/ui/Button";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

interface DropdownLink {
	href: string;
	label: string;
	description: string;
}

interface DropdownData {
	title: string;
	description: string;
	spline: string;
	links: DropdownLink[];
}

export const StoryPanel = ({
	dropdown,
	navbarTheme,
	onLinkClick,
}: {
	dropdown: DropdownData;
	navbarTheme: "dark" | "light";
	onLinkClick: () => void;
}) => (
	<div className="flex h-[450px] relative overflow-hidden">
		{/* Animated background grid */}
		<div className="absolute inset-0 pointer-events-none opacity-20">
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
						linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
					`,
					backgroundSize: "30px 30px",
					animation: "gridFloat 20s ease-in-out infinite",
				}}
			></div>
		</div>

		{/* Left side - Hero Content */}
		<div className="flex-1 p-8 flex flex-col justify-center relative">
			{/* Glowing orb background */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

			<div className="relative z-10">
				{/* Enhanced badge with glow */}
				<div className="inline-flex items-center gap-3 mb-6 p-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
					<div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
					<span
						className={`font-russo text-xs tracking-[0.3em] uppercase font-bold ${
							navbarTheme === "dark" ? "text-blue-400" : "text-blue-600"
						}`}
					>
						Our Journey
					</span>
					<div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-500"></div>
				</div>

				{/* Enhanced headline with better typography */}
				<h2
					className={`font-russo text-4xl font-bold mb-6 leading-tight ${
						navbarTheme === "dark" ? "text-white" : "text-black"
					}`}
				>
					FROM <span className="relative">VISION</span>
					<br />
					<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						TO REALITY
					</span>
				</h2>

				{/* Enhanced description */}
				<p
					className={`text-lg leading-relaxed font-outfit font-medium mb-8 max-w-md ${
						navbarTheme === "dark" ? "text-white/90" : "text-black/90"
					}`}
				>
					We are{" "}
					<span className="font-semibold text-blue-400">
						architects of the impossible
					</span>
					, crafting immersive experiences that blur the line between dreams and
					digital reality.
				</p>

				{/* Enhanced CTA Buttons */}
				<div className="flex gap-4">
					<Button
						variant="primary"
						size="sm"
						href="/story"
						theme={navbarTheme}
						className="whitespace-nowrap px-6 py-3 text-sm font-bold"
					>
						Explore Our Journey
					</Button>
					<Button
						variant="outline"
						size="sm"
						href="/contact"
						theme={navbarTheme}
						className="whitespace-nowrap px-6 py-3 text-sm font-bold"
					>
						Join Our Story
					</Button>
				</div>
			</div>
		</div>

		{/* Center - Enhanced Story Timeline */}
		<div className="flex-1 p-6 flex flex-col justify-center relative">
			{/* Enhanced timeline items */}
			<div className="grid grid-cols-2 gap-6 relative z-10">
				{dropdown.links.map((link, index) => (
					<Link
						key={link.href}
						href={link.href}
						className={`group relative p-6 rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
							navbarTheme === "dark"
								? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-blue-400/50 hover:bg-white/15 shadow-xl hover:shadow-blue-400/20"
								: "bg-gradient-to-br from-black/10 to-black/5 border border-black/20 hover:border-blue-600/50 hover:bg-black/15 shadow-xl hover:shadow-blue-600/20"
						} backdrop-blur-sm`}
						onClick={onLinkClick}
						style={{ animationDelay: `${index * 200}ms` }}
					>
						{/* Enhanced timeline dot with number */}
						<div
							className={`absolute -left-3 top-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
								navbarTheme === "dark"
									? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/60 group-hover:scale-110"
									: "bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/60 group-hover:scale-110"
							}`}
						>
							{index + 1}
						</div>

						{/* Enhanced hover glow effect */}
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

						<div className="relative z-10">
							<div
								className={`font-russo text-base font-bold mb-2 ${
									navbarTheme === "dark"
										? "text-white group-hover:text-blue-300"
										: "text-black group-hover:text-blue-700"
								} transition-colors duration-300`}
							>
								{link.label}
							</div>
							<div
								className={`text-sm leading-relaxed ${
									navbarTheme === "dark"
										? "text-white/80 group-hover:text-white/95"
										: "text-black/80 group-hover:text-black/95"
								} transition-colors duration-300`}
							>
								{link.description}
							</div>
						</div>

						{/* Corner accent with animation */}
						<div className="absolute bottom-3 right-3 w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
							<div
								className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 transition-all duration-300 ${
									navbarTheme === "dark"
										? "border-blue-400 group-hover:border-blue-300 group-hover:w-4 group-hover:h-4"
										: "border-blue-600 group-hover:border-blue-500 group-hover:w-4 group-hover:h-4"
								}`}
							></div>
						</div>
					</Link>
				))}
			</div>
		</div>

		{/* Right side - Enhanced Spline 3D */}
		<div className="w-72 relative overflow-hidden">
			{/* 
			<div className="absolute inset-0 rounded-l-3xl overflow-hidden">
				<div className="absolute inset-0 opacity-70">
					<Spline scene={dropdown.spline} />
				</div>
		
				<div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-500/5 to-purple-500/10 rounded-l-3xl"></div>
			</div> */}
		</div>
	</div>
);
