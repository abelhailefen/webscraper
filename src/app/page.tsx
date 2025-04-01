"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Search, Filter, BarChart2, Download, RefreshCw } from "lucide-react";
import DataTable from "../components/data-table";
import StatsCards from "../components/stats-cards";
import { Button } from "../components/ui/button";

export default function Home() {
  const [scrapedData, setScrapedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchScrapedData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/scrape-news");
      const data = await response.json();
      setScrapedData(data.articles || []);
    } catch (error) {
      console.error("Error fetching scraped data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScrapedData(); // Fetch data on page load
  }, []);

  //  Calculate Stats Dynamically
  const totalArticles = scrapedData.length;
  const successfulScrapes = scrapedData.filter(article => article.title && article.url).length;
  const failedScrapes = totalArticles - successfulScrapes;
  const dataPoints = totalArticles * 3; // Assuming each article has title, URL, and source

  const stats = [
    { title: "Total Articles", value: totalArticles.toString(), change: "+12%", icon: <BarChart2 className={styles.statsIcon} /> },
    { title: "Successful Scrapes", value: successfulScrapes.toString(), change: "+5%", icon: <BarChart2 className={styles.statsIcon} /> },
    { title: "Failed Scrapes", value: failedScrapes.toString(), change: "-2%", icon: <BarChart2 className={styles.statsIcon} /> },
    { title: "Data Points", value: dataPoints.toString(), change: "+18%", icon: <BarChart2 className={styles.statsIcon} /> },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Web Scraper Dashboard</h1>
            <p className={styles.description}>Monitor and manage your web scraping operations</p>
          </div>
          <div className={styles.actions}>
            <Button className={styles.actionButton} onClick={fetchScrapedData} disabled={loading}>
              <RefreshCw size={16} className={styles.buttonIcon} />
              {loading ? "Scraping..." : "Run New Scrape"}
            </Button>
            <Button variant="outline" className={styles.actionButton} onClick={() => window.location.href = "/api/scrape-news?format=csv"}>
              <Download size={16} className={styles.buttonIcon} />
              Export Data
            </Button>
          </div>
        </header>

        <StatsCards stats={stats} />

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="Search scraped data..." className={styles.searchInput} />
          </div>
          <Button variant="outline" className={styles.filterButton}>
            <Filter size={16} className={styles.buttonIcon} />
            Filters
          </Button>
        </div>

        {/* Display Data Table */}
        <DataTable data={scrapedData} />
      </div>
    </main>
  );
}
