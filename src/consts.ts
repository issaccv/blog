import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'issacc Blog',
  description: 'Anything about AI, Python and HomeLab',
  href: 'https://www.issacc.top',
  author: 'issacc',
  locale: 'zh-CN',
  featuredPostCount: 3,
  postsPerPage: 5,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  // {
  //   href: '/about',
  //   label: 'about',
  // },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/issaccv',
    label: 'GitHub',
  },
  {
    href: 'mailto:simple.fowl.qthe+guardmail@mask.me',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
