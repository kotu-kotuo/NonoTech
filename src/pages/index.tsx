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
    <Layout path="/" title="NonoTech" noTitleTemplate={true} isTopPage={true}>
      <Container className="md:flex">
        <div className="mt-8 mb-20 space-y-5 md:w-3/4">
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
        <div className="ml-10 mt-8 hidden w-1/4 min-w-[200px] md:block">
          <div className="w-full rounded-b bg-white">
            <div className="rounded-t bg-primary py-2 pl-3 text-xl font-bold text-white">
              Category
            </div>

            <ul className="space-y-3 py-4 pl-5 text-lg font-bold text-gray-600">
              {database.response.properties.category.select.options.map(
                (data: any) => (
                  <li>{data.name}</li>
                )
              )}
            </ul>
          </div>
          <div className="mt-6 w-full bg-white">おおお</div>
        </div>
      </Container>
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
