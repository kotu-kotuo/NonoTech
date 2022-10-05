import Link from "next/link";
import React from "react";
import { Database } from "@/types/types";

const CategoryBlock = ({ database }: { database: Database }) => {
  return (
    <div className="w-full rounded-b bg-white">
      <div className="rounded-t bg-primary py-2 pl-3 text-xl font-bold text-white">
        Category
      </div>
      <ul className="space-y-3 py-4 pl-5 text-lg font-bold text-gray-600">
        {database.response?.properties.category.select.options.map(
          (category: { id: string; name: string }) => (
            <Link href={`/category/${category.name}`} key={category.id}>
              <li className="cursor-pointer hover:opacity-80">
                {category.name}
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  );
};

export default CategoryBlock;
