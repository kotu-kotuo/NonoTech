import Link from "next/link";
import React from "react";

const MenuList = () => {
  return (
    <ol>
      <li>
        <Link href="/">
          <a className="mb-1 block py-2 text-sm duration-300 hover:opacity-75 md:text-base">
            ホーム
          </a>
        </Link>
      </li>
      <li>
        <a
          className="mb-1 block py-2 text-sm duration-300 hover:opacity-75 md:text-base"
          href="https://forms.gle/XXr7d3Cy6jJrY9g57"
          target="_blank"
          rel="noopener noreferrer"
        >
          お問い合わせ
        </a>
        <Link href="/terms">
          <a className="mb-1 block py-2 text-sm duration-300 hover:opacity-75 md:text-base">
            プライバシーポリシー
          </a>
        </Link>
      </li>
    </ol>
  );
};

export default MenuList;
