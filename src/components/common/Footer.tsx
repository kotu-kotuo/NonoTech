import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/parts/Container";

// const footerLinkList = [
//   { title: "ホーム", link: "/" },
//   { title: "お問い合わせ", link: "/" },
//   { title: "プライバシーポリシー", link: "/" },
// ];

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
                <Link href="/">
                  <a className="mb-1 block py-2 text-sm duration-300 hover:opacity-75 md:text-base">
                    プライバシーポリシー
                  </a>
                </Link>
              </li>
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
