// import type { Config } from "@jest/types";

// // Sync object
// const config: Config.InitialOptions = {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   roots: ["__tests__"],
//   moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
//   moduleNameMapper: {
//     "^(\\.{1,2}/.*)\\.js$": "$1",
//     "^(\\.{1,2}/.*)\\.ts$": "$1",
//   },
//   transform: {
//     "^.+\\.ts?$": "ts-jest",
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   transformIgnorePatterns: ["/node_modules/"],
//   testMatch: [
//     "*test*"
//   ]
// };
// export default config;

// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'