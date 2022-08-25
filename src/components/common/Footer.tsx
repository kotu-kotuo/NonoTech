import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/parts/Container";

const footerLinkList = [
  { title: "ホーム", link: "/" },
  { title: "このサイトについて", link: "/" },
  { title: "お問い合わせ", link: "/" },
  { title: "プライバシーポリシー", link: "/" },
];

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-primary py-10">
      <Container>
        <div className="flex flex-col items-start justify-between text-white md:flex-row">
          {/* ロゴ */}
          <Link href="/">
            <a className="mb-4 text-2xl font-bold text-white">NonoTech</a>
          </Link>

          {/* ナビゲーション */}
          <nav>
            <ol>
              {footerLinkList.map(({ title, link }) => (
                <li key={title}>
                  <Link href={link}>
                    <a className="mb-1 block py-2 text-sm duration-300 hover:opacity-75 md:text-base">
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ol>
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
