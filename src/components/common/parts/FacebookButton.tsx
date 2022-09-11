import { getText } from "@/lib/propaty";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { PageType } from "types/types";

const FacebookButton = (props: { page: PageType }) => {
  return (
    <a
      href={`http://www.facebook.com/share.php?u=https://nonotech.day/articles/${getText(
        props.page.properties.slug.rich_text
      )}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <FaFacebook className="cursor-pointer text-[#3B5998] hover:opacity-80" />
    </a>
  );
};

export default FacebookButton;
