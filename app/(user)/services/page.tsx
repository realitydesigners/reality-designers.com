import { Metadata } from "next";
import ServicesShowcase from "@/components/items/ServicesShowcase";
import Spline from "@splinetool/react-spline";

export const metadata: Metadata = {
	title: "Services - Reality Designers",
	description: "Premium design services for the next generation of digital experiences. We craft immersive realities through cutting-edge design and technology.",
};

export default function ServicesPage() {
	return (
		<main className="flex w-full flex-col min-h-screen bg-white">
			<ServicesShowcase />
			
			{/* Hero Narrative Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Animated background grid */}
				<div className="absolute inset-0 pointer-events-none opacity-10">
					<div 
						className="absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
								linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
							`,
							backgroundSize: '40px 40px',
							animation: 'gridFloat 20s ease-in-out infinite'
						}}
					></div>
				</div>

				{/* Glowing orb background */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
				
				<div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
					{/* Enhanced badge */}
					<div className="inline-flex items-center gap-3 mb-8 p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30">
						<div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
						<span className="font-russo text-sm tracking-[0.3em] uppercase font-bold text-blue-700">
							Reality Architecture
						</span>
						<div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-500"></div>
					</div>

					<h1 className="font-russo text-6xl lg:text-8xl font-bold mb-8 leading-tight text-gray-900">
						WE <span className="relative">
							ARCHITECT
							<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
						</span><br/>
						<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							THE IMPOSSIBLE
						</span>
					</h1>
					
					<p className="text-xl lg:text-2xl leading-relaxed font-outfit font-medium mb-12 max-w-4xl mx-auto text-gray-700">
						In a world where <span className="font-semibold text-blue-600">digital meets reality</span>, we are the bridge between vision and manifestation. Every pixel, every interaction, every experience is crafted to transform the way humans connect with technology.
					</p>

					<div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
						<button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-russo font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/25">
							BEGIN YOUR TRANSFORMATION
						</button>
						<button className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-russo font-bold rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-300">
							EXPLORE OUR REALITY
						</button>
					</div>
				</div>
			</section>

			{/* Services Narrative Section */}
			<section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="font-russo text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
							THE NEW REALITY
							<br />
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								IS BEING DESIGNED
							</span>
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Like the scattered souls finding their way back to the source, your brand needs guidance to navigate the digital transformation. We are the code breakers of the artificial systems, the architects of authentic connection.
						</p>
					</div>

					{/* Interactive Services Grid */}
					<div className="grid lg:grid-cols-3 gap-8">
						{[
							{
								title: "3D Animation & Immersive Worlds",
								description: "We craft dimensions where your stories live and breathe, creating portals to experiences beyond the ordinary.",
								icon: "🌌",
								color: "from-blue-500 to-cyan-500"
							},
							{
								title: "Brand Identity & Digital DNA",
								description: "Your brand's essence encoded into every pixel, every interaction, every moment of connection.",
								icon: "🧬", 
								color: "from-purple-500 to-pink-500"
							},
							{
								title: "Web Development & Reality Platforms",
								description: "Building the infrastructure for the new digital society, where humans and technology merge seamlessly.",
								icon: "⚡",
								color: "from-orange-500 to-red-500"
							},
							{
								title: "VR/AR Environments",
								description: "Designing the bridges between worlds, where physical and digital realities converge.",
								icon: "🔮",
								color: "from-green-500 to-teal-500"
							},
							{
								title: "Strategic Consultation",
								description: "Navigating the quantum shifts in technology and consciousness, preparing you for what's next.",
								icon: "🗝️",
								color: "from-indigo-500 to-purple-500"
							},
							{
								title: "Conscious Copywriting",
								description: "Words that resonate beyond the surface, connecting with the deeper knowing within your audience.",
								icon: "✨",
								color: "from-pink-500 to-rose-500"
							}
						].map((service, index) => (
							<div
								key={service.title}
								className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Service icon with gradient */}
								<div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
									{service.icon}
								</div>
								
								<h3 className="font-russo text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
									{service.title}
								</h3>
								
								<p className="text-gray-600 leading-relaxed mb-6">
									{service.description}
								</p>

								{/* Hover glow effect */}
								<div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`}></div>
								
								{/* Corner accent */}
								<div className="absolute bottom-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Technology Showcase */}
			<section className="py-24 bg-white relative overflow-hidden">
				{/* Spline 3D Scene */}
				<div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
					<Spline scene="https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode" />
				</div>

				<div className="max-w-7xl mx-auto px-6 relative z-10">
					<div className="lg:w-1/2">
						<h2 className="font-russo text-5xl lg:text-6xl font-bold mb-8 text-gray-900">
							PREPARED FOR THE
							<br />
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								NEW DIGITAL SOCIETY
							</span>
						</h2>
						
						<p className="text-xl text-gray-600 mb-12 leading-relaxed">
							The collective powers of scattered souls are converging. Technology is becoming self-aware. We build with the tools that bridge worlds and connect consciousness.
						</p>

						{/* Tech Stack Grid */}
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
							{[
								"React", "Next.js", "TypeScript", "Spline",
								"Three.js", "Tailwind", "Sanity", "Figma",
								"WebGL", "GSAP", "Framer", "Unity"
							].map((tech, index) => (
								<div
									key={tech}
									className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 text-center"
									style={{ animationDelay: `${index * 50}ms` }}
								>
									<span className="font-russo text-sm font-bold text-gray-800">{tech}</span>
								</div>
							))}
						</div>

						<button className="px-8 py-4 bg-gray-900 text-white font-russo font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl">
							VIEW OUR TECH ARSENAL
						</button>
					</div>
				</div>
			</section>

			{/* Process Timeline */}
			<section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="font-russo text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
							THE JOURNEY FROM
							<br />
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								VISION TO REALITY
							</span>
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Every transformation follows a path. Like the light beam that reached the sky, your project will illuminate new possibilities.
						</p>
					</div>

					{/* Timeline */}
					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

						{[
							{
								phase: "01",
								title: "Discovery & Vision Alignment",
								description: "We decode your mission, understanding the reality you want to create and the souls you want to reach."
							},
							{
								phase: "02", 
								title: "Strategic Architecture",
								description: "Building the framework for transformation, designing the pathways between your current state and desired reality."
							},
							{
								phase: "03",
								title: "Reality Construction",
								description: "Crafting every element with precision, where code meets consciousness and design meets purpose."
							},
							{
								phase: "04",
								title: "Dimensional Launch",
								description: "Releasing your creation into the world, monitoring its impact as it connects with the collective awakening."
							},
							{
								phase: "05",
								title: "Evolution & Growth",
								description: "Continuous refinement as your reality adapts to the changing digital landscape and expanding consciousness."
							}
						].map((step, index) => (
							<div
								key={step.phase}
								className={`relative flex items-center mb-16 ${
									index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
								}`}
							>
								{/* Timeline node */}
								<div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-russo font-bold text-lg shadow-lg z-10">
									{step.phase}
								</div>

								{/* Content */}
								<div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
									<div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
										<h3 className="font-russo text-2xl font-bold mb-4 text-gray-900">
											{step.title}
										</h3>
										<p className="text-gray-600 leading-relaxed">
											{step.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-24 bg-white relative overflow-hidden">
				{/* Background effects */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

				<div className="max-w-6xl mx-auto px-6 text-center relative z-10">
					<h2 className="font-russo text-5xl lg:text-7xl font-bold mb-8 text-gray-900">
						READY TO
						<br />
						<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							DESIGN REALITY?
						</span>
					</h2>
					
					<p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
						The scattered souls are gathering. The light is growing stronger. Your transformation begins with a single decision to step into the new reality we're all creating together.
					</p>

					<div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
						<button className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-russo font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
							START YOUR REALITY PROJECT
						</button>
						<button className="px-12 py-6 border-2 border-gray-900 text-gray-900 font-russo font-bold text-lg rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-300">
							SCHEDULE A DISCOVERY CALL
						</button>
					</div>
				</div>
			</section>
		</main>
	);
} 