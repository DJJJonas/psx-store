import { Input } from "@/components/ui/input";
import logoImg from "../../assets/psx_store.png";

type OnInputType = (e: React.ChangeEvent<HTMLInputElement>) => void;

export default function Navbar({ OnInput }: { readonly OnInput: OnInputType }) {
  return (
    <header className="bg-slate-800 h-16 px-8 flex justify-between items-center">
      <img src={logoImg} srcSet="" alt="psx store" className="h-full" />
      <Input
        placeholder="Search"
        onChange={OnInput}
        className="max-w-screen-sm"
      />
      <button className="rounded-full aspect-square w-10 bg-slate-600 hover:bg-slate-500 active:bg-slate-400">
        <i className="fa fa-shopping-cart text-slate-200 text-2xl"></i>
      </button>
    </header>
  );
}
