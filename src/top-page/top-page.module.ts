import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HhModule } from 'src/hh/hh.module'
import { TopPageController } from './top-page.controller'
import { TopPage, TopPageSchema } from './top-page.schema'
import { TopPageService } from './top-page.service'

@Module({
	imports: [MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]), HhModule],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
