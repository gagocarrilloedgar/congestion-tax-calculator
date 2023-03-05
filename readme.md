# Congestion taxt calculor

API presented solution to solve Volvos technical interview: [assignment](ASSIGNMENT.md)

https://github.com/volvo-cars/congestion-tax-calculator

## Features

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Codely's config](https://github.com/lydell/eslint-plugin-simple-import-sort/) (includes ESLint's recommended rules, Prettier, Import plugin and more)
  - [Jest plugin](https://www.npmjs.com/package/eslint-plugin-jest)
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push

## Running the app

```sh
# Install dependencies
npm install

# Run in dev mode on port 3000
npm run dev

# Generate production build
npm run build

# Run generated content in dist folder on port 3000
npm run start
```

## Computing tax fee

> http post request to :/api/tax-calculator
> **body:**

```json
{
	"vehicleType": "Car",
	"dates": [
		"2013-01-14 06:00:00",
		"2013-01-14 08:00:00",
		"2013-01-14 15:30:00",
		"2013-01-14 17:00:00",
		"2013-01-14 18:00:00",
		"2013-02-15 06:00:00",
		"2013-02-15 07:00:00",
		"2013-02-15 07:00:00",
		"2013-02-15 07:00:00",
		"2013-02-15 08:00:00",
		"2013-03-01 06:00:00",
		"2013-03-05 06:00:00"
	],
	"city": "Gothenburg"
}
```

**Expected result:**

```json
{
	"taxFee": 76,
	"vehicleType": "Car",
	"error": null
}
```

## Testing

### Integration testing

```sh
# Using supertest
npm run test:int
```

### Unit tests

```sh
# Using jest
npm run test:unit
```

### Testing coverate

```sh
# General app coverage
npm run test:coverate
```

## Linting

```sh
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```

## Assumptions

- Looking on the internet appeared more Holidays thatn the ones added on the given code. As I was not sure which ones were holidays and which ones were prior, I left the given holidays and included a function to check days prior to holidays.
- The input can be more than one day, then the API needs to handle multiple days taxes for the same vehicleType.
- Only handles one cartype and a list of dates per request.

## Change log

- Clone skeleton and adapt to use cose
- Rename class files using proper casing style
- Add health check and entry point testing
- Rename == over === to improve type integrity
- Remove vehicle null check as they have no overlap
- Refactor both isTfollFreeDate and isTollFreeVehicle so its tolerable to change
- Refactor getTax and add the possibility to handle multiple days.
- Refactor a bit Vehicle as for me the way it is proposed it doesn't make a lot of sense (we are handling taxable and nontaxable vehicles).
- Fix tests so it handles new vehicle refactoring.
- Add TaxController and integration testing
- Add Bonus point for adding custom city tax rule handler outside the code (just a json that can be modified easily by any non-technical person)
- Add Some extra documentation inside the readme

## Comments

- The way I've developed the solution is prioritizing a robust business logic rather than the server itself due to the short time.
- As I usually work with a more functional approach, my first action it's been to refactor the different functions so they can handle most edge cases and I've tested the core functionality using unit tests.
- Once that was done I refactored a bit thinking about the business domain and applying DDD (separating concerns and creating controllers and routers following https protocol).
- Then, as you were using classes I refactored a bit to apply classes (didn't have time to migrate everything) and OOP best practices.
- I spent a bit more time including the bonus point, as I had already extracted the tax rules as a constant. It was somehow easy to simply add a data layer and inject everything from the controller.
- The way Motorbikes and Cars where used didn't make a lot of sense to me as the domain should actually handle NonToll or Toll Free vehicles and maybe then if needed create Cars, Motorbikes or any other business domain to handle that business case. Maybe As an improvement I would create a generic Vehicle class that would include the isTollFree functionality. But for me the domain is regarding Taxes and Tax computation therefore it didn't make sense to include those classes.

## To Do

[x] Apply general OOP and best practices

- Add integration layer to properly handle the injection and retrieve of the data: add differents repositories to be able to handle file or db getters
- Add more route security and documentation (ts-openapi). This allows to create Swagger documentation and request validation re-using schemas
  [x] Add async router so we can avoid doing try-catch on every single route (express-async-router)
- Add dependency injection library (node-dependency-injection, inversify or similar): https://pro.codely.com/library/typescript-avanzado-mas-alla-de-any-182513/418230/path/step/181818319/
  [x] Add Exception handler to the server
  [x] Add 404 route handler
- Add conventional commit lintern (commitlint)
  [x] Create general holiday calendar handler
- Dockerize app
