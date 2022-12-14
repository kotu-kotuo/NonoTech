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
        {pages.length === 0 ? (
          <div>
            <div className="py-8 text-center text-3xl font-bold text-gray-600">
              記事が見つかりませんでした。。
            </div>
            <div className="relative mx-auto w-fit">
              <Image
                width={700}
                height={400}
                src="/sika.jpg"
                alt="articles not found"
                className="aspect-video h-auto  object-cover"
                priority
              />
              <p className="absolute top-2/3 right-0 w-1/3 text-left text-lg font-extralight text-white">
                まじごめん
              </p>
              <Link href={"/"}>
                <p className="mt-6 inline-block cursor-pointer border-b border-primary leading-tight text-primary transition-colors duration-200 hover:border-opacity-80 hover:opacity-80">
                  ホームへ戻る
                </p>
              </Link>
            </div>
          </div>
        ) : (
          pages.map((page, index) => <Card key={index} page={page} />)
        )}
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
