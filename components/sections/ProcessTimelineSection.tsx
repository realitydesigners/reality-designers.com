export default function ProcessTimelineSection() {
	return (
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
	);
} 