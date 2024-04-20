import { Input } from "@/components/shadcn/input";
import logoImg from "@/assets/psx_store.png";
import { Badge } from "@/components/shadcn/badge";
import ItemInfo from "@/interfaces/ItemInfo";

type OnInputType = (e: React.ChangeEvent<HTMLInputElement>) => void;
type OnClickType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export default function Navbar({
  OnInput,
  OnCartClick,
  money,
  cart,
}: {
  readonly OnInput: OnInputType;
  readonly OnCartClick: OnClickType;
  readonly cart: ItemInfo[];
  readonly money: number;
}) {
  return (
    <header className="bg-slate-800 h-16 px-8 flex justify-between items-center">
      <img src={logoImg} srcSet="" alt="psx store" className="h-full" />
      <Input
        placeholder="Search"
        onChange={OnInput}
        className="max-w-screen-sm mx-2"
      />
      <div className="flex gap-2">
        <button
          className="relative rounded-full aspect-square w-8 bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-slate-200 text-1"
          onClick={OnCartClick}
        >
          <i className="fa fa-shopping-cart"></i>
          {cart.length ? (
            <Badge className="absolute -left-2 -bottom-2" variant="default">
              {cart.length}
            </Badge>
          ) : (
            ""
          )}
        </button>

        <button className="relative rounded-full bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-slate-200 text-1 text-green-200 font-semibold py-1 px-2">
          <span>{money}</span>
        </button>
      </div>
    </header>
  );
}
