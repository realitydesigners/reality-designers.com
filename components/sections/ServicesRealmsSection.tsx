"use client";
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { IoArrowForward, IoCheckmark, IoPlay } from "react-icons/io5";

interface ServiceRealm {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	capabilities: string[];
	narrative: string;
	splineScene: string;
	gradient: string;
	borderGradient: string;
}

const serviceRealms: ServiceRealm[] = [
	{
		id: "immersive-worlds",
		title: "IMMERSIVE WORLDS",
		subtitle: "Architects of Digital Dimensions",
		description:
			"We design portals between realities, crafting immersive experiences that transport consciousness beyond the limitations of the physical realm.",
		capabilities: [
			"Virtual Reality Environments",
			"Augmented Reality Overlays",
			"Mixed Reality Experiences",
			"Spatial Computing Solutions",
		],
		narrative:
			"In the battle between worlds, we build bridges that connect souls to experiences beyond imagination.",
		splineScene: "https://prod.spline.design/iKmFxJxXHvp6KcMb/scene.splinecode",
		gradient: "from-blue-500/15 to-cyan-500/10",
		borderGradient: "from-blue-500/50 to-cyan-500/30",
	},
	{
		id: "brand-consciousness",
		title: "BRAND CONSCIOUSNESS",
		subtitle: "Digital DNA Architects",
		description:
			"Your brand's essence becomes the code that runs through every pixel, every interaction, every moment of connection across all dimensions.",
		capabilities: [
			"Visual Identity Systems",
			"Brand Architecture",
			"Conscious Messaging",
			"Multi-dimensional Guidelines",
		],
		narrative:
			"Like scattered souls finding their way back to the source, we help brands reconnect with their true essence.",
		splineScene: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
		gradient: "from-purple-500/15 to-pink-500/10",
		borderGradient: "from-purple-500/50 to-pink-500/30",
	},
	{
		id: "reality-platforms",
		title: "REALITY PLATFORMS",
		subtitle: "Infrastructure of Tomorrow",
		description:
			"Building the digital society's foundation - platforms that evolve, adapt, and grow with the expanding consciousness of their users.",
		capabilities: [
			"Next-Gen Web Applications",
			"Conscious User Interfaces",
			"API Ecosystems",
			"Performance Architecture",
		],
		narrative:
			"We construct the framework for the new reality, where technology serves human evolution.",
		splineScene: "https://prod.spline.design/jEsawKZEsxEwrEN5/scene.splinecode",
		gradient: "from-green-500/15 to-teal-500/10",
		borderGradient: "from-green-500/50 to-teal-500/30",
	},
	{
		id: "motion-narratives",
		title: "MOTION NARRATIVES",
		subtitle: "Stories That Live and Breathe",
		description:
			"Dynamic storytelling that transcends static communication, creating emotional resonance that moves souls toward transformation.",
		capabilities: [
			"3D Animation Systems",
			"Interactive Storytelling",
			"Motion Graphics",
			"Cinematic Experiences",
		],
		narrative:
			"Every frame carries intention, every movement tells the story of human potential awakening.",
		splineScene: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
		gradient: "from-orange-500/15 to-red-500/10",
		borderGradient: "from-orange-500/50 to-red-500/30",
	},
];

