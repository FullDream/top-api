export class ProductModel {
	id: number
	image: string
	title: string
	price: number
	oldPrice: number
	credit: number
	calculatedRating: number
	description: string
	advantages: string
	disAdvantages: string
	categories: string[]
	tags: string[]
	characteristics: {
		[key: string]: string
	}
}
