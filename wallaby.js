module.exports = () => {
  return {
    files: [
      '!src/**/*.spec.ts',
      'src/**/*.ts'
    ],
    tests: [
      'src/**/*.spec.ts'
    ],
    debug: true,
    testFramework: 'jasmine',
    env: {
      type: 'node'
    }
  };
};
