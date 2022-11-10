import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ReviewDocument } from 'src/review/review.schema'
import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDto } from './dto/find-product.dto'
import { Product, ProductDocument } from './product.schema'

@Injectable()
export class ProductService {
	constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto)
	}
	async findById(id: string) {
		return this.productModel.findById(id).exec()
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec()
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findWithReview(dto: FindProductDto) {
		return (await this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'Review',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews;
							}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec()) as (ProductDocument & {
			review: ReviewDocument[]
			reviewCount: number
			reviewAvg: number
		})[]
	}
}
