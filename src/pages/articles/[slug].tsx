import Layout from "@/components/common/Layout";
import { fetchPages, fetchBlocksByPageId, fetchDatabase } from "@/lib/notion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NotionBlocks from "notion-block-renderer";
import React from "react";
import { ArticleProps } from "types/types";
import { getCover, getText } from "@/lib/propaty";
import { HiHome, HiOutlineRefresh } from "react-icons/hi";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import { RiArrowDropRightLine } from "react-icons/ri";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { irBlack } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Article: NextPage<ArticleProps> = ({ page, blocks, database }) => {
  console.log(page);
  console.log(getCover(page.cover));

  return (
    <Layout
      path={`/articles/${getText(page.properties.slug.rich_text)}`}
      title={getText(page.properties.title.title)}
      database={database}
      ogImage={getCover(page.cover)}
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

        {/* タイトル 日付 シェアボタン アイキャッチ */}
        <h1 className="text-[1.35rem] font-bold text-gray-900">
          {getText(page.properties.title.title)}
        </h1>
        <div className="my-4 flex items-center justify-between">
          <div className="flex items-center gap-x-0.5 text-gray-400">
            <HiOutlineRefresh />
            <p className="text-sm">
              {dayjs(page.properties.updatedAt.last_edited_time).format(
                "YYYY/MM/DD"
              )}
            </p>
          </div>
          <div className="flex items-center gap-x-2 text-2xl">
            <a
              href={`http://twitter.com/share?url=https://nonotech.day/articles/${getText(
                page.properties.slug.rich_text
              )}&hashtags=NonoTech`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <FaTwitter className="cursor-pointer rounded-full bg-[#00acee] p-[4.5px] text-white hover:opacity-80" />
            </a>
            <FaFacebook className="cursor-pointer text-[#3B5998] hover:opacity-80" />
            <SiHatenabookmark className="cursor-pointer rounded-full text-[#00A4DE] hover:opacity-80" />
          </div>
        </div>
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
  };
};

export default Article;
