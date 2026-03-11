import { expect, test } from "@jest/globals";
import * as utils from "./utils.js";

test("return the current year", () => {
  const year = new Date();

  expect(utils.getCurrentYear()).toBe(year.getFullYear());
});

test("return all correct output on the footer", () => {
  expect(utils.getFooterCopy(true)).toBe("Holberton School");
  expect(utils.getFooterCopy(false)).toBe("Holberton School main dashboard");
});

test("return correct notification", () => {
  expect(utils.getLatestNotification()).toBe(
    "<strong>Urgent requirement</strong> - complete by EOD",
  );
});
