import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemInfo from "@/interfaces/ItemInfo";

export default function Item({ item }: Readonly<{ item: ItemInfo }>) {
  const imgURL = `https://raw.githubusercontent.com/xlenore/psx-covers/main/covers/3d/${item.serial}.png`;
  const defaultRating = 10;

  // TODO: halfStars, emptyStars
  const fullStars = [];
  for (let i = 0; i < defaultRating / 2; i++) {
    fullStars.push(<i className="fa fa-star"></i>);
  }

  return (
    <Card className="flex flex-col item-center justify-between h-fit cursor-pointer group">
      <CardHeader className="relative">
        <img src={imgURL} alt={item.name} />
        <div className="absolute top-0 right-2">
          <i className="fa fa-heart text-gray-400 transition cursor-pointer hover:scale-110"></i>
          <br />
          <i className="fa fa-shopping-cart text-gray-400 transition cursor-pointer hover:scale-110"></i>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <CardTitle className="text-sm font-sans line-clamp-2 min-h-10 text-gray-600 group-hover:text-gray-950">
          {item.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-gray-500">{fullStars}</p>
        <p className="self-end text-gray-800 text-2xl font-semibold">
          <span className="text-sm text-gray-400 line-through">R$99,99</span>
          {"R$29,99"}
        </p>
      </CardFooter>
    </Card>
  );
}
