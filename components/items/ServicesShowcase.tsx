"use client";
import { FC, useState } from "react";
import { BiCode, BiPalette, BiVideo, BiCube, BiMobile, BiGlobe } from "react-icons/bi";
import { IoArrowForward, IoCheckmark } from "react-icons/io5";

interface ServiceItem {
	id: string;
	title: string;
	description: string;
	features: string[];
}

const services: ServiceItem[] = [
	{
		id: "immersive-design",
		title: "Immersive Experiences",
		description: "AR/VR applications, 3D environments, and spatial computing solutions that transport users to new realities.",
		features: ["Augmented Reality", "Virtual Reality", "3D Modeling", "Spatial Design"]
	},
	{
		id: "brand-identity",
		title: "Brand Systems",
		description: "Complete visual identity systems that work across all touchpoints and dimensions.",
		features: ["Visual Identity", "Brand Guidelines", "Logo Design", "Typography Systems"]
	},
	{
		id: "web-development",
		title: "Digital Products",
		description: "Modern web applications and platforms built with cutting-edge technology stacks.",
		features: ["Web Applications", "E-commerce", "API Development", "Performance Optimization"]
	},
	{
		id: "motion-design",
		title: "Motion & Animation",
		description: "Dynamic visual storytelling through motion graphics, animations, and video production.",
		features: ["Motion Graphics", "3D Animation", "Video Production", "Interactive Media"]
	}
];

