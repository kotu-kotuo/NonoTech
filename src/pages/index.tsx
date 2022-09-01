import { GetStaticProps, NextPage } from "next";
import Layout from "@/components/common/Layout";
import Card from "@/components/common/Card";
import Container from "@/components/common/parts/Container";
import { fetchDatabase, fetchPages } from "@/lib/notion";
import { IndexProps } from "types/types";

const Home: NextPage<IndexProps> = ({ pages, database }) => {
  console.log(pages);
  console.log(database);
  return (
    <Layout
      path="/"
      title="NonoTech"
      noTitleTemplate={true}
      isTopPage={true}
      database={database}
    >
      <div className="mt-8 mb-12 space-y-5 md:mb-16">
        {pages.map((page, index) => (
          <Card key={index} page={page} />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({});
  const database = await fetchDatabase();
  return {
    props: {
      pages: results ? results : [],
      database: database,
      revalidate: 10,
    },
  };
};

export default Home;
