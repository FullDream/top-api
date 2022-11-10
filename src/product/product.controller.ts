import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDto } from './dto/find-product.dto'
import { ProductErrors } from './product.constants'
import { Product, ProductDocument } from './product.schema'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto): Promise<ProductDocument> {
		return this.productService.create(dto)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const product = this.productService.findById(id)
		if (!product) {
			throw new NotFoundException(ProductErrors.PRODUCT_NOT_FOUND)
		}
		return product
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedProduct = this.productService.deleteById(id)
		if (!deletedProduct) {
			throw new NotFoundException(ProductErrors.PRODUCT_NOT_FOUND)
		}
		return deletedProduct
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: Product) {
		const updatedProduct = this.productService.updateById(id, dto)
		if (!updatedProduct) {
			throw new NotFoundException(ProductErrors.PRODUCT_NOT_FOUND)
		}
		return updatedProduct
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReview(dto)
	}
}
