import type { Collection } from "@prisma/client";
import Link from "next/link";

const CollectionsList = ({ collections }) => {
  console.log(collections);
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {collections.map((collection: Collection) => (
              <Link key={collection.id} href={`collections/${collection.id}`}>
                <div className="group relative cursor-pointer">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={
                        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
                      }
                      alt={
                        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                      }
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    {collection.name}
                  </h3>

                  <p className="text-base font-semibold text-gray-900">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsList;
