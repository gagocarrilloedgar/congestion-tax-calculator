import taxesPriceRules from "../../../../data/taxes.json";

import AppError from "../../shared/domain/AppError";

import { TaxRules } from "../domain/TaxRules";
import { TaxRulesRepository } from "../domain/TaxRulesRepository";

export class InMemoryTaxRepository implements TaxRulesRepository {
	async search(city: string) {
		const typedTaxRules = taxesPriceRules as Record<string, TaxRules>;

		const isCityAvailable = Object.keys(taxesPriceRules).includes(city);

		if (!isCityAvailable) throw new AppError(`TaxRule with  cityKey: ${city} not found`, 400);

		return Promise.resolve(typedTaxRules[city]);
	}
}
