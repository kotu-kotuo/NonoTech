import Layout from "@/components/common/Layout";
import { fetchPages, fetchBlocksByPageId } from "@/lib/notion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NotionBlocks from "notion-block-renderer";
import React from "react";
import { ArticleProps, PageType } from "types/types";
import { getText } from "utils/propaty";

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  return (
    <Layout
      path={`/articles/${getText(page.properties.slug.rich_text)}`}
      title={getText(page.properties.title.title)}
    >
      <div>Article</div>
      <div className="my-12">
        <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
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
  return {
    props: {
      page: page,
      blocks: blocks,
    },
  };
};

export default Article;
