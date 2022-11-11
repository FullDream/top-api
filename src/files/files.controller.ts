import {
	Controller,
	HttpCode,
	Post,
	UseInterceptors,
	UseGuards,
	UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { FileElementResponse } from './dto/file-element.response'
import { FileConverterService } from './file-converter.service'
import { FilesService } from './files.service'
import { MFile } from './mFile.class'

@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService,
		private readonly fileConverterService: FileConverterService,
	) {}

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)]
		if (file.mimetype.includes('image')) {
			const buffer = await this.fileConverterService.convertToWebP(file.buffer)
			saveArray.push(
				new MFile({
					originalname: `${file.originalname.split('.')[0]}.webp`,
					buffer,
				}),
			)
		}
		return this.filesService.saveFiles(saveArray)
	}
}
