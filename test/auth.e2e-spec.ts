import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { ReviewCreateDto } from 'src/review/dto/review-create.dto'
import { disconnect, Types } from 'mongoose'
import { AuthDto } from 'src/auth/dto/auth.dto'

const loginDto: AuthDto = {
	login: 'pavel@pac',
	password: 'pav',
}

describe('AuthController (e2e)', () => {
	let app: INestApplication
	let createdId: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/auth/login (POST) - success', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined()
				done()
			})
	})

	it('/auth/login (POST) - fail password', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send({ ...loginDto, password: 2 })
			.expect(401, {
				statusCode: 401,
				message: 'Неверный пароль',
				error: 'Unauthorized',
			})
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined()
				done()
			})
	})

	it('/auth/login (POST) - fail login', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send({ ...loginDto, login: 'dsd' })
			.expect(401, {
				statusCode: 401,
				message: 'Пользователь не найден',
				error: 'Unauthorized',
			})
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined()
				done()
			})
	})

	afterAll(() => {
		disconnect()
	})
})
