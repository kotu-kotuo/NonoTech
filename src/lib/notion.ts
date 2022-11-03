import { PageType } from "@/types/types";
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

export const fetchPages = async ({
  slug,
  category,
  tag,
}: {
  slug?: string;
  category?: string;
  tag?: string;
}) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug,
      },
    });
  }

  if (category) {
    and.push({
      property: "category",
      select: {
        equals: category,
      },
    });
  }

  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "publishedAt",
        direction: "descending",
      },
    ],
  });
};

export const searchPages = async (query: string) => {
  const results: any = await notion.search({
    query: query,
    filter: {
      value: "page",
      property: "object",
    },
    sort: {
      direction: "descending",
      timestamp: "last_edited_time",
    },
  });
  return await results.results.filter(
    (result: PageType) => result.properties.isPublic.checkbox === true
  );
};

export const fetchBlocksByPageId = async (pageId: string) => {
  const data = [];
  let cursor = undefined;
  while (true) {
    const { results, next_cursor }: any = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    data.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  return { results: data };
};

export const getPage = async (pageId: string) => {
  const notionX = await new NotionAPI({
    activeUser: process.env.NOTION_USER_ID,
    authToken: process.env.NOTION_TOKEN_V2,
  });

  const recordMap = await notionX.getPage(pageId);
  return recordMap;
};

export const fetchDatabase = async () => {
  if (!DATABASE_ID) return;
  const response = await notion.databases.retrieve({
    database_id: DATABASE_ID,
  });
  return { response: response };
};
