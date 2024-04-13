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
  const maxPaginationItems = 10;
  const itemsPageLimit = 9;
  const itemsBookLimit = Math.ceil(allItems.length / itemsPageLimit);
  const [queryName, setQueryName] = useState("");

  useEffect(() => {
    const queryedItems = allItems.filter(({ name }) => {
      return name.toLowerCase().includes(queryName.toLowerCase());
    });
    const temp: ItemInfo[] = [];
    for (let i = 0; i < itemsPageLimit; i++) {
      if (!queryedItems[i]) break;
      temp.push(queryedItems[i]);
    }
    setItems(temp);
    // Clean Up
    return () => setItems([]);
  }, [page, queryName]);

  return (
    <>
      <Navbar
        OnInput={({ target }) => {
          setQueryName(target.value);
        }}
      />
      <main className="bg-slate-200 w-full min-h-screen">
        <div className="grid grid-cols-3 gap-2 max-w-screen-md mx-auto py-2">
          {items.map((item, i) => (
            <Item key={item.serial + i} item={item} />
          ))}
        </div>
      </main>

      <Pagination className="py-2 bg-slate-200">
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
          {Array.from(Array(maxPaginationItems), (_, i) => (
            <PaginationItem
              key={i}
              className="cursor-pointer"
              onClick={() => setPage(i)}
            >
              <PaginationLink
                isActive={
                  i === page ||
                  (i === maxPaginationItems - 1 && page >= maxPaginationItems)
                }
              >
                {i === maxPaginationItems - 1 && page >= maxPaginationItems
                  ? page + 1
                  : i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
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
