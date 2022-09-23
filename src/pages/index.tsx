import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Layout from "@/components/common/Layout";
import Card from "@/components/common/Card";
import { fetchDatabase, fetchPages } from "@/lib/notion";
import { IndexProps } from "types/types";

const Home: NextPage<IndexProps> = ({ pages, database }) => {
  // console.log(pages);
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

// --- image expired対策でSSRに変更
export const getServerSideProps: GetServerSideProps = async () => {
  const { results } = await fetchPages({});
  const database = await fetchDatabase();
  return {
    props: {
      pages: results ? results : [],
      database: database,
    },
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const { results } = await fetchPages({});
//   const database = await fetchDatabase();
//   return {
//     props: {
//       pages: results ? results : [],
//       database: database,
//     },
//     revalidate: 100,
//   };
// };

export default Home;
