# Mantine Next.js template

This is a template for [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/).
If you want to use pages router instead, see [next-pages-template](https://github.com/mantinedev/next-pages-template).

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## Install Scripts

### Node

1. Install [NVM - Node Version Manager](https://github.com/coreybutler/nvm-windows#readme)
2. Run `nvm install latest` - downloads the latest version of node.js / npm
3. Run `nvm use node` - use the latest version downloaded

### Next.js

1. Run `npm install next@latest react@latest react-dom@latest` do download essential packages

### Yarn

1. Run `npm install --global yarn` to install yarn
2. Run `yarn install` to install the packages

### Vercel
[Vercel](https://vercel.com) is used to manage the deployment of next.js apps. [Vercel CLI](https://vercel.com/docs/cli) is used to manage this deployment via the commandline

1. Run `npm i -g vercel` to install vercel
2. Run `vercel login` to authenticate yourself with your deployment
3. Run `vercel link` to link the project to your deployment
4. Run `vercel env pull` to grab the .env file

Each commit should run an auto redeploy

## Prisma
[Prisma](https://www.prisma.io/docs/getting-started) is an ORM (Object Relational Mapper) tool that maps your database schema to typescript Objects. In this project it is used to interface with a [postgres database](https://vercel.com/callens-projects-7eb10345/outbackbay/stores/postgres/store_xyk8UdT5cudU509C/data)

The `schema.prisma` file is how you define table/object relationships. It also includes database connection strings
Any time this file is changed, run `npx prisma db push` to create the new tables and `npx prisma generate` to create update the client
To open the dbms, run `npx prisma studio`
Run `npx prisma db seed` to populate data from seed.ts

## npm scripts
*Start each command with `npm run`*

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
