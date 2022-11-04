import Card from "@/components/common/Card";
import Layout from "@/components/layout/Layout";
import { fetchDatabase, searchPages } from "@/lib/notion";
import { IndexProps, Params } from "@/types/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

const Search: NextPage<IndexProps> = ({ pages, database }) => {
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
  const { search } = ctx.params as Params;
  const results = await searchPages(search as string);
  const database = await fetchDatabase();
  return {
    props: {
      pages: results ? results : [],
      database: database,
    },
  };
};

export default Search;
