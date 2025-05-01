## Getting Started

First, install dependecies:

```bash
npm install
# or
pnpm add .
```

Run development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Prisma Guide

Learn to configure Prisma with NextJS [https://www.prisma.io/docs/guides/nextjs](https://www.prisma.io/docs/guides/nextjs)

### Populate Prisma db with dummy data

```bash
# Add code to package.json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}

# Dummy data exist in seed.ts file

# Make sure tsx package is installed globally
npm i -g tsx

# Run command
npx prisma db seed
```

### Keep schema up to date with input types

```bash
npx prisma migrate dev --name init
```
