import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { CardProps } from "types/types";
import { getCover, getDate, getText } from "utils/propaty";

const Card: FC<CardProps> = ({ page }) => {
  console.log(page);
  return (
    <Link href={`/articles/${getText(page.properties.slug.rich_text)}`}>
      <div className="flex gap-x-3 bg-white p-3 shadow-sm">
        <div className="min-w-[80px] max-w-[88px]">
          <Image
            width={200}
            height={200}
            alt="記事の画像"
            src={getCover(page.cover)}
            objectFit="cover"
            className="static h-auto w-full"
            quality={50}
          />
        </div>
        <div className="w-full">
          <div className="mb-4 text-base font-bold text-gray-800">
            {getText(page.properties.title.title)}
          </div>
          <div className="flex items-center justify-between">
            <div className="rounded bg-primary px-2 py-1 text-xs font-bold text-white">
              {page.properties.category.select.name}
            </div>
            <div className="text-sm text-gray-400 ">
              {getDate(page.properties.publishedAt.date)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
