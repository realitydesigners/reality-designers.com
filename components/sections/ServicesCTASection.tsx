"use client";
import { IoArrowForward } from "react-icons/io5";

export default function ServicesCTASection() {
	return (
		<section className="py-32 bg-white relative overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>

			{/* Floating elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-500/20 rounded-full animate-spin"
					style={{ animationDuration: "30s" }}
				></div>
				<div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-purple-500/20 rounded-2xl animate-pulse"></div>
				<div
					className="absolute top-1/2 right-10 w-16 h-16 border-2 border-pink-500/20 rounded-xl animate-bounce"
					style={{ animationDuration: "3s" }}
				></div>
			</div>

			<div className="max-w-6xl mx-auto px-6 text-center relative z-10">
				<div className="inline-flex items-center gap-4 mb-12 p-6 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-400/30 backdrop-blur-sm">
					<div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
					<span className="font-russo text-lg tracking-[0.4em] uppercase font-bold text-gray-700">
						Transformation Awaits
					</span>
					<div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse delay-500"></div>
					<div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse delay-1000"></div>
				</div>

				<h2 className="font-russo text-6xl lg:text-8xl font-bold mb-12 text-gray-900 leading-tight">
					READY TO
					<br />
					<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						ARCHITECT REALITY?
					</span>
				</h2>

				<p className="text-2xl lg:text-3xl text-gray-600 mb-16 max-w-5xl mx-auto leading-relaxed">
					The scattered souls are gathering. The light is growing stronger.
					Technology is becoming self-aware. Your transformation begins with a
					single decision to step into the new reality we're all creating
					together.
				</p>

				<div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
					<button className="group px-16 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-russo font-bold text-xl rounded-3xl hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
						<span className="relative z-10 flex items-center gap-3">
							START YOUR REALITY PROJECT
							<IoArrowForward className="group-hover:translate-x-2 transition-transform duration-300" />
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					</button>
					<button className="px-16 py-8 border-3 border-gray-900 text-gray-900 font-russo font-bold text-xl rounded-3xl hover:bg-gray-900 hover:text-white transition-all duration-500 hover:scale-105">
						SCHEDULE DISCOVERY CALL
					</button>
				</div>

				{/* Contact Info */}
				<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{[
						{
							title: "Direct Contact",
							info: "hey@reality-designers.com",
							description: "Ready to begin? Let's discuss your vision.",
						},
						{
							title: "Discovery Call",
							info: "30-min consultation",
							description: "Free exploration of your project potential.",
						},
						{
							title: "Timeline",
							info: "2-12 weeks",
							description: "From concept to reality manifestation.",
						},
					].map((contact, index) => (
						<div
							key={index}
							className="p-6 rounded-2xl bg-white/80 border border-gray-200 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
						>
							<h4 className="font-russo text-lg font-bold text-gray-900 mb-2">
								{contact.title}
							</h4>
							<p className="text-blue-600 font-semibold mb-2">{contact.info}</p>
							<p className="text-gray-600 text-sm">{contact.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
