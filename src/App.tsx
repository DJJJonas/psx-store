import { useEffect, useState } from "react";
import "./App.css";
import Item from "./components/ui/item";
import ItemInfo from "./interfaces/ItemInfo";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import allItems from "./assets/psx_games.json";
import Navbar from "./components/ui/navbar";

export default function App() {
  const [items, setItems] = useState<ItemInfo[]>([]);
  const [page, setPage] = useState(0);
  const maxPaginationItems = 5;
  const itemsPageLimit = 9;
  const itemsBookLimit = Math.ceil(allItems.length / itemsPageLimit);
  const [queryName, setQueryName] = useState("");

  useEffect(() => {
    const queryedItems = allItems.filter(({ name }) => {
      return name.toLowerCase().includes(queryName.toLowerCase());
    });
    const temp: ItemInfo[] = [];
    for (let i = page * itemsPageLimit; i < itemsPageLimit * (page + 1); i++) {
      const item = queryedItems[i];

      if (!item) break;
      temp.push(item);
    }
    setItems(temp);
    // Clean Up
    return () => setItems([]);
  }, [page, queryName]);

  return (
    <>
      <Navbar
        OnInput={({ target }) => {
          setPage(0);
          setQueryName(target.value);
        }}
      />

      <main className="bg-slate-200 w-full min-h-screen">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 max-w-screen-md md:mx-auto mx-2 py-2">
          {items.map((item, i) => (
            <Item
              key={item.serial + i}
              item={item}
              onCartAdd={console.log}
              onFavorite={console.log}
              className={i + 1 === itemsPageLimit ? "max-[768px]:hidden" : ""}
            />
          ))}
        </div>
      </main>

      <Pagination className="py-2 bg-slate-200 overflow-x-hidden">
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
            Array(Math.min(maxPaginationItems, itemsBookLimit)),
            (_, i) => {
              const isLastItem = i === maxPaginationItems - 1;
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
                      (isCurrentPage && page >= maxPaginationItems)
                    }
                  >
                    {isLastItem && page >= maxPaginationItems
                      ? page + 1
                      : i + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}

          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                if (page < itemsBookLimit) {
                  setPage(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <footer></footer>
    </>
  );
}
