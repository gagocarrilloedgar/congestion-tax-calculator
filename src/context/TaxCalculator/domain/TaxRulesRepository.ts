import { TaxRules } from "./TaxRules";

export interface TaxRulesRepository {
	search(city: string): Promise<TaxRules>;
}
