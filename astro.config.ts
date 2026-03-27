import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExpressiveCode from 'rehype-expressive-code'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import type { ExpressiveCodeTheme } from 'rehype-expressive-code'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.issacc.top',
  // base: '/blog',
  integrations: [mdx(), react(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      // Keep generated images consistent without repeating codec options.
      config: {
        jpeg: { mozjpeg: true },
        webp: { effort: 6, alphaQuality: 80 },
        avif: { effort: 4, chromaSubsampling: '4:2:0' },
        png: { compressionLevel: 9 },
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      [
        rehypeExpressiveCode,
        {
          themes: ['github-light', 'github-dark'],
          plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
          useDarkModeMediaQuery: false,
          themeCssSelector: (theme: ExpressiveCodeTheme) =>
            `[data-theme="${theme.name.split('-')[1]}"]`,
          defaultProps: {
            wrap: true,
            collapseStyle: 'collapsible-auto',
            overridesByLang: {
              'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
                {
                  showLineNumbers: false,
                },
            },
          },
          styleOverrides: {
            codeFontSize: '0.75rem',
            borderColor: 'var(--border)',
            codeFontFamily: 'var(--font-mono)',
            codeBackground:
              'color-mix(in oklab, var(--muted) 25%, transparent)',
            frames: {
              editorActiveTabForeground: 'var(--muted-foreground)',
              editorActiveTabBackground:
                'color-mix(in oklab, var(--muted) 25%, transparent)',
              editorActiveTabIndicatorBottomColor: 'transparent',
              editorActiveTabIndicatorTopColor: 'transparent',
              editorTabBorderRadius: '0',
              editorTabBarBackground: 'transparent',
              editorTabBarBorderBottomColor: 'transparent',
              frameBoxShadowCssValue: 'none',
              terminalBackground:
                'color-mix(in oklab, var(--muted) 25%, transparent)',
              terminalTitlebarBackground: 'transparent',
              terminalTitlebarBorderBottomColor: 'transparent',
              terminalTitlebarForeground: 'var(--muted-foreground)',
            },
            lineNumbers: {
              foreground: 'var(--muted-foreground)',
            },
            uiFontFamily: 'var(--font-sans)',
          },
        },
      ],
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          inline: 'tailing-curly-colon',
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
})
