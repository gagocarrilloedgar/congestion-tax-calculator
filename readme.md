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

```
# install dependencies
npm install

# run in dev mode on port 3000
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 3000
npm run start
```

## Testing

### Jest with supertest

```
npm run test
```

## Linting

```
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```

## Change log

- Clone skeleton and adapt to use cose
- Rename class files using proper casing style
- Add health check and entry point testing
- Rename == over === to improve type integrity
- Remove vehicle null check as they have no overlap
- Refactor both isTfollFreeDate and isTollFreeVehicle so its tollearable to change
- Refactor getTax and add the possibility to handle multiple days.
- Refactor a bit Vehicle as for me the way it is proposed it doesn't make a lot of sense (we are handling taxble and nontaxable vehicles).
- Fix tests so it handles new vehicle refactor.
- (Question) Looking on the internet appeared more Holidays thatn the ones added on the given code. As I was not sure which ones were holidays and which ones were prior, I left the given holidays and included a function to check days prior to holidays.

## Acknowledgements

- [Base skeleton](https://github.com/CodelyTV/typescript-api-skeleton)
-
