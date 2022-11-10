import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	NotFoundException,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { CreateTopPageDto } from './dto/create-top-page.dto'
import { FindTopPageDto } from './dto/find-top-page.dto'
import { TopPageErrors } from './top-page.constants'
import { TopPageService } from './top-page.service'

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id)

		if (!page) {
			throw new NotFoundException(TopPageErrors.PAGE_NOT_FOUND)
		}

		return page
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedPage = await this.topPageService.deleteById(id)

		if (!deletedPage) {
			throw new NotFoundException(TopPageErrors.PAGE_NOT_FOUND)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto)

		if (!updatedPage) {
			throw new NotFoundException(TopPageErrors.PAGE_NOT_FOUND)
		}
		return updatedPage
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const pageByAlias = await this.topPageService.findByAlias(alias)

		if (!pageByAlias) {
			throw new NotFoundException(TopPageErrors.PAGE_NOT_FOUND)
		}

		return pageByAlias
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory)
	}
}
