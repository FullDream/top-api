export const enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Goods,
}

export class TopPageModel {
	id: string
	firstCategory: TopLevelCategory
	secondCategory: string
	title: string
	category: string
	hh?: { count: number; juniorSalary: number; middleSalary: number; seniorSalary: number }
	advantages: { title: string; description: string }[]
	seoText: string
	tagsTitle: string
	tags: string[]
}
