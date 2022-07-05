import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TopPageController } from './top-page.controller'
import { TopPage, TopPageSchema } from './top-page.schema'

@Module({
	controllers: [TopPageController],
	imports: [MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }])],
})
export class TopPageModule {}
