import Card from "@/components/common/Card";
import Layout from "@/components/common/Layout";
import { fetchDatabase, fetchPages } from "@/lib/notion";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { IndexProps, Params } from "types/types";

const Category: NextPage<IndexProps> = ({ pages, database }) => {
  return (
    <Layout path="/" title="NonoTech" database={database}>
      <div className="mt-8 mb-12 space-y-5 md:mb-16">
        {pages.map((page, index) => (
          <Card key={index} page={page} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { category } = ctx.params as Params;
  const { results } = await fetchPages({ category: category });
  const database = await fetchDatabase();
  return {
    props: {
      pages: results ? results : [],
      category: category,
      database: database,
    },
  };
};

export default Category;
