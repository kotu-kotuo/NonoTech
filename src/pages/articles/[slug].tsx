import Layout from "@/components/layout/Layout";
import {
  fetchPages,
  fetchDatabase,
  fetchBlocksByPageId,
  getPage,
} from "@/lib/notion";
import { GetServerSideProps, NextPage } from "next";
import React, { Key } from "react";
import { ArticleProps } from "@/types/types";
import { getCover, getText } from "@/lib/propaty";
import { HiHome, HiOutlineRefresh } from "react-icons/hi";
import { RiArrowDropRightLine } from "react-icons/ri";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import TwitterButton from "@/components/common/parts/TwitterButton";
import FacebookButton from "@/components/common/parts/FacebookButton";
import HatenaButton from "@/components/common/parts/HatenaButton";
import NotionPage from "@/components/articles/NotionPage";
import { BlockType } from "notion-block-renderer";

const Article: NextPage<ArticleProps> = ({
  page,
  database,
  recordMap,
  metaDescription,
}) => {
  return (
    <Layout
      path={`/articles/${getText(page.properties.slug.rich_text)}`}
      title={getText(page.properties.title.title)}
      database={database}
      ogImage={getCover(page.cover)}
      description={metaDescription}
    >
      <div className="rounded bg-white py-8 md:my-8 md:px-10">
        {/* パンくずリスト */}
        <div className="mb-4 flex w-full items-center gap-x-1.5 text-[15px] text-secondary">
          <Link href="/">
            <div className="flex cursor-pointer items-center gap-x-0.5 hover:opacity-80">
              <HiHome className="mb-[0.8px]" />
              <p>Home</p>
            </div>
          </Link>
          <RiArrowDropRightLine className="-mx-1.5 text-xl text-[#55DDA6]" />
          <Link href={`/category/${page.properties.category.select.name}`}>
            <p className="cursor-pointer hover:opacity-80">
              {page.properties.category.select.name}
            </p>
          </Link>
        </div>

        {/* タイトル */}
        <h1 className="text-2xl font-bold text-gray-900 md:text-[26px] md:leading-10">
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
          <div className="flex items-center gap-x-3 text-2xl">
            <TwitterButton page={page} padding="p-[4.5px]" />
            <FacebookButton page={page} />
            <HatenaButton page={page} />
          </div>
        </div>

        {/* アイキャッチ */}
        <Image
          className="static aspect-video h-auto w-full object-cover"
          src={getCover(page.cover)}
          alt="Featured Image"
          width={700}
          height={400}
          quality={30}
          priority
        />

        {/* 本文 */}
        <div className="my-8">
          <NotionPage recordMap={recordMap} />
        </div>

        {/* シェアボタン */}
        <div className="mt-10 mb-12">
          <p className="text-center text-xl font-bold text-gray-800">SHARE</p>
          <div className="mt-4 flex items-center justify-center gap-x-6 text-4xl">
            <TwitterButton page={page} padding="p-[6px]" />
            <FacebookButton page={page} />
            <HatenaButton page={page} />
          </div>
        </div>

        {/* 記事下のカテゴリー、タグ */}
        <p className="mt-4 font-bold text-gray-800">
          CATEGORY :{" "}
          <Link href={`/category/${page.properties.category.select.name}`}>
            <span className="cursor-pointer text-gray-400 hover:opacity-80">
              {page.properties.category.select.name}
            </span>
          </Link>
        </p>
        <div className="mt-4 flex">
          <p className="whitespace-nowrap font-bold text-gray-800">TAG : </p>
          <ul className="mt-[0.1rem] ml-1 flex flex-wrap">
            {page.properties.tags.multi_select.map(
              (
                tag: { color: string; id: string; name: string },
                index: Key
              ) => (
                <li
                  className="mb-3 mr-2 cursor-pointer rounded-xl bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600 hover:opacity-80"
                  key={index}
                >
                  <Link href={`/tag/${tag.name}`}>{tag.name}</Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

// --- image expired対策でSSRに変更
export const getServerSideProps: GetServerSideProps<
  ArticleProps,
  { slug: string }
> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true };
  }

  const { results } = await fetchPages({ slug: ctx.params.slug });
  const page = results[0];
  const pageId = page.id;
  const database = await fetchDatabase();
  const recordMap = await getPage(pageId);
  const { results: blocks }: { results: BlockType[] } =
    await fetchBlocksByPageId(pageId);
  const metaDescription =
    blocks
      .map((block) => {
        switch (block.type) {
          case "paragraph":
            return getText(block.paragraph.rich_text);
            break;
          case "heading_1":
            return getText(block.heading_1.rich_text);
            break;
          case "heading_2":
            return getText(block.heading_2.rich_text);
            break;
          case "heading_3":
            return getText(block.heading_3.rich_text);
            break;
        }
      })
      .join("")
      .replace(/^こんにちは、ノノです。/, "")
      .substring(0, 150) + "...";

  return {
    props: {
      page: page,
      database: database,
      recordMap: recordMap,
      metaDescription: metaDescription,
    },
  };
};

export default Article;
