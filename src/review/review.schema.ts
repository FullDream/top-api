import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ReviewDocument = Review & Document
@Schema({ id: true, timestamps: true })
export class Review {
	@Prop()
	name: string

	@Prop()
	title: string

	@Prop()
	description: string

	@Prop()
	rating: number

	@Prop()
	createdAt: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)