// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const localStorageMock = (() => {
  let store: Record<string, any> = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: any) {
      store[key] = JSON.stringify(value);
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
Object.defineProperty(window, "open", { value: jest.fn((url: string) => url) });
