# 部署

產出是**純靜態網頁**（唯一外部相依是 MathJax CDN），任何靜態主機都能放。

## Cloudflare Pages（推薦）

免費額度寬鬆、部署快、不會像 Netlify 那樣扣 credit。

```bash
# 第一次：建立專案
npx wrangler pages project create 我的專案名 --production-branch main

# 每次部署
npx wrangler pages deploy 我的複習網站 --project-name 我的專案名 --branch main --commit-dirty=true
```

網址即 `https://我的專案名.pages.dev`。

**踩過的坑：**

- 首次部署後 **20~60 秒內可能回 522**（邊緣節點還在傳播），稍候重整即可。
  瀏覽器若已快取錯誤頁，加上 `?r=1` 之類的參數強制重取。
- 若 wrangler 報 **Project not found** 或帳號不對，先確認環境變數
  `CLOUDFLARE_API_TOKEN` 沒有指向別的帳號（它會蓋掉 wrangler 自己的 OAuth 登入）。
  該次指令可用 `env -u CLOUDFLARE_API_TOKEN npx wrangler …` 繞過。

## Netlify

```bash
# 建立站台
netlify sites:create --name 我的站名 --json

# 部署（--prod 在某些帳號會回 403，用兩段式最保險）
netlify deploy --dir 我的複習網站 --site <SITE_ID> --json
netlify api restoreSiteDeploy --data '{"site_id":"<SITE_ID>","deploy_id":"<上一步的 deploy_id>"}'
```

**踩過的坑：** 環境變數 `NETLIFY_AUTH_TOKEN` 會蓋掉設定檔的登入身分，
導致 **Project not found**。該次指令用 `env -u NETLIFY_AUTH_TOKEN netlify …` 即可。

## GitHub Pages

把資料夾內容推到 repo，Settings → Pages → 選分支即可。
注意 repo 若是 private，Pages 需要付費方案。

---

## 每次改版必做

**改了 `chN.js` 就要同步更新 `index.html` 裡的 `?v=` 版本號。**

```bash
# 例：一次把所有資源版本號換成今天日期
sed -i "s/?v=[0-9a-z]*/?v=$(date +%Y%m%d)/g" 我的複習網站/index.html
```

沒改版本號的話，學生的瀏覽器會拿到**快取的舊章節**——你會以為部署沒生效，
其實是快取。這個坑很容易重複踩。

部署後驗證：

```bash
curl -s https://我的專案名.pages.dev | grep -o 'engine.js?v=[0-9a-z]*'
```

## 多份簡報共用引擎時

`engine.js`／`style.css`／`svg.js` 是所有簡報**共用的同一份**。
改了其中一個，要**每一個資料夾都複製一次**再各自部署，否則規格會分歧
（曾經發生某一冊落後兩版，缺了自動縮放與放大功能）。

```bash
for d in 複習網站一 複習網站二 複習網站三; do
  cp 主要版本/engine.js 主要版本/style.css 主要版本/svg.js "$d/"
done
```
