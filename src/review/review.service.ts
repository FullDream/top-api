import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Review, ReviewDocument } from './review.schema'

@Injectable()
export class ReviewService {
	constructor(@InjectModel(Review.name) private ReviewModel: Model<ReviewDocument>) {}
}
