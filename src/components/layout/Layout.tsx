import NextHeadSeo from "next-head-seo";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { LayoutProps } from "@/types/types";
import TagBlock from "../common/TagBlock";
import CategoryBlock from "../common/CategoryBlock";
import Image from "next/image";
import SelfIntroduction from "./SelfIntroduction";

// Layout のデフォルト設定
const APP_NAME = "NonoTech";
const APP_ROOT_URL = "https://nonotech.day"; // 末尾に `/` をつけない
const APP_DEFAULT_DESCRIPTION =
  "What you have accumulated will be a creativity, and it will be a way of life!";
const APP_DEFAULT_OG_IMAGE = "/nonotech-ogp.png";

/* Props について
 *  `path`           : [必須] そのページの相対パスを渡す。
 *  `title`          : [必須] そのページのタイトルを渡す。
 *  `description`    : そのページのメタディスクリプションを渡す。省略した場合、`APP_DEFAULT_DESCRIPTION` が使用される。
 *  `ogImage`    : そのページのOGP画像のurlを渡す。省略した場合、`APP_DEFAULT_OG_IMAGE` が使用される。
 *  `noindex`        : そのページを noindex する場合は `true` を渡す。
 *  `noTitleTemplate`: TOP ページで `true` を渡す。それ以外のページは基本省略。タイトルの後ろに `- サイトのタイトル` をつけるかどうか条件分岐に使用。
 *  `isTopPage`      : TOP ページで `true` を渡す。それ以外のページは省略。OG タイプの条件分岐に使用。
 *  `children`       : [必須]
 */

const Layout = ({
  path,
  title,
  description = APP_DEFAULT_DESCRIPTION,
  ogImage = APP_DEFAULT_OG_IMAGE,
  noindex,
  noTitleTemplate,
  isTopPage,
  children,
  database,
}: LayoutProps): JSX.Element => {
  // ページの絶対パス
  const pageUrl = APP_ROOT_URL + path;

  return (
    <>
      <NextHeadSeo
        title={noTitleTemplate ? title : `${title} - ${APP_NAME}`}
        canonical={pageUrl}
        description={description}
        robots={noindex ? "noindex, nofollow" : undefined}
        og={{
          title,
          description,
          url: pageUrl,
          image: ogImage,
          type: isTopPage ? "website" : "article",
          siteName: APP_NAME,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <div className="flex min-h-screen flex-col">
        <Header database={database} />
        <main className="flex-1 bg-neutral-100">
          <div
            className={`mx-auto max-w-6xl px-4 md:flex  md:px-8 ${
              path.indexOf("articles") === 1 || path.indexOf("terms") === 1
                ? "bg-white md:bg-neutral-100"
                : ""
            }`} //Articles, Termsで表示切り替え
          >
            {/* メインコンテンツ */}
            <div className=" md:w-[72%]">{children}</div>
            {/* サイドバー（PC） */}
            <div className="ml-10 mt-8 hidden w-[28%] min-w-[200px] space-y-8 md:block">
              <CategoryBlock database={database} />
              <TagBlock database={database} />
              <SelfIntroduction />
            </div>
          </div>
          {/* 記事下メニュー（モバイル） */}
          <div className="md:hidden">
            <div className="mx-4 my-8 space-y-4">
              <CategoryBlock database={database} />
              <TagBlock database={database} />
              <SelfIntroduction />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
