export default function CallToActionSection() {
	return (
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
					The scattered souls are gathering. The light is growing stronger. Your
					transformation begins with a single decision to step into the new
					reality we're all creating together.
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
	);
}
