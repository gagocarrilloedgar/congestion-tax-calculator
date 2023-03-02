import request from "supertest";

import app from "../../src/app";

describe("GET /api/health-check", () => {
	it("should return 200 OK", () => {
		return request(app)
			.get("/api/health-check")
			.expect(200)
			.expect("Content-Type", /json/)
			.expect({ message: "OK" });
	});
});
