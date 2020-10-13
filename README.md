# DotCMS JamStack Starter
For this project we used [NextJS](https://nextjs.org/) to build a [JamStack Website](https://jamstack.org/) which data (pages and content) came fully from [DotCMS](https://dotcms.com).

Additionally we have a server [NodeJS](https://nodejs.org/) that allows you to edit your JamStack pages from [DotCMS](https://dotcms.com).

If you want information on how we build all this, you can see these two videos:

1. [Build and deploy your Jamstack with NextJS and GraphQL](https://www.youtube.com/watch?v=zy7xr7TcqUo)
2. [Making your Jamstack application editable in real-time with dotCMS](https://www.youtube.com/watch?v=3vjdxjfkZRQ)

## DotCMS
[DotCMS](https://dotcms.com) as a [hybrid CMS](https://dotcms.com/product/hybrid-cms) allows you not only edit regular pages, Single Page Apps or any kind of JamStack websites.

## NextJS
We are using the latest [NextJS](https://nextjs.org/) features to statically render all the DotCMS pages and publish it to [Vercel](https://vercel.com) and [Heroku](https://heroku.com)

With the release of NextJS 9.4 you can use its [Static Site Generator](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support) feature to create static DotCMS pages in build time, this is the approach we took here, in a overview we:

1. We pull all the pages from DotCMS instance
2. Statically generate each page with React Components
3. Publish to Vercel

----------------------------

## Getting Started

### Install dependencies
Run `yarn`

### Create environmental variables
Run `yarn setup` and follow the instructions

----------------------------

### NextJS

#### Development
Run `yarn dev` this will start you NextJS application in development mode with hot-code reloading, error reporting, and [more](https://nextjs.org/docs/api-reference/cli#development).

#### Build and run in production

Run `yarn build` creates an optimized production build of your application. The output displays information about each route, [more information](https://nextjs.org/docs/api-reference/cli#build).

Run `yarn start` starts the application in production mode. The application should be compiled with `next build` first, [more information](https://nextjs.org/docs/api-reference/cli#production)

----------------------------

### NodeJS Server (Edit Mode Anywhere)

We are using [NextJS](https://nextjs.org/) but with a [custom](https://nextjs.org/docs#custom-server-and-routing) [NodeJS](https://nodejs.org/en/) with [Express framework](https://expressjs.com/).

To run locally and test your EMA server, run `yarn ema`

## Deploy
We have two deploys here, one to [Vercel](https://vercel.com/) (our JamStack Website) and the Edit Mode Anywhere Server to [Heroku](https://heroku.com/)

### Deploy NextJS Website to Vercel

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

### Deploy NodeJS Server to Heroku

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

### Docker for Edit Mode Anywhere
1. Install [Docker](https://www.docker.com/get-started)
2. Build the image: `docker build -t dotcms/dotcms-spa:YOUR_VERSION .`
3. Run locally: `docker run -p 5000:5000 dotcms/dotcms-spa:YOUR_VERSION`
