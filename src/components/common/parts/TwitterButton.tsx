import { getText } from "@/lib/propaty";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { PageType } from "types/types";

type TwitterButton = {
  page: PageType;
  padding: string;
};

const TwitterButton = (props: TwitterButton) => {
  return (
    <a
      href={`http://twitter.com/share?url=https://nonotech.day/articles/${getText(
        props.page.properties.slug.rich_text
      )}&hashtags=NonoTech`}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <FaTwitter
        className={`cursor-pointer rounded-full bg-[#00acee] p-[${props.padding}] text-white hover:opacity-80`}
      />
    </a>
  );
};

export default TwitterButton;
