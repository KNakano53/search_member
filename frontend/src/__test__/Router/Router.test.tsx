import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Router } from "../../Router";
import React from "react";
import { it } from "vitest";

describe("画面遷移テスト", () => {
  it('renders SearchBox component on "/" route', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Router />
      </MemoryRouter>
    );
    expect(getByTestId("search-box")).toBeInTheDocument();
  });

  it('renders InsertUser component on "/insertUser" route', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/insertUser"]}>
        <Router />
      </MemoryRouter>
    );
    expect(getByTestId("insert-user")).toBeInTheDocument();
  });
});
