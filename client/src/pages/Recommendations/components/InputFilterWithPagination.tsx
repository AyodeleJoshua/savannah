import { HiMagnifyingGlass } from "react-icons/hi2";
import Input from "../../../components/sharedComponents/Input";
import MultiSelectDropdown from "../../../components/sharedComponents/MultiSelectDropdown";
import Pagination from "../../../components/sharedComponents/Pagination";

interface InputFilterWithPaginationProps {
  multiSelectOptions: { label: string; count: number; id: string }[];
  pagination: { currentPage: number; itemsPerPage: number; totalItems: number };
  onMultiselectDropdownChange: (value: string[]) => void;
  onSearchChange: (value: string) => void;
}

export default function InputFilterWithPagination(
  props: InputFilterWithPaginationProps,
) {
  const {
    multiSelectOptions,
    pagination,
    onMultiselectDropdownChange,
    onSearchChange,
  } = props;
  return (
    <div className="mt-8 lg:mt-16 lg:flex lg:justify-between lg:items-center">
      <div className="space-y-4 mb-4">
        <Input
          iconLeft={<HiMagnifyingGlass />}
          placeholder="Search"
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-auto xl:w-[450px] md:mr-4"
          aria-label="Search recommendations"
        />
        <MultiSelectDropdown
          options={multiSelectOptions}
          placeholder="Cloud Provider"
          onSelectionChange={(selectedItems) =>
            onMultiselectDropdownChange(selectedItems)
          }
        />
      </div>
      <div>
        <Pagination
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          totalItems={pagination.totalItems}
        />
      </div>
    </div>
  );
}
