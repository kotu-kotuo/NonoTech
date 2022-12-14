import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { CardProps } from "@/types/types";
import { getCover, getDate, getText } from "@/lib/propaty";

const Card: FC<CardProps> = ({ page }) => {
  return (
    <li>
      <Link href={`/articles/${getText(page.properties.slug.rich_text)}`}>
        <div className="flex cursor-pointer gap-x-4 bg-white p-3 shadow-sm hover:opacity-80">
          <div className="aspect-square max-h-[80px] min-w-[80px] max-w-[80px] md:max-h-[88px] md:min-w-[88px] md:max-w-[88px]">
            <Image
              width={100}
              height={100}
              alt="featured image"
              src={
                getCover(page.cover)
                  ? getCover(page.cover)
                  : "https://source.unsplash.com/random"
              }
              className="static h-full w-full object-cover"
              quality={30}
            />
          </div>
          <div className="w-full">
            <div className="mb-2 text-base font-bold text-gray-800 md:text-xl">
              {getText(page.properties.title.title)}
            </div>
            <div className="mt-3 flex flex-row-reverse items-center justify-between sm:mt-0 sm:block">
              <div className="text-sm text-gray-500 sm:mb-2">
                {getDate(page.properties.publishedAt.date)}
              </div>
              <div className="w-fit rounded bg-primary px-2 py-1 text-xs font-bold text-white">
                {page.properties.category.select.name}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Card;
