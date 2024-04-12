import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import "./App.css";
import ItemInfo from "./interfaces/ItemInfo";
import Item from "./components/ui/item";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import allItems from "../public/psx_games.json";

export default function App() {
  const [queryName, setQueryName] = useState("");
  // temporary so sonarlint stop crying
  queryName;

  const [items, setItems] = useState<ItemInfo[]>([]);
  const [page, setPage] = useState(0);
  const maxPaginationItems = 10;
  const itemsPageLimit = 9;
  const itemsBookLimit = Math.ceil(allItems.length / itemsPageLimit);

  useEffect(() => {
    const temp: ItemInfo[] = [];
    for (let i = itemsPageLimit * page; i < itemsPageLimit * (page + 1); i++) {
      temp.push(allItems[i]);
    }
    setItems(temp);
    return () => setItems([]);
  }, [items, page]);

  return (
    <>
      <header className="bg-slate-200 h-16 px-8 flex justify-between items-center">
        <img
          src="/psx_store.png"
          srcSet=""
          alt="psx store"
          className="h-full"
        />
        <Input
          placeholder="Search"
          onChange={(e) => setQueryName(e.target.value)}
          className="max-w-screen-sm"
        />
        <i className="fa fa-shopping-cart"></i>
      </header>
      <main className="bg-slate-400 w-full">
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

        <div className="grid grid-cols-3 gap-2 max-w-screen-md mx-auto py-2">
          {items.map((item) => (
            <Item key={item.serial} item={item} />
          ))}
        </div>
      </main>
      <footer></footer>
    </>
  );
}
