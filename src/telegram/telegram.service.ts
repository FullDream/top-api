import { Injectable, Inject } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants'
import { TelegramOptions } from './telegram.interface'

@Injectable()
export class TelegramService {
	bot: Telegraf

	constructor(@Inject(TELEGRAM_MODULE_OPTIONS) private readonly options: TelegramOptions) {
		this.bot = new Telegraf(options.token)
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message)
	}
}
