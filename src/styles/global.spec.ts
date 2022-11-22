import GlobalStyle from "./global";

describe("test global style", () => {
  it("should exists", () => {
    const globalStyle = GlobalStyle;
    expect(globalStyle).toBeTruthy();
  });
});
