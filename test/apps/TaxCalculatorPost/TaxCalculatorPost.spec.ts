import httpStatus from "http-status";
import request from "supertest";

import app from "../../../src/app";

const firstIteration = [
	"2013-01-14 06:00:00", // 8
	"2013-01-14 08:00:00", // 18 -> = 8 + 18 = 26
	"2013-01-14 15:30:00", // 18 -> = 26 + 18 = 44
	"2013-01-14 17:00:00", // 13 -> = 44 + 13 = 57
	"2013-01-14 18:00:00", // 8 -> = 57 + 8 = 65
	"2013-02-15 06:00:00", // 8 -> = 60 + 8 = 68
	"2013-02-07 06:00:00" // 8 -> = 68 + 8 = 76
];

describe("POST /api/tax-calculator", () => {
	it("Should return 200 OK", async () => {
		await request(app)
			.post("/api/tax-calculator")
			.send({
				vehicleType: "Car",
				city: "Gothenburg",
				dates: firstIteration,
				holidayCalendar: "Swedish"
			})
			.expect(httpStatus.OK)
			.expect("Content-Type", /json/)
			.expect({
				taxFee: 76,
				vehicleType: "Car",
				error: null
			});
	});

	it("Should return 400 Bad Request if type is not included", async () => {
		try {
			await request(app)
				.post("/api/tax-calculator")
				.send({
					vehicleType: "",
					city: "Gothenburg",
					dates: firstIteration,
					holidayCalendar: "Swedish"
				})
				.expect(httpStatus.UNSUPPORTED_MEDIA_TYPE);
		} catch (error: any) {
			expect(error.message).toBe("Invalid vehicle type: undefined");
		}
	});
});
