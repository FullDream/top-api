import { ConfigService } from '@nestjs/config'
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose'

type GetMongoConfig = (configService: ConfigService) => Promise<MongooseModuleFactoryOptions>

export const getMongoConfig: GetMongoConfig = async (configService: ConfigService) => ({
	uri: getMongoString(configService),
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const getMongoString = (configService: ConfigService): string =>
	'mongodb://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_HOST') +
	':' +
	configService.get('MONGO_PORT') +
	'/' +
	configService.get('MONGO_AUTH_DB')
