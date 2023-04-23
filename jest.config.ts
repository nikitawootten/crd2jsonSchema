import { Config } from 'jest';

export default {
    preset: 'ts-jest',
    collectCoverage: false,
    coverageDirectory: '<rootDir>/coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageProvider: 'v8',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/lib'],
} as Config;
