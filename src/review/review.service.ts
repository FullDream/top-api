import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ReviewCreateDto } from './dto/review-create.dto'
import { Review, ReviewDocument } from './review.schema'

@Injectable()
export class ReviewService {
	constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

	public async create(dto: ReviewCreateDto): Promise<Review> {
		return this.reviewModel.create(dto)
	}

	public async delete(id: string): Promise<Review | null> {
		return this.reviewModel.findByIdAndDelete(id).exec()
	}

	public async findByProductId(productId: string): Promise<Review[]> {
		return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec()
	}

	public async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec()
	}
}
