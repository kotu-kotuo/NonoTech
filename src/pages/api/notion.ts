import { NextApiRequest, NextApiResponse } from "next";
import { NotionAPI } from "notion-client";

export default async function notion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notionX = await new NotionAPI({
      activeUser: process.env.NOTION_USER_ID,
      authToken: process.env.NOTION_TOKEN_V2,
    });

    const recordMap = await notionX.getPage("10dc8eca895e41dbbfbd069ed766fd07");
    res.status(200).json(recordMap);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
  }
}