const ServiceCard: FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
	const gradients = [
		"from-blue-500/10 to-purple-500/10",
		"from-pink-500/10 to-orange-500/10", 
		"from-green-500/10 to-teal-500/10",
		"from-purple-500/10 to-pink-500/10"
	];
	
	const borderGradients = [
		"from-blue-500/30 to-purple-500/30",
		"from-pink-500/30 to-orange-500/30",
		"from-green-500/30 to-teal-500/30", 
		"from-purple-500/30 to-pink-500/30"
	];

	return (
		<div className={`group relative p-8 bg-gradient-to-br ${gradients[index]} backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}>
			{/* 3D Floating Number */}
			<div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
				<div className="text-gray-800 font-kodemono text-sm font-bold">
					{String(index + 1).padStart(2, '0')}
				</div>
			</div>
			
			{/* Floating Arrow */}
			<div className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
				<IoArrowForward className="text-gray-700 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300" size={18} />
			</div>
			
			<div className="pt-4">
				<h3 className="font-russo text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
					{service.title}
				</h3>
				
				<p className="font-outfit text-gray-700 text-base mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
					{service.description}
				</p>
				
				<div className="space-y-3">
					{service.features.map((feature, featureIndex) => (
						<div key={featureIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-all duration-300 transform hover:translate-x-2">
							<div className="mr-3 w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
								<IoCheckmark size={12} className="text-white" />
							</div>
							{feature}
						</div>
					))}
				</div>
			</div>
			
			{/* 3D Depth Effect */}
			<div className={`absolute inset-0 bg-gradient-to-br ${borderGradients[index]} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform translate-x-2 translate-y-2`}></div>
		</div>
	);
};

const ServicesShowcase: FC = () => {
	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-gray-50 pt-32 via-white to-gray-100">
			{/* Hero Section */}
			<div className="relative pt-32 pb-20 px-4 lg:px-16 overflow-hidden" data-theme="light">
				{/* 3D Background Elements */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl transform rotate-12 blur-sm"></div>
					<div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl transform -rotate-12 blur-sm"></div>
					<div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl transform rotate-45 blur-sm"></div>
				</div>
				
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="text-center mb-20">
						<h1 className="font-russo text-5xl lg:text-8xl font-bold text-gray-900 mb-8 tracking-tight leading-none drop-shadow-sm">
							WE DESIGN
							<br />
							REALITY
							
						</h1>
						<div className="max-w-2xl mx-auto">
							<p className="font-outfit text-gray-600 text-xl lg:text-2xl mb-8 leading-relaxed">
								We believe the future is in our hands. Together, new worlds will be built for all of us to explore.
							</p>
							<div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50 text-gray-800 font-outfit text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
								What do you want to create?
								<IoArrowForward className="ml-2" size={20} />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mission Statement */}
			<div className="px-4 lg:px-16 py-20 relative" data-theme="light">
				{/* Floating 3D Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-2xl transform rotate-45 animate-pulse"></div>
					<div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-xl transform -rotate-12 animate-pulse delay-1000"></div>
				</div>
				
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500">
							<h2 className="font-russo text-3xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
								We take on projects from brands and people that are making a difference - building the world we want to be created.
							</h2>
						</div>
						<div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-500">
							<h3 className="font-russo text-xl font-bold text-gray-900 mb-6">Our values</h3>
							<div className="space-y-4">
								{[
									"Innovation through collaboration",
									"Quality over quantity",
									"Sustainable digital futures",
									"Human-centered design"
								].map((value, index) => (
									<div key={index} className="flex items-center text-gray-700 font-outfit transform hover:translate-x-2 transition-transform duration-300">
										<div className="mr-4 w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
											<IoCheckmark size={16} className="text-white" />
										</div>
										{value}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Services Grid */}
			<div className="px-4 lg:px-16 py-20 relative overflow-hidden" data-theme="light">
				{/* More 3D Background Elements */}
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-1/4 left-5 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-3xl transform rotate-12 animate-pulse delay-500"></div>
					<div className="absolute bottom-1/3 right-10 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-2xl transform -rotate-45 animate-pulse delay-1500"></div>
				</div>
				
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="text-center mb-16">
						<h2 className="font-russo text-3xl lg:text-5xl font-bold text-gray-900 mb-6 drop-shadow-sm">
							Our Expertise
						</h2>
						<p className="font-outfit text-gray-600 text-xl max-w-3xl mx-auto bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-white/30">
							From concept to reality, we craft experiences that push the boundaries of what's possible.
						</p>
					</div>
					
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{services.map((service, index) => (
							<ServiceCard
								key={service.id}
								service={service}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Portfolio Showcase - Dark Section */}
			<div className="px-4 lg:px-16 py-32 relative overflow-hidden" data-theme="dark">
				{/* Dark 3D Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
				<div className="absolute inset-0 opacity-30">
					<div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
				</div>
				
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="text-center mb-20">
						<h2 className="font-russo text-4xl lg:text-7xl font-bold text-white mb-8 leading-tight">
							PORTFOLIO
							<span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
								SHOWCASE
							</span>
						</h2>
						<p className="font-outfit text-gray-300 text-xl lg:text-2xl max-w-3xl mx-auto bg-white/5 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/10">
							Explore some of our recent work where we've pushed the boundaries of digital reality
						</p>
					</div>

					{/* Portfolio Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
						{[
							{
								title: "Immersive Brand Experience",
								category: "AR/VR Design",
								description: "A fully immersive brand activation that transported users into a digital realm.",
								gradient: "from-blue-500/20 to-purple-600/20"
							},
							{
								title: "Next-Gen E-commerce",
								category: "Web Development", 
								description: "Revolutionary shopping experience with 3D product visualization.",
								gradient: "from-pink-500/20 to-orange-500/20"
							},
							{
								title: "Motion Identity System",
								category: "Brand & Motion",
								description: "Dynamic visual identity that adapts across all digital touchpoints.",
								gradient: "from-green-500/20 to-teal-500/20"
							},
							{
								title: "Spatial Computing App",
								category: "Mobile & AR",
								description: "Pioneering spatial computing application for the next generation.",
								gradient: "from-purple-500/20 to-pink-500/20"
							},
							{
								title: "Interactive Installation",
								category: "Physical + Digital",
								description: "Large-scale interactive installation blending physical and digital worlds.",
								gradient: "from-cyan-500/20 to-blue-500/20"
							},
							{
								title: "AI-Powered Platform",
								category: "Web Platform",
								description: "Intelligent platform that learns and adapts to user behavior.",
								gradient: "from-orange-500/20 to-red-500/20"
							}
						].map((project, index) => (
							<div key={index} className={`group relative bg-gradient-to-br ${project.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105`}>
								{/* 3D Floating Index */}
								<div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
									<span className="text-white font-kodemono text-sm font-bold">
										{String(index + 1).padStart(2, '0')}
									</span>
								</div>
								
								<div className="mb-4">
									<span className="text-gray-400 font-kodemono text-xs uppercase tracking-wide">
										{project.category}
									</span>
								</div>
								
								<h3 className="font-russo text-xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
									{project.title}
								</h3>
								
								<p className="font-outfit text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
									{project.description}
								</p>
								
								{/* Hover Arrow */}
								<div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
									<IoArrowForward className="text-white" size={16} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="px-4 lg:px-16 py-20 relative overflow-hidden" data-theme="dark">
				{/* 3D Background for CTA */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl transform rotate-12 blur-lg animate-pulse"></div>
					<div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl transform -rotate-12 blur-lg animate-pulse delay-1000"></div>
				</div>
				
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h3 className="font-russo text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
						Ready to build something extraordinary?
					</h3>
					<p className="font-outfit text-gray-300 text-xl mb-12 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
						Let's collaborate to create digital experiences that matter. Get in touch and let's discuss your vision.
					</p>
					<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
						<a
							href="mailto:hey@reality-designers.com"
							className="group font-russo px-12 py-4 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-all duration-300 flex items-center rounded-xl shadow-2xl transform hover:-translate-y-1"
						>
							Start a Project
							<IoArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
						</a>
						<a
							href="/story"
							className="font-outfit text-gray-300 hover:text-white transition-colors underline underline-offset-4"
						>
							Learn more about us
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicesShowcase; 