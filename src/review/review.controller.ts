import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { TelegramService } from 'src/telegram/telegram.service'
import { ReviewCreateDto } from './dto/review-create.dto'
import { reviewMessages } from './review.messages'
import { Review } from './review.schema'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly telegramService: TelegramService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: ReviewCreateDto): Promise<Review> {
		return this.reviewService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@Post('notify')
	async notify(@Body() dto: ReviewCreateDto): Promise<void> {
		const message =
			`Имя: ${dto.name}\n` +
			`Заголовок: ${dto.title}\n` +
			`Описание: ${dto.description}\n` +
			`Рейтинг: ${dto.rating}\n` +
			`Id продукта: ${dto.productId}\n`

		return this.telegramService.sendMessage(message)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
		const deleteDoc = await this.reviewService.delete(id)
		if (!deleteDoc) {
			throw new HttpException(reviewMessages.REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
	}
	@Get('byProduct/:productId')
	async getByProduct(@Param('id', IdValidationPipe) productId: string): Promise<Review[]> {
		return this.reviewService.findByProductId(productId)
	}
}
