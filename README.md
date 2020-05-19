# DotCMS Single Page App

[![Netlify Status](https://api.netlify.com/api/v1/badges/d8219585-5108-44db-9965-b097324bc6a6/deploy-status)](https://app.netlify.com/sites/dotcms-spa-demo/deploys)

DotCMS as a hybrid CMS allows you not only edit regular pages but also Single Page Apps.

This projects works as a starter to create your Single Page App with all the needs to make it ediable by DotCMS edit capabilities.

## NextJS
We are using the latest [NextJS](https://nextjs.org/) features to statically render all the DotCMS pages and publish it to [Netlify](https://netlify.com)

### SSG
With the release of NextJS 9.4 you can use its [Static Site Generator](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support) feature to create static DotCMS pages in build time, this is the approach we took here, in a overview we:

1. We pull all the pages from DotCMS instance
2. Generate each page with React Components
3. Public to Netlify

## NextJS + Express

We are using [NextJS](https://nextjs.org/) but with a [custom](https://nextjs.org/docs#custom-server-and-routing) [NodeJS](https://nodejs.org/en/) with [Express framework](https://expressjs.com/). This server handle the POST request for our [Single-page Application (SPA) Editor](https://www.youtube.com/watch?v=8JhoHHtcj6g&feature=emb_title)


## Getting Started

1. Run `npm i`
2. Run `npm run setup:dev`
3. This will promp you with some question about the project
4. Get DotCMS token
5. Create the `.env` file and start dev server

## Build and generate pages

You can run: `npm run buildl npm run export` this will spit out all your pages in `out` folder.

## Tests

Run `npm run test`.

We are using Jest and Enzime for tests.
