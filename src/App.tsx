import "./App.css";

import { useEffect, useState } from "react";
import Pagination from "@/components/psx/pagination";

import PsxGridItem from "./components/psx/item";
import ItemInfo from "./interfaces/ItemInfo";
import Navbar from "./components/psx/navbar";

import games from "./assets/psx_games.json";

export default function App() {
  const [items, setItems] = useState<ItemInfo[]>([]);
  const [shopCart, setShopCart] = useState<ItemInfo[]>([]);
  const [nameInput, setNameInput] = useState("");

  // Pagination variables
  const maxItemsPerPage = 9;
  const [page, setPage] = useState(0);
  const maxPaginationLinks = 5;
  const paginationLinksLimit = Math.ceil(games.length / maxItemsPerPage);

  // Update page items
  useEffect(() => {
    const query = games.filter(({ name }) => {
      const [n, input] = [name, nameInput].map((s) => s.toLowerCase());
      return n.includes(input);
    });

    const pageStart = page * maxItemsPerPage;
    const pageEnd = (page + 1) * maxItemsPerPage;
    const newItems: ItemInfo[] = [];

    for (let i = pageStart; i < pageEnd; i++) {
      const item = query[i];

      if (!item) break;
      //@ts-expect-error copy serial and name from item
      const itemInfo: ItemInfo = { ...item };
      [itemInfo.price, itemInfo.discount] = calcPriceAndDiscount(item.serial);
      newItems.push(itemInfo);
    }

    setItems(newItems);

    // Clean Up
    return () => setItems([]);
  }, [page, nameInput]);

  return (
    <>
      <Navbar
        cart={shopCart}
        OnCartClick={() => console.log("TODO")}
        OnInput={({ target }) => {
          setPage(0);
          setNameInput(target.value);
        }}
      />

      <main className="bg-slate-200 w-full min-h-screen">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 max-w-screen-md md:mx-auto mx-2 py-2">
          {items.map((item, i) => (
            <PsxGridItem
              key={item.serial + i}
              item={item}
              onCartAdd={() => {
                setShopCart([...shopCart, item]);
              }}
              onFavorite={console.log}
              className={i + 1 === maxItemsPerPage ? "max-[768px]:hidden" : ""}
            />
          ))}
        </div>
      </main>

      <Pagination
        page={page}
        setPage={setPage}
        maxPaginationLinks={maxPaginationLinks}
        paginationLinksLimit={paginationLinksLimit}
      />

      <footer></footer>
    </>
  );
}

function calcPriceAndDiscount(serial: string) {
  const numbers = serial.split("-")[1];
  // the first two numbers are the discount in %
  let discount = parseInt(numbers.substring(0, 2)) / 100;
  // - but if the discount is zero, then set it to 90% discount
  if (discount === 0) discount = 0.1;
  // the last three numbers are the price
  const price = parseInt(numbers.substring(2));

  return [price, discount];
}
