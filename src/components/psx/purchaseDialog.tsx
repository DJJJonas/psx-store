import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import ItemInfo from "@/interfaces/ItemInfo";
import { useEffect, useState } from "react";
import { Button } from "../shadcn/button";

export default function PurchaseDialog(props: {
  readonly items: ItemInfo[];
  readonly open: boolean;
  readonly setOpen: (open: boolean) => void;
  readonly onClearCart: () => void;
  readonly onPurchase: (totalAmount: number) => void;
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      props.items.reduce((total, item) => total + item.price * item.discount, 0)
    );
    // Clean up
    return () => setTotal(0);
  }, [props.open, props.items]);
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm payment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 py-4">
          {props.items.length ? (
            props.items.map((item, i) => (
              <DialogDescription
                key={item.name + i}
                className="flex justify-between"
              >
                <span className="line-clamp-1">{item.name}</span>
                <span className="font-semibold text-green-600">
                  ${(item.price * item.discount).toFixed(2)}
                </span>
              </DialogDescription>
            ))
          ) : (
            <DialogDescription>
              Your shopping cart is empty 🛒
            </DialogDescription>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            disabled={props.items.length === 0}
            type="button"
            variant={"secondary"}
            onClick={props.onClearCart}
          >
            Clear cart
          </Button>
          <Button
            disabled={props.items.length === 0}
            type="button"
            variant={"default"}
            onClick={() => {
              props.onPurchase(total);
            }}
          >
            Complete purchase
          </Button>
          <h2 className="content-center text-lg font-semibold">
            Total: <span className="text-green-500">${total.toFixed(2)}</span>
          </h2>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
