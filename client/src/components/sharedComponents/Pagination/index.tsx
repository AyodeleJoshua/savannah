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
    <div data-testid="pagination" className="text-[1.4rem] text-gray-600">
      Showing {startItem} of {totalItems} results
    </div>
  );
}
