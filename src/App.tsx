import { useEffect, useState } from "react";
import Pagination from "@/components/psx/pagination";

import PsxGridItem from "./components/psx/item";
import ItemInfo from "./interfaces/ItemInfo";
import Navbar from "./components/psx/navbar";

import games from "./assets/psx_games.json";
import PurchaseDialog from "./components/psx/purchaseDialog";

export default function App() {
  const [items, setItems] = useState<ItemInfo[]>([]);
  const [shopCart, setShopCart] = useState<ItemInfo[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [money, setMoney] = useState(90000);

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
      const itemInfo: ItemInfo = createItem(item);
      newItems.push(itemInfo);
    }

    setItems(newItems);

    // Clean Up
    return () => setItems([]);
  }, [page, nameInput]);

  return (
    <>
      <PurchaseDialog
        items={shopCart}
        open={isPurchaseDialogOpen}
        setOpen={setIsPurchaseDialogOpen}
        onClearCart={() => setShopCart([])}
        onPurchase={(totalAmount) => {
          const totalAfterPurchase = money - totalAmount;
          setMoney(totalAfterPurchase);
          setShopCart([]);

          setIsPurchaseDialogOpen(false);
        }}
      />

      <Navbar
        cart={shopCart}
        money={money}
        OnCartClick={() => setIsPurchaseDialogOpen(!isPurchaseDialogOpen)}
        OnInput={({ target }) => {
          setPage(0);
          setNameInput(target.value);
        }}
      />

      <main className="w-full min-h-screen bg-slate-200">
        <div className="grid max-w-screen-md grid-cols-2 gap-2 py-2 mx-2 md:grid-cols-3 md:mx-auto">
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

function createItem(item: { name: string; serial: string }) {
  //@ts-expect-error creating item
  const itemInfo: ItemInfo = { ...item };
  [itemInfo.price, itemInfo.discount] = calcPriceAndDiscount(item.serial);
  return itemInfo;
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
