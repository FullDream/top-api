import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthDto } from './dto/auth.dto'
import { User, UserDocument } from './user.schema'
import { genSalt, hash, compare } from 'bcrypt'
import { authMessages } from './auth.messages'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	public async create(dto: AuthDto) {
		const salt = await genSalt(10)
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: hash(dto.password, salt),
		})
		return newUser.save()
	}

	public async find(email: string) {
		return this.userModel.findOne({ email }).exec()
	}
	public async validateUser(email: string, password: string): Promise<{ email: string }> {
		const user = await this.find(email)
		if (!user) throw new UnauthorizedException(authMessages.USER_NOT_FOUND)

		const isCorrectPassword = await compare(password, user.passwordHash)
		if (!isCorrectPassword) throw new UnauthorizedException(authMessages.WRONG_PASSWORD)

		return { email: user.email }
	}

	public async login(email: string): Promise<{ access_token: string }> {
		const payload = { email }
		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}
}
