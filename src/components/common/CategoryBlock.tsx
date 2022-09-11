import React from "react";

const CategoryBlock = ({ database }: any) => {
  return (
    <div className="w-full rounded-b bg-white">
      <div className="rounded-t bg-primary py-2 pl-3 text-xl font-bold text-white">
        Category
      </div>
      <ul className="space-y-3 py-4 pl-5 text-lg font-bold text-gray-600">
        {database.response?.properties.category.select.options.map(
          (category: any) => (
            <li className="cursor-pointer hover:opacity-80" key={category.id}>
              {category.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CategoryBlock;
