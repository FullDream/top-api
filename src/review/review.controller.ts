import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Review } from './review.schema'

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: Omit<Review, 'id'>) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Get('byProduct/:productId')
	async getByProduct(@Param('id') id: string) {}
}
