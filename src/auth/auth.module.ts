import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller'
import { User, UserSchema } from './user.schema'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from 'src/configs/jwt.config'

@Module({
	controllers: [AuthController],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [AuthService],
})
export class AuthModule {}