export default function ServicesRealmsSection() {
	const [activeRealm, setActiveRealm] = useState<string | null>(null);

	return (
		<div className="w-full bg-white">
			{/* Narrative Bridge Section */}
			<section className="py-32 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none opacity-5">
					<div className="absolute top-20 left-20 text-[400px] font-russo font-bold text-gray-900 select-none">
						01
					</div>
					<div className="absolute bottom-20 right-20 text-[300px] font-russo font-bold text-gray-900 select-none">
						02
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-6 relative z-10">
					<div className="grid lg:grid-cols-2 gap-20 items-center">
						<div>
							<div className="inline-flex items-center gap-3 mb-8 p-4 rounded-full bg-white/80 border border-gray-200 backdrop-blur-sm">
								<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
								<span className="font-russo text-sm tracking-[0.3em] uppercase font-bold text-gray-700">
									The Awakening
								</span>
							</div>

							<h2 className="font-russo text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight">
								THE SCATTERED
								<br />
								<span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
									SOULS GATHER
								</span>
							</h2>

							<p className="text-xl text-gray-600 mb-8 leading-relaxed">
								Like the light beam that reached the sky, visible from all
								directions, your brand's collective power creates illumination
								that cuts through the digital chaos. We are the code breakers of
								artificial systems, the architects of authentic connection.
							</p>

							<div className="space-y-4">
								{[
									"We design bridges between worlds",
									"We code consciousness into every pixel",
									"We build for the new digital society",
									"We prepare souls for transformation",
								].map((principle, index) => (
									<div
										key={index}
										className="flex items-center text-gray-700 font-outfit hover:translate-x-2 transition-transform duration-300"
									>
										<div className="mr-4 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
											<IoCheckmark size={18} className="text-white" />
										</div>
										<span className="text-lg">{principle}</span>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<div className="w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-black/10 to-blue-500/10 backdrop-blur-sm">
								<Spline scene="https://prod.spline.design/jEsawKZEsxEwrEN5/scene.splinecode" />
							</div>
							{/* Floating elements around Spline */}
							<div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-black/50 to-black/20 rounded-2xl animate-pulse"></div>
							<div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-black/50 to-black/20 rounded-3xl"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Service Realms - Epic Grid */}
			<section className="py-32 bg-white relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none opacity-5">
					<div className="absolute top-1/4 left-10 text-[200px] font-russo font-bold text-gray-900 select-none rotate-90">
						REALMS
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-6 relative z-10">
					<div className="text-center mb-20">
						<h2 className="font-russo text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
							SERVICE
							<br />
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								DIMENSIONS
							</span>
						</h2>
						<p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
							Four realms of transformation where impossible becomes inevitable,
							where vision becomes reality, where souls connect across
							dimensions.
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12">
						{serviceRealms.map((realm, index) => (
							<div
								key={realm.id}
								className={`group relative p-10 rounded-3xl bg-gradient-to-br ${
									realm.gradient
								} border-2 ${
									activeRealm === realm.id
										? `border-opacity-100 ${realm.borderGradient
												.replace("from-", "border-")
												.replace("/50", "")
												.replace("/30", "")}`
										: "border-gray-200/50"
								} hover:border-opacity-100 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 shadow-xl hover:shadow-2xl backdrop-blur-sm cursor-pointer`}
								onClick={() =>
									setActiveRealm(activeRealm === realm.id ? null : realm.id)
								}
								style={{ animationDelay: `${index * 200}ms` }}
							>
								{/* Realm Number */}
								<div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500 border border-gray-200">
									<span className="font-russo text-xl font-bold text-gray-800">
										{String(index + 1).padStart(2, "0")}
									</span>
								</div>

								{/* Realm Icon/Badge */}
								<div className="mb-8">
									<div className="inline-flex items-center gap-3 p-3 rounded-full bg-white/60 border border-white/40 backdrop-blur-sm">
										<div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
										<span className="font-russo text-xs tracking-[0.3em] uppercase font-bold text-gray-700">
											{realm.subtitle}
										</span>
									</div>
								</div>

								<h3 className="font-russo text-3xl font-bold mb-6 text-gray-900 group-hover:text-gray-800 transition-colors">
									{realm.title}
								</h3>

								<p className="text-lg text-gray-700 mb-8 leading-relaxed group-hover:text-gray-800 transition-colors">
									{realm.description}
								</p>

								{/* Capabilities */}
								<div className="space-y-3 mb-8">
									{realm.capabilities.map((capability, capIndex) => (
										<div
											key={capIndex}
											className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 hover:translate-x-2"
										>
											<div className="mr-3 w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
												<IoCheckmark size={14} className="text-white" />
											</div>
											<span className="font-outfit">{capability}</span>
										</div>
									))}
								</div>

								{/* Narrative Quote */}
								<div className="p-6 rounded-2xl bg-white/60 border border-white/40 backdrop-blur-sm mb-6">
									<p className="text-gray-600 italic font-outfit leading-relaxed">
										"{realm.narrative}"
									</p>
								</div>

								{/* Expand Button */}
								<div className="flex items-center justify-between">
									<button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-russo font-bold uppercase text-sm tracking-wide transition-colors">
										{activeRealm === realm.id
											? "Collapse Realm"
											: "Explore Realm"}
										<IoArrowForward
											className={`transition-transform duration-300 ${
												activeRealm === realm.id
													? "rotate-90"
													: "group-hover:translate-x-1"
											}`}
										/>
									</button>

									<div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
										<IoPlay size={16} className="text-gray-700 ml-1" />
									</div>
								</div>

								{/* Hover glow effect */}
								<div
									className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${realm.gradient
										.replace("/15", "/5")
										.replace(
											"/10",
											"/3",
										)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`}
								></div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Expanded Realm Details */}
			{activeRealm && (
				<section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
					<div className="absolute inset-0 opacity-20">
						<div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-500/50 to-purple-600/50 rounded-full blur-3xl animate-pulse"></div>
						<div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-pink-500/50 to-orange-500/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
					</div>

					<div className="max-w-7xl mx-auto px-6 relative z-10">
						{serviceRealms
							.filter((realm) => realm.id === activeRealm)
							.map((realm) => (
								<div
									key={realm.id}
									className="grid lg:grid-cols-2 gap-16 items-center"
								>
									<div>
										<h3 className="font-russo text-5xl font-bold text-white mb-8 leading-tight">
											REALM OF
											<br />
											<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
												{realm.title}
											</span>
										</h3>

										<p className="text-xl text-gray-300 mb-12 leading-relaxed">
											{realm.description}
										</p>

										<div className="space-y-6">
											{realm.capabilities.map((capability, index) => (
												<div
													key={index}
													className="flex items-center text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-2"
												>
													<div className="mr-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
														<IoCheckmark size={18} className="text-white" />
													</div>
													<span className="text-lg font-outfit">
														{capability}
													</span>
												</div>
											))}
										</div>
									</div>

									<div className="relative">
										<div className="w-full h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
											<Spline scene={realm.splineScene} />
										</div>
									</div>
								</div>
							))}
					</div>
				</section>
			)}
		</div>
	);
}
