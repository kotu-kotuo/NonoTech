import Image from "next/image";
import React, { FC } from "react";
import { CardProps } from "types/types";

const Card: FC<CardProps> = ({ page }) => {
  console.log(page);
  return (
    <div className="flex gap-x-3 bg-white p-3 shadow-sm">
      <div className="min-w-[80px]">
        <Image
          width={200}
          height={200}
          alt="記事の画像"
          src={page.cover ? page.cover : "/sika.jpg"}
          objectFit="cover"
          className="static h-auto w-full"
          quality={50}
        />
      </div>
      <div>
        <div className="mb-4 text-base font-bold text-gray-800">
          {page.properties.title}
        </div>
        <div className="flex items-center justify-between">
          <div className="rounded bg-primary px-2 py-1 text-xs font-bold text-white">
            Front-end
          </div>
          <div className="text-sm text-gray-400 ">2022/8/11</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
