import Layout from "@/components/common/Layout";
import { fetchPages, fetchBlocksByPageId, fetchDatabase } from "@/lib/notion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NotionBlocks from "notion-block-renderer";
import React from "react";
import { ArticleProps } from "types/types";
import { getCover, getText } from "@/lib/propaty";
import { HiHome, HiOutlineRefresh } from "react-icons/hi";
import { RiArrowDropRightLine } from "react-icons/ri";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { irBlack } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import TwitterButton from "@/components/common/parts/TwitterButton";
import FacebookButton from "@/components/common/parts/FacebookButton";
import HatenaButton from "@/components/common/parts/HatenaButton";

const Article: NextPage<ArticleProps> = ({ page, blocks, database }) => {
  console.log(page);
  console.log(blocks);

  const metaDescription = blocks
    .map((block) => {
      if (block.type === "paragraph") {
        return getText(block.paragraph.rich_text);
      }
    })
    .join("")
    .substring(0, 100);

  return (
    <Layout
      path={`/articles/${getText(page.properties.slug.rich_text)}`}
      title={getText(page.properties.title.title)}
      database={database}
      ogImage={getCover(page.cover)}
      description={metaDescription}
    >
      <div className="rounded bg-white pt-8 pb-16 md:my-8 md:px-10">
        {/* パンくずリスト */}
        <div className="mb-4 flex w-full items-center gap-x-1.5 text-sm text-secondary">
          <Link href="/">
            <div className="flex cursor-pointer items-center gap-x-0.5 hover:opacity-80">
              <HiHome />
              <p>Home</p>
            </div>
          </Link>
          <RiArrowDropRightLine className="-mx-1.5 text-xl" />
          <p className="cursor-pointer hover:opacity-80">
            {page.properties.category.select.name}
          </p>
        </div>

        {/* タイトル */}
        <h1 className="text-[1.35rem] font-bold text-gray-900">
          {getText(page.properties.title.title)}
        </h1>

        <div className="my-4 flex items-center justify-between">
          {/* 日付 */}
          <div className="flex items-center gap-x-0.5 text-gray-400">
            <HiOutlineRefresh />
            <p className="text-sm">
              {dayjs(page.properties.updatedAt.last_edited_time).format(
                "YYYY/MM/DD"
              )}
            </p>
          </div>

          {/* シェアボタン */}
          <div className="flex items-center gap-x-2 text-2xl">
            <TwitterButton page={page} padding="p-[4.5px]" />
            <FacebookButton page={page} />
            <HatenaButton page={page} />
          </div>
        </div>

        {/* アイキャッチ */}
        <Image
          className="static h-auto w-full"
          src={getCover(page.cover)}
          alt="Featured Image"
          objectFit="cover"
          width={700}
          height={400}
          quality={30}
        />

        {/* 本文 */}
        <div className="my-8">
          <NotionBlocks
            blocks={blocks}
            isCodeHighlighter={true}
            syntaxHighlighterCSS={irBlack}
          />
        </div>

        {/* シェアボタン */}
        {/* <div className="mx-auto"> */}
        <div className="mt-14 flex items-center justify-center gap-x-6 text-4xl">
          <TwitterButton page={page} padding="p-[6px]" />
          <FacebookButton page={page} />
          <HatenaButton page={page} />
        </div>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { results } = await fetchPages({});
  const ids = results.map(
    (result: any) => `/articles/${getText(result.properties.slug.rich_text)}`
  );
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ArticleProps,
  { slug: string }
> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true };
  }
  const { results } = await fetchPages({ slug: ctx.params.slug });
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  const database = await fetchDatabase();
  return {
    props: {
      page: page,
      blocks: blocks,
      database: database,
    },
    revalidate: 100,
  };
};

export default Article;
