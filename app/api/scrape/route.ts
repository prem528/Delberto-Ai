// app/api/scrape/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

interface ScrapedData {
  title: string | null;
  description: string | null;
  images: string[];
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({
        error: "No URL provided",
        success: false,
        status: 400,
      });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Scrape the data
    const data: ScrapedData = await page.evaluate(() => {
      const title = document.querySelector("title")?.innerText || null;

      const description =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || null;

          const images = Array.from(document.querySelectorAll("img"))
          .filter((img) => {
            
            return img.classList.contains("imageBlock") || 
                   img.closest("altImages") || 
                   (img.getAttribute("src")?.includes("product"));
          })
          .map((img) => img.getAttribute("src"))
          .filter((src): src is string => !!src);

      return { title, description, images };
    });

    await browser.close();

    return NextResponse.json({
      ...data,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error during scraping:", error);
    return NextResponse.json({
      error: "Failed to scrape the page.",
      success: false,
      status: 500,
    });
  }
}
