import taxesPriceRules from "../../../../data/taxes.json";

import { AvailableTaxPriceRules } from "../domain/TaxRules";
import { TaxRulesRepository } from "../domain/TaxRulesRepository";

export class InMemoryTaxRepository implements TaxRulesRepository {
	search(): AvailableTaxPriceRules {
		return taxesPriceRules;
	}
}
