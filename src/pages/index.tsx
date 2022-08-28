import { GetStaticProps, NextPage } from "next";
import Layout from "@/components/common/Layout";
import Card from "@/components/common/Card";
import Container from "@/components/common/parts/Container";
import { fetchArticles } from "@/lib/notion";
import { IndexProps, PageProps } from "types/types";

// type CardProps = {
//   cover: any;
// };

const Home: NextPage<any> = ({ pages }) => {
  console.log(pages);
  return (
    <Layout path="/" title="NonoTech" noTitleTemplate isTopPage>
      <Container>
        <div className="mt-8 mb-20 space-y-5">
          {pages.map((page: PageProps, index: any) => (
            <Card
              key={index}
              page={page}
              // cover={page.cover?.external?.url}
              // title={page.title}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchArticles({});
  return {
    props: {
      pages: results ? results : [],
      revalidate: 10,
    },
  };
};

export default Home;
