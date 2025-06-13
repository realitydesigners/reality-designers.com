import Spline from "@splinetool/react-spline";

export default function TechnologyShowcaseSection() {
	return (
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
	);
} 