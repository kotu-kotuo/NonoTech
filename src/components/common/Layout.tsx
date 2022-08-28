import NextHeadSeo from "next-head-seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { LayoutProps } from "types/types";

// Layout のデフォルト設定
const APP_NAME = "NonoTech";
const APP_ROOT_URL = "https://unreact.jp"; // 末尾に `/` をつけない
const APP_DEFAULT_DESCRIPTION = "株式会社UnReactのメタディスクリプションです。";
const APP_DEFAULT_OG_IMAGE_PATH = "/nonotech-ogp.png";

/* Props について
 *  `path`           : [必須] そのページの相対パスを渡す。
 *  `title`          : [必須] そのページのタイトルを渡す。
 *  `description`    : そのページのメタディスクリプションを渡す。省略した場合、`APP_DEFAULT_DESCRIPTION` が使用される。
 *  `ogImagePath`    : そのページのOGP画像のパスを渡す。省略した場合、`APP_DEFAULT_OG_IMAGE_PATH` が使用される。
 *  `noindex`        : そのページを noindex する場合は `true` を渡す。
 *  `noTitleTemplate`: TOP ページで `true` を渡す。それ以外のページは基本省略。タイトルの後ろに `- サイトのタイトル` をつけるかどうか条件分岐に使用。
 *  `isTopPage`      : TOP ページで `true` を渡す。それ以外のページは省略。OG タイプの条件分岐に使用。
 *  `children`       : [必須]
 */

const Layout = ({
  path,
  title,
  description = APP_DEFAULT_DESCRIPTION,
  ogImagePath = APP_DEFAULT_OG_IMAGE_PATH,
  noindex,
  noTitleTemplate,
  isTopPage,
  children,
}: LayoutProps): JSX.Element => {
  // ページの絶対パス
  const pageUrl = APP_ROOT_URL + path;

  // OG画像の絶対パス
  const ogImageUrl = APP_ROOT_URL + ogImagePath;

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
          image: ogImageUrl,
          type: isTopPage ? "website" : "article",
          siteName: APP_NAME,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-neutral-100">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
