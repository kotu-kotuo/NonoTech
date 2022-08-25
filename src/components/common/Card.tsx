import Image from "next/image";
import React from "react";

const Card = () => {
  return (
    <div className="flex gap-x-3 bg-white p-3 shadow-sm">
      <div className="min-w-[80px]">
        <Image
          width={200}
          height={200}
          alt="記事の画像"
          src="/card-image.png"
          objectFit="cover"
          className="static h-auto w-full"
          quality={50}
        />
      </div>
      <div>
        <div className="mb-4 text-base font-bold text-gray-800">
          【タイトル１】セキセイインコの名前の由来について、分かりやすく解説。背中の羽の色と関係が！？
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
