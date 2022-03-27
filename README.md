This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Techstack used on Monogram test

- Next.js with Typescript, authenticated built on top of `next-firebase-auth`
- `react-hook-form` for form management (used in `Profile` page)
- `swr` for automatically invalidate API calls. This is also the first time I worked with it, more familiar with GraphQL
  & ApolloClient which automate it already
- TailwindCSS with `scss`
- Built-in lints and code-formatters scaffolded by `create-next-app`
- Hosted on `Vercel`
- PostgreSQL provided cheaply by [https://www.elephantsql.com/](https://www.elephantsql.com/) (currently using free
  instance haha), proxied by `prisma`
- of course I'm using `firebase` for simplest authentication way

## Project production preview

[https://monogram-test-xi.vercel.app](https://monogram-test-xi.vercel.app)

## Getting Started

> If you guys need to run this project on local environment, kindly contact me to get firebase credential

First, notify to set 2 required env variables below

```
- process.env.NEXT_FIREBASE_ADMIN_CREDENTIAL
- process.env.DATABASE_URL
```

then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited
in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
