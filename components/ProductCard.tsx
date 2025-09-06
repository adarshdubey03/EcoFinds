import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
}

export default function ProductCard({ id, title, price, description, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
        {image ? <img src={image} alt={title} className="h-full w-full object-cover" /> : <span className="text-gray-400">No Image</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-green-600 font-bold mt-1">₹{price}</p>
        <p className="text-gray-600 mt-2 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
