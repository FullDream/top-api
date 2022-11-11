import { Module } from '@nestjs/common'
import { FileConverterService } from './file-converter.service'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
	controllers: [FilesController],
	providers: [FilesService, FileConverterService],
})
export class FilesModule {}
