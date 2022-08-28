import { GetStaticProps, NextPage } from "next";
import Layout from "@/components/common/Layout";
import Card from "@/components/common/Card";
import Container from "@/components/common/parts/Container";
import { fetchPages } from "@/lib/notion";
import { IndexProps } from "types/types";

const Home: NextPage<IndexProps> = ({ pages }) => {
  console.log(pages);
  return (
    <Layout path="/" title="NonoTech" noTitleTemplate={true} isTopPage={true}>
      <Container>
        <div className="mt-8 mb-20 space-y-5">
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
      revalidate: 10,
    },
  };
};

export default Home;
