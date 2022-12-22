import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  CodeBlock,
  CollectionViewBlock,
  CollectionViewPageBlock,
  ExtendedRecordMap,
  PageBlock,
} from "notion-types";
import { ComponentType, FC } from "react";
import { NotionContext, NotionRenderer } from "react-notion-x";
import TweetEmbed from "react-tweet-embed";

const Code: ComponentType<{
  block: CodeBlock;
  defaultLanguage?: string | undefined;
  className?: string | undefined;
}> = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js" as string),
      import("prismjs/components/prism-markup.js" as string),
      import("prismjs/components/prism-bash.js" as string),
      import("prismjs/components/prism-c.js" as string),
      import("prismjs/components/prism-cpp.js" as string),
      import("prismjs/components/prism-csharp.js" as string),
      import("prismjs/components/prism-docker.js" as string),
      import("prismjs/components/prism-java.js" as string),
      import("prismjs/components/prism-js-templates.js" as string),
      import("prismjs/components/prism-coffeescript.js" as string),
      import("prismjs/components/prism-diff.js" as string),
      import("prismjs/components/prism-git.js" as string),
      import("prismjs/components/prism-go.js" as string),
      import("prismjs/components/prism-graphql.js" as string),
      import("prismjs/components/prism-handlebars.js" as string),
      import("prismjs/components/prism-less.js" as string),
      import("prismjs/components/prism-makefile.js" as string),
      import("prismjs/components/prism-markdown.js" as string),
      import("prismjs/components/prism-objectivec.js" as string),
      import("prismjs/components/prism-ocaml.js" as string),
      import("prismjs/components/prism-python.js" as string),
      import("prismjs/components/prism-reason.js" as string),
      import("prismjs/components/prism-rust.js" as string),
      import("prismjs/components/prism-sass.js" as string),
      import("prismjs/components/prism-scss.js" as string),
      import("prismjs/components/prism-solidity.js" as string),
      import("prismjs/components/prism-sql.js" as string),
      import("prismjs/components/prism-stylus.js" as string),
      import("prismjs/components/prism-swift.js" as string),
      import("prismjs/components/prism-wasm.js" as string),
      import("prismjs/components/prism-yaml.js" as string),
    ]);
    return m.Code;
  })
);

const Collection: ComponentType<{
  block: PageBlock | CollectionViewBlock | CollectionViewPageBlock;
  className?: string | undefined;
  ctx: NotionContext;
}> = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />;
};

type NotionPageProps = {
  recordMap: ExtendedRecordMap;
};

const NotionPage: FC<NotionPageProps> = (props) => {
  return (
    <div>
      <NotionRenderer
        recordMap={props.recordMap}
        fullPage={true}
        darkMode={false}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Tweet,
        }}
      />
    </div>
  );
};

export default NotionPage;
