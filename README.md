# WoodenFish Website

禅意官网（中 / 英），对应 App：[WoodenFish - Electronic](https://apps.apple.com/us/app/woodenfish-electronic/id6450141503)

字体：Noto Sans SC + Zen Maru Gothic + Manrope（无衬线，不用宋体）。

SEO：canonical / hreflang / Open Graph / Twitter Card / JSON-LD / robots.txt / sitemap.xml / webmanifest。

## 本地预览

```bash
cd website
python3 -m http.server 8080
```

打开 http://localhost:8080

## 部署到 GitHub Pages

仓库配置的官网地址为 `https://yugakhan.github.io/muyu/`。

可将 `website/` 目录内容发布到 `gh-pages` 分支，或复制到仓库根目录的 `docs/`（若启用 Pages from `/docs`）。

```bash
# 示例：把 website 推到 gh-pages
git subtree push --prefix website origin gh-pages
```
