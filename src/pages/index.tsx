import { GetStaticProps, NextPage } from "next";
import Layout from "@/components/common/Layout";
import Card from "@/components/common/Card";
import Container from "@/components/common/parts/Container";
import { fetchArticles } from "@/lib/notion";

const Home: NextPage = (props) => {
  console.log(props);
  return (
    <Layout path="/" title="NonoTech" noTitleTemplate isTopPage>
      <Container>
        <div className="mt-8 mb-20 space-y-5">
          <Card />
          <Card />
          <Card />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchArticles();
  return { props: data ? data : [], revalidate: 10 };
};

export default Home;
