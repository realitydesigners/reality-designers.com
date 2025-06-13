export default function ServicesNarrativeSection() {
	return (
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
						Like the scattered souls finding their way back to the source, your
						brand needs guidance to navigate the digital transformation. We are
						the code breakers of the artificial systems, the architects of
						authentic connection.
					</p>
				</div>

				{/* Interactive Services Grid */}
				<div className="grid lg:grid-cols-3 gap-8">
					{[
						{
							title: "3D Animation & Immersive Worlds",
							description:
								"We craft dimensions where your stories live and breathe, creating portals to experiences beyond the ordinary.",
							icon: "🌌",
							color: "from-blue-500 to-cyan-500",
						},
						{
							title: "Brand Identity & Digital DNA",
							description:
								"Your brand's essence encoded into every pixel, every interaction, every moment of connection.",
							icon: "🧬",
							color: "from-purple-500 to-pink-500",
						},
						{
							title: "Web Development & Reality Platforms",
							description:
								"Building the infrastructure for the new digital society, where humans and technology merge seamlessly.",
							icon: "⚡",
							color: "from-orange-500 to-red-500",
						},
						{
							title: "VR/AR Environments",
							description:
								"Designing the bridges between worlds, where physical and digital realities converge.",
							icon: "🔮",
							color: "from-green-500 to-teal-500",
						},
						{
							title: "Strategic Consultation",
							description:
								"Navigating the quantum shifts in technology and consciousness, preparing you for what's next.",
							icon: "🗝️",
							color: "from-indigo-500 to-purple-500",
						},
						{
							title: "Conscious Copywriting",
							description:
								"Words that resonate beyond the surface, connecting with the deeper knowing within your audience.",
							icon: "✨",
							color: "from-pink-500 to-rose-500",
						},
					].map((service, index) => (
						<div
							key={service.title}
							className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							{/* Service icon with gradient */}
							<div
								className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
							>
								{service.icon}
							</div>

							<h3 className="font-russo text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
								{service.title}
							</h3>

							<p className="text-gray-600 leading-relaxed mb-6">
								{service.description}
							</p>

							{/* Hover glow effect */}
							<div
								className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`}
							></div>

							{/* Corner accent */}
							<div className="absolute bottom-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
