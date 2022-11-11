import { Injectable } from '@nestjs/common'
import * as sharp from 'sharp'

@Injectable()
export class FileConverterService {
	async convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer()
	}
}
