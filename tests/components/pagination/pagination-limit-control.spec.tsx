import "../../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PaginationLimitControl } from "../../../src/components/pagination/pagination-limit-control";

afterEach(() => {
  cleanup();
});

const getLimitSelect = () =>
  screen.getByRole("combobox", { name: "Pagination limit control" });

describe("PaginationLimitControl onChange", () => {
  it("calls onLimitChange with 10 when the select value is a valid limit", () => {
    const onLimitChange = vi.fn();

    render(<PaginationLimitControl limit={5} onLimitChange={onLimitChange} />);

    fireEvent.change(getLimitSelect(), { target: { value: "10" } });

    expect(onLimitChange).toHaveBeenCalledTimes(1);
    expect(onLimitChange).toHaveBeenCalledWith(10);
  });

  it("calls onLimitChange with DEFAULT_LIMIT when the select value is not a limit", () => {
    const onLimitChange = vi.fn();

    render(<PaginationLimitControl limit={5} onLimitChange={onLimitChange} />);

    fireEvent.change(getLimitSelect(), { target: { value: "7" } });

    expect(onLimitChange).toHaveBeenCalledTimes(1);
    expect(onLimitChange).toHaveBeenCalledWith(10);
  });
});
