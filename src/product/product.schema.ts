import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

class ProductCharacteristic {
	@Prop()
	name: string

	@Prop()
	value: string
}

@Schema({ timestamps: true, id: true })
export class Product {
	@Prop()
	image: string

	@Prop()
	title: string

	@Prop()
	price: number

	@Prop()
	oldPrice?: number

	@Prop()
	credit: number

	@Prop()
	description: string

	@Prop()
	advantages: string

	@Prop()
	disAdvantages: string

	@Prop([String])
	categories: string[]

	@Prop([String])
	tags: string[]

	@Prop([ProductCharacteristic])
	characteristics: ProductCharacteristic[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
