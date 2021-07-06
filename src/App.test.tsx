import { act, render, screen } from "@testing-library/react";
import App from "./App";

function renderCount() {
  const { container } = render(<App />);
  const buttonGroupEle = container.querySelector("[data-testid=button-group]");
  const button = buttonGroupEle?.firstChild as
    | HTMLButtonElement
    | null
    | undefined;
  return { container, button };
}

describe("renders learn react test", () => {
  const COUNT_INIT = "999";
  it("renders learn react link", () => {
    renderCount();
    const countEle = screen.getByTestId("count");
    expect(countEle).toHaveTextContent(COUNT_INIT);
  });
  it("renders learn react link 2", () => {
    renderCount();
    const countEle = screen.getByTestId("count");
    expect(countEle).toHaveTextContent(COUNT_INIT);
  });
  it("emit button event", () => {
    const { button } = renderCount();
    expect(button).not.toBeUndefined();
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const countEle = screen.getByTestId("count");
    const clickedCount = (parseInt(COUNT_INIT) + 1).toString();
    expect(countEle).toHaveTextContent(clickedCount);
  });
});
