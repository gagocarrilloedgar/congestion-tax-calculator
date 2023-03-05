import httpStatus from "http-status";
import request from "supertest";

import app from "../../../src/app";
import { mockData } from "../../fixtures/mockData";

const { firstUseCase } = mockData;

describe("POST /api/tax-calculator", () => {
	it("Should return 200 OK", async () => {
		await request(app)
			.post("/api/tax-calculator")
			.send({
				vehicleType: "Car",
				city: "Gothenburg",
				dates: firstUseCase,
				holidayCalendar: "Swedish"
			})
			.expect(httpStatus.OK)
			.expect("Content-Type", /json/)
			.expect({
				taxFee: 76,
				vehicleType: "Car"
			});
	});

	it("Should return 400 Bad Request if type is not included", async () => {
		try {
			await request(app)
				.post("/api/tax-calculator")
				.send({
					vehicleType: "",
					city: "Gothenburg",
					dates: firstUseCase,
					holidayCalendar: "Swedish"
				})
				.expect(httpStatus.UNSUPPORTED_MEDIA_TYPE);
		} catch (error: any) {
			expect(error.message).toBe("Invalid vehicle type: undefined");
		}
	});
});
