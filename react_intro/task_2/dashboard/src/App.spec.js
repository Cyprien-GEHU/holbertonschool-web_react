import { render, screen } from "@testing-library/react";
import App from "./App";

test('texte h1 was wrote with "School Dashboard', async () => {
  render(<App />);
  const text = screen.getByRole("heading", {
    level: 1,
    name: /School dashboard/i,
  });
  expect(text).toBeInTheDocument();
});

test("the web site have 2 p elements", async () => {
  render(<App />);
  const para = screen.getAllByText(/./, { selector: "p" });
  expect(para.length).toBe(2);
});

test("Check is a image has rendered with alt", () => {
  render(<App />);
  const picture = screen.getAllByRole("img");
  expect(picture.length).toBe(1);
  const alt = picture[0].getAttribute("alt") || "";
  expect(alt.toLowerCase()).toBe("holberton logo");
});
