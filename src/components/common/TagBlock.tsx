import Link from "next/link";
import React from "react";
import { Database } from "types/types";

const TagBlock = ({ database }: { database: Database }) => {
  return (
    <div className="w-full rounded-b bg-white">
      <div className="rounded-t bg-primary py-2 pl-3 text-xl font-bold text-white">
        Tag
      </div>
      <ul className="flex flex-wrap px-3.5 pt-5 pb-1 text-xs font-bold text-gray-600">
        {database.response?.properties.tags.multi_select.options.map(
          (tag: { id: string; name: string }) => (
            <Link href={`/tag/${tag.name}`} key={tag.id}>
              <li className="mb-3 mr-2 cursor-pointer rounded-xl bg-gray-100 px-2.5 py-1 hover:opacity-80">
                {tag.name}
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  );
};

export default TagBlock;
