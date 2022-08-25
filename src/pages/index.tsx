import { NextPage } from "next";
import Layout from "@/components/common/Layout";
import Card from "@/components/common/Card";
import Container from "@/components/common/parts/Container";

const Home: NextPage = () => {
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

export default Home;
