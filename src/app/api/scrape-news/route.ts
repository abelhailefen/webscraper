import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    const bbcResponse = await axios.get("https://www.bbc.com/news");
    const $ = cheerio.load(bbcResponse.data);
    const articles: any[] = [];

    $("a.gs-c-promo-heading").each((i, element) => {
      const title = $(element).text().trim();
      const url = $(element).attr("href");
      if (title && url) {
        articles.push({
          title,
          url: url.startsWith("http") ? url : `https://www.bbc.com${url}`,
          source: "BBC",
        });
      }
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Error scraping news:", error);
    return NextResponse.json({ error: "Failed to scrape news" }, { status: 500 });
  }
}
