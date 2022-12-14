import Layout from "@/components/layout/Layout";
import { fetchDatabase } from "@/lib/notion";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = (props: any) => {
  return (
    <Layout path="" title="404 Not Found" database={props.database}>
      <div className="pt-8 pb-16 md:my-8 md:rounded md:bg-white md:px-10">
        <h1 className="mb-6 text-[1.35rem] font-bold text-gray-900">
          お探しのページは見つかりませんでした
        </h1>
        <Image
          src="/nonotech-404.png"
          width={700}
          height={400}
          quality={100}
          className="h-auto max-w-full"
          alt="nonotech 404"
          priority
        />
        <Link href={"/"}>
          <p className="mt-6 inline-block cursor-pointer border-b border-primary leading-tight text-primary transition-colors duration-200 hover:border-b-primary hover:opacity-80">
            ホームへ戻る
          </p>
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const database = await fetchDatabase();
  return {
    props: {
      database: database,
    },
    revalidate: 100,
  };
};

export default NotFound;
