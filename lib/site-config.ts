import siteJson from "@/content/site.json"

export interface SiteConfig {
  name: string
  shortName: string
  description: string
  themeColor: string
  hero: {
    badge: string
    headline: string
    subtitle: string
    stats: Array<{ label: string; colorKey: string }>
  }
  nav: {
    home: string
    appName: string
    topics: string
    problems: string
  }
  home: {
    allTopicsTitle: string
    allTopicsDescription: string
    problemsTitle: string
    problemsDescription: string
  }
  problemsPage: {
    title: string
    description: string
    heading: string
    subheading: string
  }
}

export const siteConfig: SiteConfig = siteJson as SiteConfig
