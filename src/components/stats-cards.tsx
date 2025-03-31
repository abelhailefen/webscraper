import type React from "react"
import styles from "@/styles/stats-cards.module.css"

interface Stat {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

interface StatsCardsProps {
  stats: Stat[]
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={styles.statIcon}>{stat.icon}</div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>{stat.title}</h3>
            <div className={styles.statValueContainer}>
              <p className={styles.statValue}>{stat.value}</p>
              <span className={styles.statChange}>
                {stat.change.startsWith("+") ? (
                  <span className={styles.positive}>{stat.change}</span>
                ) : (
                  <span className={styles.negative}>{stat.change}</span>
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

