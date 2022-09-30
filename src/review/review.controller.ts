import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ReviewCreateDto } from './dto/review-create.dto'
import { reviewMessages } from './review.messages'
import { Review } from './review.schema'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: ReviewCreateDto): Promise<Review> {
		return this.reviewService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {
		const deleteDoc = await this.reviewService.delete(id)
		if (!deleteDoc) {
			throw new HttpException(reviewMessages.REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('id') productId: string): Promise<Review[]> {
		return this.reviewService.findByProductId(productId)
	}
}
