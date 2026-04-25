# Duck Island Icecream — sample storefront

Minimal **Next.js** demo site for the `duck-island-icecream` workspace. Use it as the fake “product under support” while the faux client opens tickets in the WarpDesk app.

## Run locally

```bash
cd sample-storefront
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is busy, Next.js will suggest another port in the terminal.

## Build

```bash
npm run build
npm start
```

No environment variables are required. This app does not connect to Supabase or the ticketing API.

## Header logo

The home page header uses the **official wordmark SVGs** (gold gradient + purple paths), inlined via [`components/duck-island-logo-markup.ts`](components/duck-island-logo-markup.ts). Update that file if brand bar markup changes.
