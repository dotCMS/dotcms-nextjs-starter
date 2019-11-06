# DotCMS Single Page App

DotCMS as a hybrid CMS allows you not only edit regular pages but also Single Page Apps.

This projects works as a starter to create your Single Page App with all the needs to make it ediable by DotCMS edit capabilities.

## NextJS + Express

We are using [NextJS](https://nextjs.org/) but with a [custom](https://nextjs.org/docs#custom-server-and-routing) [NodeJS](https://nodejs.org/en/) with [Express framework](https://expressjs.com/).

### The way this works is:

1. We hit the server
2. Server try to get the page object from DotCMS and render using next
3. If can't get the page from DotCMS it fallback to static pages in NextJS
4. If everything fails NextJS will handle the error.

## Getting Started

1. Run `npm i`
2. Run `npm run setup:dev`
3. This will promp you with some question about the project
4. Get DotCMS token
5. Create the `.env` file and start dev server

## Build

You can run: `npm run build` or `npm run setup:build` if want to update or create `.env` file.

## Tests

Run `npm run test`.

We are using Jest and Enzime for tests.
