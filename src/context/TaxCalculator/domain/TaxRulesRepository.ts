import { AvailableTaxPriceRules } from "./TaxRules";

export interface TaxRulesRepository {
	search(): AvailableTaxPriceRules;
}
