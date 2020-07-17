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

### Deploy to Vercel

1. Run `yarn install`
2. Run `yarn setup`
  2.1 This command will setup a `.env` file for you. 
    - If you don't have an `.env` file in your project then select 'Y' in the first question.
    - In `DotCMS URL` enter the DotCMS instance where your data is stored
    - Public URL is the URL where you deploy your server. (Preferably Heroku or a non-serverless platform)
    - Enter the username and password of the DotCMS instance.
   ![Terminal image](https://user-images.githubusercontent.com/52452/87805492-b0128300-c855-11ea-9571-e0b09bfc6a5c.png)
3. Install the vercel cli with `yarn global add vercel`
4. Login to Vercel from the terminal with `vercel login`
5. Deploy with `vercel --prod`

## Deploy to Heroku

1. Run `yarn install`
2. Run `yarn setup` if you don't have an `.env` file and follow the steps 2.1 from the section "Deploy to Vercel"
3. Install the heroku cli with `brew tap heroku/brew && brew install heroku`
4. Login to Heroku from the terminal with `heroku login`
5. Run `heroku create` to create a new project in Heroku.
  5.1. This command will return a URL that we will use as the `DEPLOY_URL` environment variable (e.g. https://app-random-name.herokuapp.com)
  5.2 Go to the `.env` file and update the `DEPLOY_URL` environment variable
6. Go to https://dashboard.heroku.com/apps > app-random-name > Settings > Config Vars > Reveal Config Vars and paste all your environment variables.

![Heroku](https://user-images.githubusercontent.com/52452/87805493-b1dc4680-c855-11ea-9880-e9605ea3ee0f.png)

7. Deploy with `git push heroku master`

## Build and start your JAMStack server

You can run: `yarn build` and `yarn start`

## Tests

Run `yarn test`.
