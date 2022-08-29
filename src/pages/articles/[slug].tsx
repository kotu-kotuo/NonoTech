import Layout from "@/components/common/Layout";
import { fetchPages, fetchBlocksByPageId } from "@/lib/notion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NotionBlocks from "notion-block-renderer";
import React from "react";
import { ArticleProps } from "types/types";
import { getCover, getText } from "utils/propaty";
import { HiHome, HiOutlineRefresh } from "react-icons/hi";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import { RiArrowDropRightLine } from "react-icons/ri";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  console.log(page);
  console.log(page.properties.updatedAt.last_edited_time);

  return (
    <Layout
      path={`/articles/${getText(page.properties.slug.rich_text)}`}
      title={getText(page.properties.title.title)}
    >
      <div className="bg-white py-4 px-4">
        <div className="mb-4 flex w-full items-center gap-x-1.5 text-sm text-secondary">
          <Link href="/">
            <div className="flex items-center gap-x-0.5">
              <HiHome className="" />
              <p>Home</p>
            </div>
          </Link>
          <RiArrowDropRightLine className="-mx-1.5 text-xl" />
          <p className="">{page.properties.category.select.name}</p>
        </div>
        <h1 className="text-[1.35rem] font-bold text-gray-800">
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
            <FaTwitter className="rounded-full bg-[#00acee] p-[4.5px] text-white" />
            <FaFacebook className="text-[#3B5998]" />
            <SiHatenabookmark className="rounded-full text-[#00A4DE]" />
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
        <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { results } = await fetchPages({});
  const ids = results.map(
    (result) => `/articles/${getText(result.properties.slug.rich_text)}`
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
  return {
    props: {
      page: page,
      blocks: blocks,
    },
  };
};

export default Article;
