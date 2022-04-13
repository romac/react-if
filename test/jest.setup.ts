import '@testing-library/jest-dom';

// Stub out console.warn so it doesn't log in tests
const originalWarn = console.warn;

beforeAll(() => {
  console.warn = () => undefined;
});

afterAll(() => {
  console.warn = originalWarn;
});
