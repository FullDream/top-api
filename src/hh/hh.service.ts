import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { HhData } from 'src/top-page/top-page.schema'
import { API_URL_HH, HhErrors, SALARY_CLUSTER_ID } from './hh.constants'
import { HhResponse } from './hh.model'

@Injectable()
export class HhService {
	private token: string
	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
	) {
		this.token = this.configService.get('HH_TOKEN') ?? ''
	}

	async getData(text: string) {
		try {
			const { data } = await lastValueFrom(
				this.httpService.get<HhResponse>(API_URL_HH.vacancies, {
					params: { text, clusters: true },
					headers: {
						'User-Agent': 'TopApi/1.0 (pavel@example.com)',
						Authorization: `Bearer ${this.token}`,
					},
				}),
			)

			return this.parseDate(data)
		} catch (error) {
			Logger.error(error)
		}
	}

	private parseDate(data: HhResponse): HhData {
		const salaryCluster = data.clusters.find(({ id }) => id == SALARY_CLUSTER_ID)
		if (!salaryCluster) {
			throw new Error(HhErrors.CLUSTER_NOT_FOUND)
		}

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name)
		const middleSalary = this.getSalaryFromString(
			salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
		)
		const seniorSalary = this.getSalaryFromString(
			salaryCluster.items[salaryCluster.items.length - 1].name,
		)

		return {
			count: data.found,
			juniorSalary,
			middleSalary,
			seniorSalary,
			updatedAt: new Date(),
		}
	}

	private getSalaryFromString(value: string): number {
		const numberRegExp = /(\d+)/g
		const res = value.match(numberRegExp)
		if (!res) {
			return 0
		}

		return Number(res[0])
	}
}
