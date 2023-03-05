import { VehicleTypes } from "../../shared/domain/VehicleType";

export interface TaxCalculatorResponse {
	taxFee: number;
	vehicleType: VehicleTypes;
}
