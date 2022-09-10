import Layout from "@/components/common/Layout";
import { fetchDatabase } from "@/lib/notion";
import { GetStaticProps } from "next";
import React from "react";

const Terms = (props: any) => {
  return (
    <Layout
      path="/terms"
      title="プライバシーポリシー"
      database={props.database}
    >
      <div className="rounded bg-white pt-8 pb-16 md:my-8 md:px-10">
        <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
          プライバシーポリシー
        </h1>
        <div className="nbr-block-h1">
          <h1>
            <span>個人情報の利用目的</span>
          </h1>
        </div>
        <div className="nbr-block-p">
          <p>
            <span>
              当ブログでは、メールでのお問い合わせの際に、名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただく場合がございます。
              これらの個人情報は質問に対する回答や返信する場合に利用させていただくものであり、返信以外の目的では利用いたしません。
            </span>
          </p>
        </div>
        <div className="nbr-block-h1">
          <h1>
            <span>個人情報の第三者への開示</span>
          </h1>
        </div>
        <div className="nbr-block-p">
          <p>
            <span>
              当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
              <br />
              <br />
              ・本人のご了解がある場合
              <br />
              ・法令等への協力のため、開示が必要となる場合
            </span>
          </p>
        </div>
        <div className="nbr-block-h1">
          <h1>
            <span>個人情報の開示、訂正、追加、削除、利用停止</span>
          </h1>
        </div>
        <div className="nbr-block-p">
          <p>
            <span>
              ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
            </span>
          </p>
        </div>
        <div className="nbr-block-h1">
          <h1>
            <span>免責事項</span>
          </h1>
        </div>
        <div className="nbr-block-p">
          <p>
            <span>
              当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
              当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
            </span>
          </p>
        </div>
        <div className="nbr-block-h1">
          <h1>
            <span>プライバシーポリシーの変更について</span>
          </h1>
        </div>
        <div className="nbr-block-p">
          <p>
            <span>
              当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </span>
          </p>
        </div>
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

export default Terms;
