type ListingCardProps = {
  title: string;
  description: string;
  price: string;
  image: string;
};

export default function ListingCard({
  title,
  description,
  price,
  image,
}: ListingCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h4 className="text-xl font-semibold">
          {title}
        </h4>

        <p className="text-gray-600 mt-2">
          {description}
        </p>

        <p className="text-green-700 font-bold mt-4">
          {price}
        </p>
      </div>
    </div>
  );
}