import Link from "next/link";
import { useState } from "react";
import Container from "@/components/common/parts/Container";
import CategoryBlock from "../common/CategoryBlock";
import MenuList from "../common/MenuList";
import { Database } from "@/types/types";
import TagBlock from "../common/TagBlock";
import Search from "../common/Search";

const Header = (props: { database: Database }): JSX.Element => {
  // ドロワーの開閉の状態
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // isOpen state を反転させる関数
  const handleMenuClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="relative py-3">
      <Container className="flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          NonoTech
        </Link>

        {/* ハンバーガーボタン */}
        <div
          className="relative z-50 block h-12 w-12 cursor-pointer hover:opacity-80 md:hidden"
          onClick={handleMenuClick}
        >
          <span
            className={`absolute inline-block  h-1 bg-primary duration-300 ${
              isOpen
                ? "top-5 left-4 w-[35%] translate-y-[6px] -rotate-45"
                : "top-5 left-3 w-1/2"
            }`}
          />
          <span
            className={`absolute inline-block  h-1 bg-primary duration-300 ${
              isOpen
                ? "top-8 left-4 w-[35%] translate-y-[-6px] rotate-45"
                : "top-7 left-3 w-1/3"
            }`}
          />
        </div>

        {/* ドロワーメニュー表示時の背景オーバーレイ */}
        <div
          className={`fixed top-0 left-0 transition-opacity duration-300 md:hidden
            ${
              isOpen
                ? "z-10 h-screen w-full bg-gray-900 opacity-25"
                : "opacity-0"
            }
          `}
          onClick={handleMenuClick}
        />

        {/* ドロワーメニュー */}
        <nav
          className={`fixed top-0 right-0 z-20 h-screen w-4/5 space-y-6 overflow-y-scroll bg-zinc-50 px-6 py-20 duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Search />
          <CategoryBlock database={props.database} />
          <TagBlock database={props.database} />
          <nav className="px-4">
            <MenuList />
          </nav>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
