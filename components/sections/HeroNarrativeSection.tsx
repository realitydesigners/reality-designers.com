export default function HeroNarrativeSection() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated background grid */}
	

			{/* Glowing orb background */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96  to-transparent rounded-full blur-3xl pointer-events-none"></div>
			
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
	);
} 