import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Goods,
}

class HhData {
	@Prop()
	count: number

	@Prop()
	juniorSalary: number

	@Prop()
	middleSalary: number

	@Prop()
	seniorSalary: number
}

class TopPageAdvantage {
	title: string
	description: string
}

@Schema({ timestamps: true, id: true })
export class TopPage {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory

	@Prop()
	secondCategory: string

	@Prop({ unique: true })
	alias: string

	@Prop()
	title: string

	@Prop()
	category: string

	@Prop(HhData)
	hh?: HhData

	@Prop([TopPageAdvantage])
	advantages: TopPageAdvantage[]

	@Prop()
	seoText: string

	@Prop()
	tagsTitle: string

	@Prop([String])
	tags: string[]
}

const TopPageSchema = SchemaFactory.createForClass(TopPage)

TopPageSchema.index({ '$**': 'text' })

export { TopPageSchema }

export type TopPageDocument = TopPage & Document
