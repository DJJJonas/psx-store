import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import ItemInfo from "@/interfaces/ItemInfo";

type ItemProps = {
  readonly item: ItemInfo;
  readonly onFavorite: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  readonly onCartAdd: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  readonly className?: string;
};
export default function PsxGridItem({
  item,
  onCartAdd,
  onFavorite,
  className,
}: ItemProps) {
  const imgURL = `https://raw.githubusercontent.com/xlenore/psx-covers/main/covers/3d/${item.serial}.png`;
  const defaultRating = 10;

  // TODO: halfStars, emptyStars
  const fullStars = [];
  for (let i = 0; i < defaultRating / 2; i++) {
    fullStars.push(<i key={"star" + i} className="fa fa-star"></i>);
  }

  return (
    <Card
      className={
        "flex flex-col item-center justify-between h-fit group " +
        (className ?? "")
      }
    >
      <CardHeader className="relative">
        <img src={imgURL} alt={item.name} />
        <div className="[ absolute top-0 right-2 ] [ flex flex-col ] [ md:text-base text-2xl ]">
          <button
            onClick={onFavorite}
            className=" text-gray-400 transition cursor-pointer hover:scale-110 active:text-red-600"
          >
            <i className="fa fa-heart"></i>
          </button>
          <button
            onClick={onCartAdd}
            className="text-gray-400 transition cursor-pointer hover:scale-110 active:text-blue-600"
          >
            <i className="fa fa-shopping-cart"></i>
          </button>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <CardTitle className="text-sm font-sans line-clamp-2 min-h-10 text-gray-600 group-hover:text-gray-950">
          {item.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-stale-500">{fullStars}</p>
        {/* Price info */}
        <div className="flex flex-col md:flex-row justify-end items-end w-full">
          <span className="text-sm text-slate-400 line-through">
            ${item.price}
          </span>
          <p className="self-end text-green-600 text-2xl font-semibold">
            ${(item.price * item.discount).toFixed(2)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
