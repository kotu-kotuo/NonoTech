import React from "react";

const TagBlock = ({ database }: any) => {
  return (
    <div className="w-full rounded-b bg-white">
      <div className="rounded-t bg-primary py-2 pl-3 text-xl font-bold text-white">
        Tag
      </div>
      <ul className="flex flex-wrap px-3.5 pt-5 pb-1 text-xs font-bold text-gray-600">
        {database.response?.properties.tags.multi_select.options.map(
          (tag: { id: string; name: string }) => (
            <li
              className="mb-3 mr-2 cursor-pointer rounded-xl bg-gray-100 px-2.5 py-1 hover:opacity-80"
              key={tag.id}
            >
              {tag.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TagBlock;
