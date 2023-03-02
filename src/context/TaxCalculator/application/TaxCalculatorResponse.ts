import { VehicleType } from "../domain/constants";

export interface TaxCalculatorResponse {
	taxFee: number;
	vehicleType: VehicleType;
	error: string | null;
}
