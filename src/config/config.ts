// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	srcDark: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: 'PromptMarketing | Operationalizing Machine Trust',
	siteDescription:
		'Empower your brand through Relevance Engineering. We architect the knowledge layers that ensure brands are understood, trusted, and successfully represented by AI systems.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo-black.png',
		srcDark: '/logo-white.png',
		alt: 'PromptMarketing logo'
	},
	canonical: true,
	noindex: false,
	mode: 'dark',
	scrollAnimations: true
}
