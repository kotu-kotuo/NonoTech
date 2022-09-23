import Link from "next/link";

import Container from "@/components/common/parts/Container";
import MenuList from "./MenuList";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-primary py-10">
      <Container>
        <div className="flex flex-col items-start justify-between text-white md:flex-row">
          {/* ロゴ */}
          <Link href="/">
            <a className="mb-4 text-2xl font-bold text-white">NonoTech</a>
          </Link>
          {/* ナビゲーション. */}
          <nav>
            <MenuList />
          </nav>
        </div>
        <small className="mt-10 block text-center text-gray-100">
          &copy; {new Date().getFullYear()} Nono
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
