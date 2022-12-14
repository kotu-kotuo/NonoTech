import Card from "@/components/common/Card";
import Layout from "@/components/layout/Layout";
import { fetchDatabase, fetchPages } from "@/lib/notion";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { IndexProps, Params } from "@/types/types";

const Tag: NextPage<IndexProps> = ({ pages, database }) => {
  return (
    <Layout path="/" title="NonoTech" database={database}>
      <ul className="mt-8 mb-12 space-y-5 md:mb-16">
        {pages.map((page, index) => (
          <Card key={index} page={page} />
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag });
  const database = await fetchDatabase();
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
      database: database,
    },
  };
};

export default Tag;
