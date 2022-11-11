import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TelegramModule } from 'src/telegram/telegram.module'
import { ReviewController } from './review.controller'
import { Review, ReviewSchema } from './review.schema'
import { ReviewService } from './review.service'

@Module({
	controllers: [ReviewController],
	imports: [
		MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
		TelegramModule,
	],

	providers: [ReviewService],
})
export class ReviewModule {}
