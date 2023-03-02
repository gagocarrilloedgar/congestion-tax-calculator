import { VehicleTypes } from "../../Shared/domain/VehicleType";

export interface TaxCalculatorResponse {
	taxFee: number;
	vehicleType: VehicleTypes;
	error: string | null;
}
