export const floatingCards = [
	{
		id: 1,
		status: "ACTIVE",
		message: "Web Development",
		color: "emerald",
		desktopPosition: { top: "20%", right: "35%" },
		mobilePosition: { top: "65%", right: "8%" },
		delay: 0,
	},
	{
		id: 2,
		status: "LIVE",
		message: "3D Design",
		color: "purple",
		desktopPosition: { top: "70%", right: "40%" },
		mobilePosition: { top: "20%", left: "10%" },
		delay: 200,
	},
	{
		id: 3,
		status: "BUILDING",
		message: "Brand Identity",
		color: "blue",
		desktopPosition: { top: "50%", right: "45%" },
		mobilePosition: { top: "25%", right: "10%" },
		delay: 400,
	},
	{
		id: 4,
		status: "CREATING",
		message: "UI/UX Design",
		color: "pink",
		desktopPosition: { top: "85%", right: "5%" },
		mobilePosition: { top: "55%", left: "5%" },
		delay: 600,
	},
	{
		id: 5,
		status: "SHIPPING",
		message: "Prototyping",
		color: "amber",
		desktopPosition: { top: "30%", right: "2%" },
		mobilePosition: { top: "80%", right: "8%" },
		delay: 800,
	},
	{
		id: 6,
		status: "DESIGNING",
		message: "Motion Graphics",
		color: "violet",
		desktopPosition: { top: "70%", right: "8%" },
		mobilePosition: { top: "80%", left: "15%" },
		delay: 1000,
	},
];

export const Links = [
    {
        href: "/story",
        label: "Story",
        icon: "story",
        dropdown: {
            title: "Our Journey",
            description:
                "Discover how Reality Designers is shaping the future of immersive experiences.",
            spline: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
            links: [
                {
                    href: "/story",
                    label: "About Us",
                    description: "Learn about our mission and vision",
                },
                {
                    href: "/story/team",
                    label: "Meet the Team",
                    description: "The minds behind Reality Designers",
                },
                {
                    href: "/story/history",
                    label: "Our History",
                    description: "From concept to reality",
                },
                {
                    href: "/story/culture",
                    label: "Company Culture",
                    description: "What drives us forward",
                },
            ],
        },
    },
    {
        href: "/services",
        label: "Services",
        icon: "video",
        dropdown: {
            title: "Design Reality",
            description:
                "Transform your ideas into immersive digital experiences that captivate and inspire.",
            spline: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
            links: [
                {
                    href: "/services/immersive",
                    label: "Immersive Design",
                    description: "VR, AR & Mixed Reality experiences",
                },
                {
                    href: "/services/branding",
                    label: "Brand Identity",
                    description: "Complete visual identity systems",
                },
                {
                    href: "/services/web",
                    label: "Web Development",
                    description: "Next-gen websites and applications",
                },
                {
                    href: "/services/motion",
                    label: "Motion Graphics",
                    description: "Dynamic animations and videos",
                },
                {
                    href: "/services/mobile",
                    label: "Mobile Apps",
                    description: "iOS and Android applications",
                },
                {
                    href: "/services/strategy",
                    label: "Digital Strategy",
                    description: "Comprehensive digital transformation",
                },
            ],
        },
    },
    {
        href: "https://www.youtube.com/@realitydesigners",
        label: "Videos",
        icon: "video",
        dropdown: {
            title: "Visual Stories",
            description:
                "Explore our latest projects, tutorials, and behind-the-scenes content.",
            spline: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
            links: [
                {
                    href: "/videos/showcase",
                    label: "Project Showcase",
                    description: "Our best work in action",
                },
                {
                    href: "/videos/tutorials",
                    label: "Tutorials",
                    description: "Learn design techniques",
                },
                {
                    href: "/videos/behind-scenes",
                    label: "Behind the Scenes",
                    description: "Our creative process",
                },
                {
                    href: "https://www.youtube.com/@realitydesigners",
                    label: "YouTube Channel",
                    description: "Subscribe for more content",
                },
            ],
        },
    },
    {
        href: "#",
        label: "Library",
        icon: "lock",
        dropdown: {
            title: "Knowledge Base",
            description:
                "Access our collection of resources, templates, and design assets.",
            spline: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
            links: [
                {
                    href: "/library/resources",
                    label: "Design Resources",
                    description: "Free templates and assets",
                },
                {
                    href: "/library/documentation",
                    label: "Documentation",
                    description: "Guides and best practices",
                },
                {
                    href: "/library/case-studies",
                    label: "Case Studies",
                    description: "In-depth project analysis",
                },
                {
                    href: "/library/blog",
                    label: "Blog",
                    description: "Latest insights and trends",
                },
            ],
        },
    },
    {
        href: "/lab",
        label: "Lab",
        icon: "video",
        dropdown: {
            title: "Innovation Lab",
            description:
                "Experimental projects and cutting-edge technology explorations.",
            spline: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
            links: [
                {
                    href: "/lab/experiments",
                    label: "Experiments",
                    description: "Latest tech explorations",
                },
                {
                    href: "/lab/prototypes",
                    label: "Prototypes",
                    description: "Work-in-progress projects",
                },
                {
                    href: "/lab/research",
                    label: "Research",
                    description: "Industry insights and studies",
                },
                {
                    href: "/lab/open-source",
                    label: "Open Source",
                    description: "Community contributions",
                },
            ],
        },
    },
    {
        href: "#",
        label: "Contact",
        icon: "lock",
        dropdown: {
            title: "Get in Touch",
            description:
                "Ready to bring your vision to life? Let's start a conversation.",
            spline: "https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode",
            links: [
                {
                    href: "/contact",
                    label: "Start a Project",
                    description: "Begin your journey with us",
                },
                {
                    href: "/contact/support",
                    label: "Support",
                    description: "Get help with existing projects",
                },
                {
                    href: "/contact/careers",
                    label: "Careers",
                    description: "Join our team",
                },
                {
                    href: "/contact/partnerships",
                    label: "Partnerships",
                    description: "Collaborate with us",
                },
            ],
        },
    },
];