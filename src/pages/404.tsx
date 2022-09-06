import Layout from "@/components/common/Layout";
import { fetchDatabase } from "@/lib/notion";
import { GetStaticProps } from "next";
import React from "react";

const NotFound = (props: any) => {
  return (
    <Layout path="" title="404 Not Found" database={props.database}>
      <div className="rounded bg-white pt-8 pb-16 md:my-8 md:px-10"></div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const database = await fetchDatabase();
  return {
    props: {
      database: database,
      revalidate: 100,
    },
  };
};

export default NotFound;
