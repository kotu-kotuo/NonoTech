import Card from "@/components/common/Card";
import Layout from "@/components/layout/Layout";
import { fetchDatabase, searchPages } from "@/lib/notion";
import { IndexProps, Params } from "@/types/types";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Search: NextPage<IndexProps> = ({ pages, database }) => {
  return (
    <Layout path="/" title="NonoTech" database={database}>
      <div className="mt-8 mb-12 space-y-5 md:mb-16">
        {pages.map((page, index) => (
          <Card key={index} page={page} />
        ))}
        {pages.length === 0 ? (
          <div>
            <div className="py-8 text-center text-3xl font-bold text-gray-600 ">
              記事が見つかりませんでした。。
            </div>
            <div className="relative">
              <Image width={700} height={400} src="/sika.jpg" />
              <p className="absolute top-1/2 right-1/4 font-extralight text-white">
                まじごめん
              </p>
            </div>
            <Link href={"/"}>
              <p className="mt-6 inline-block cursor-pointer border-b border-secondary leading-tight text-secondary transition-colors duration-200 hover:border-b-primary hover:text-primary">
                ホームへ戻る
              </p>
            </Link>
          </div>
        ) : null}
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
