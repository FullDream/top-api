import { NotFoundException } from '@nestjs/common'

export const isResultFromDb = <T>(req: any, errorMessage: string): Promise<T | null> => {
	const page = req()

	if (!page) {
		throw new NotFoundException(errorMessage)
	}

	return page
}
