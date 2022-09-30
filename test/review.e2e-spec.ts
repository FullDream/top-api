import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { ReviewCreateDto } from 'src/review/dto/review-create.dto'
import { Types } from 'mongoose'

const productId = new Types.ObjectId().toHexString()

const testDto: ReviewCreateDto = {
	name: 'тест',
	title: 'Заголовок',
	description: 'тестим описание',
	rating: 5,
	productId,
}

describe('AppController (e2e)', () => {
	let app: INestApplication
	let createdId: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/review/create (POST)', async (done) => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body.id
				expect(createdId).toBeDefined()
				done()
			})
	})
})
