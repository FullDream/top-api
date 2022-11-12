import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { addDays } from 'date-fns'
import { Model } from 'mongoose'
import { CreateTopPageDto } from './dto/create-top-page.dto'
import { TopLevelCategory, TopPage, TopPageDocument } from './top-page.schema'

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPage.name) private readonly topPageModel: Model<TopPageDocument>) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto)
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec()
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec()
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } },
			})
			.exec()
	}

	async findByText(text: string) {
		return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec()
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec()
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findForHhUpdate(date: Date) {
		return this.topPageModel
			.find({
				firstCategory: 0,
				$or: [
					{
						'hh.updatedAt': { $lt: addDays(date, -1) },
					},
					{ 'hh.updatedAt': { $exists: false } },
				],
			})
			.exec()
	}
}
