import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    console.log("Fetching news...");
    
    // Scrape BBC
    const bbcResponse = await axios.get("https://www.bbc.com/news", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    console.log("BBC Response Received");

    const $bbc = cheerio.load(bbcResponse.data);
    const articles: any[] = [];

    // Scrape BBC headlines
    $bbc('h2[data-testid="card-headline"], h2[data-editable="title"]').each((i, element) => {
      const title = $bbc(element).text().trim();
      const parentLink = $bbc(element).closest("a");
      const url = parentLink.attr("href");

      if (title && url) {
        articles.push({
          title,
          url: url.startsWith("http") ? url : `https://www.bbc.com${url}`,
          source: "BBC",
        });
      }
    });

    // Scrape CNN
    const cnnResponse = await axios.get("https://edition.cnn.com/world", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    console.log("CNN Response Received");

    const $cnn = cheerio.load(cnnResponse.data);

    $cnn('h2.container__title_url-text').each((i, element) => {
      const title = $cnn(element).text().trim();
      const parentLink = $cnn(element).closest("a");
      const url = parentLink.attr("href");

      if (title && url) {
        articles.push({
          title,
          url: url.startsWith("http") ? url : `https://edition.cnn.com${url}`,
          source: "CNN",
        });
      }
    });

    console.log("Scraped Articles:", articles);

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error scraping news:", error);
    return NextResponse.json({ error: "Failed to scrape news" }, { status: 500 });
  }
}
