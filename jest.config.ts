import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export const testEnvironment = "node";
export const transform = {
  ...tsJestTransformCfg,
};

module.exports = {
  rootDir: '.', // or the root of your project, if not in the same folder as jest.config.js
  moduleDirectories: ['node_modules', '<rootDir>'],
};