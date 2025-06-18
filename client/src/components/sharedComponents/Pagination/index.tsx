export interface IPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
}: IPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div data-testid="pagination" className="text-gray-600 text-sm">
      Showing {startItem} of {totalItems} results
    </div>
  );
}
