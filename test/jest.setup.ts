import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

// @ts-ignore => Type definitions are off
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// Stub out console.warn so it doesn't log in tests
const originalWarn = console.warn;

beforeAll(() => {
  console.warn = () => undefined;
});

afterAll(() => {
  console.warn = originalWarn;
});
