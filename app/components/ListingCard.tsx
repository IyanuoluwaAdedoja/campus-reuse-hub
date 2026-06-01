interface Props {
  title: string;
  description: string;
  price: string;
  image: string;
}

export default function ListingCard({
  title,
  description,
  price,
  image,
}: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">

      <div className="h-64 overflow-hidden bg-gray-100">

        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

      </div>

      <div className="p-6">

        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-500 mt-3 line-clamp-2 leading-relaxed min-h-[48px]">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">
              Price
            </p>

            <p className="text-2xl font-extrabold text-green-700">
              ₦{price}
            </p>

          </div>

          <div className="bg-green-700 text-white px-5 py-2 rounded-xl font-semibold">
            View
          </div>

        </div>

      </div>

    </div>
  );
}