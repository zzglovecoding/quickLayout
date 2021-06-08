// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    globals: {
        NODE_ENV: 'test',
        __DEV__: true
    },
    setupFilesAfterEnv: [
        '<rootDir>/enzyme.config.js'
    ],
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its   files
    coverageDirectory: 'coverage',
    // The glob patterns Jest uses to detect test files
    testMatch: [
        '<rootDir>/test/**/*.(js|jsx)'
    ],
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules', 'src'],
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx'],
    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '^Components(.*)$': '<rootDir>/src/components$1',
        '^Config(.*)$': '<rootDir>/src/config$1',
        '^Constants(.*)$': '<rootDir>/src/constants$1',
        '^Contexts(.*)$': '<rootDir>/src/contexts$1',
        '^Pages(.*)$': '<rootDir>/src/pages$1',
        '^Hooks(.*)$': '<rootDir>/src/hooks$1',
        '^Fonts(.*)$': '<rootDir>/src/fonts$1',
        '^Images(.*)$': '<rootDir>/src/images$1',
        '^Layouts(.*)$': '<rootDir>/src/layouts$1',
        '^Routes(.*)$': '<rootDir>/src/routes$1',
        '^Services(.*)$': '<rootDir>/src/services$1',
        '^Styles(.*)$': '<rootDir>/src/styles$1',
        '^Utils(.*)$': '<rootDir>/src/utils$1',
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js'
    }
};