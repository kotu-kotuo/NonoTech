import { getText } from "@/lib/propaty";
import React from "react";
import { SiHatenabookmark } from "react-icons/si";
import { PageType } from "types/types";

const HatenaButton = (props: { page: PageType }) => {
  return (
    <a
      href={`http://b.hatena.ne.jp/entry/s/nonotech.day/articles/${getText(
        props.page.properties.slug.rich_text
      )}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      area-label="hatena share button"
      title="hatena share link"
    >
      <SiHatenabookmark className="cursor-pointer rounded-full text-[#00A4DE] hover:opacity-80" />
    </a>
  );
};

export default HatenaButton;
