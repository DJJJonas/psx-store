import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";

export default function Pagination({
  page,
  setPage,
  maxPaginationLinks,
  paginationLinksLimit,
}: {
  readonly page: number;
  readonly setPage: React.Dispatch<React.SetStateAction<number>>;
  readonly maxPaginationLinks: number;
  readonly paginationLinksLimit: number;
}) {
  return (
    <PaginationRoot className="py-2 overflow-x-hidden bg-slate-200">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
              }
            }}
          />
        </PaginationItem>

        {Array.from(
          Array(Math.min(maxPaginationLinks, paginationLinksLimit)),
          (_, i) => {
            const isLastItem = i === maxPaginationLinks - 1;
            const isCurrentPage = i === page;
            return (
              <PaginationItem
                key={i + 1}
                className="cursor-pointer"
                onClick={() => setPage(i)}
              >
                <PaginationLink
                  isActive={
                    isCurrentPage ||
                    (isCurrentPage && page >= maxPaginationLinks)
                  }
                >
                  {isLastItem && page >= maxPaginationLinks ? page + 1 : i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
        )}

        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={() => {
              if (page < paginationLinksLimit) {
                setPage(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
