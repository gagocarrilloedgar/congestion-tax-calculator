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
	it("Should return 200 OK", () => {
		return request(app)
			.post("/api/tax-calculator")
			.send({
				vehicleType: "Car",
				city: "Gothenburg",
				dates: firstIteration,
				holidayCalendar: "Swedish"
			})
			.expect(200)
			.expect("Content-Type", /json/)
			.expect({
				taxFee: 76,
				vehicleType: "Car",
				error: null
			});
	});

	it("Should return 400 Bad Request if type is not included", () => {
		return request(app)
			.post("/api/tax-calculator")
			.send({
				vehicleType: "",
				city: "Gothenburg",
				dates: firstIteration,
				holidayCalendar: "Swedish"
			})
			.expect(400)
			.expect("Content-Type", /json/)
			.expect({
				taxFee: 0,
				vehicleType: "",
				error: "Vehicle type not allowed"
			});
	});
});
