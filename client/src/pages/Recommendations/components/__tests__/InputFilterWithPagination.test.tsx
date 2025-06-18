import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import InputFilterWithPagination from "../InputFilterWithPagination";

vi.mock("../../../components/sharedComponents/Input", () => ({
  default: ({
    onChange,
    placeholder,
  }: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

vi.mock("../../../components/sharedComponents/MultiSelectDropdown", () => ({
  default: ({
    onSelectionChange,
    placeholder,
  }: {
    onSelectionChange: (options: string[]) => void;
    placeholder: string;
  }) => (
    <div data-testid="multi-select-dropdown">
      <button onClick={() => onSelectionChange(["option1"])}>
        {placeholder}
      </button>
    </div>
  ),
}));

vi.mock("../../../components/sharedComponents/Pagination", () => ({
  default: ({
    currentPage,
    itemsPerPage,
    totalItems,
  }: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  }) => (
    <div data-testid="pagination">
      Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
    </div>
  ),
}));

describe("InputFilterWithPagination", () => {
  const defaultProps = {
    multiSelectOptions: [
      { label: "AWS", count: 10, id: "aws" },
      { label: "GCP", count: 5, id: "gcp" },
    ],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 100,
    },
    onMultiselectDropdownChange: vi.fn(),
    onSearchChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all components correctly", () => {
    render(<InputFilterWithPagination {...defaultProps} />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("multi-select-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("calls onSearchChange when search input changes", () => {
    render(<InputFilterWithPagination {...defaultProps} />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("test search");
  });

  it("displays correct pagination information", () => {
    render(<InputFilterWithPagination {...defaultProps} />);

    expect(screen.getByText("Showing 1 of 100 results")).toBeInTheDocument();
  });

  it("passes correct props to child components", () => {
    render(<InputFilterWithPagination {...defaultProps} />);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toHaveAttribute("placeholder", "Search");
  });
});
