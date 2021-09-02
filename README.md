# DotCMS JamStack Starter
For this project we used [NextJS](https://nextjs.org/) to build a [JamStack Website](https://jamstack.org/) which data (pages and content) came fully from [DotCMS](https://dotcms.com).

If you want information on how we build all this, you can see these two videos:

1. [Build and deploy your Jamstack with NextJS and GraphQL](https://www.youtube.com/watch?v=zy7xr7TcqUo)
2. [Making your Jamstack application editable in real-time with dotCMS](https://www.youtube.com/watch?v=3vjdxjfkZRQ)

## DotCMS
[DotCMS](https://dotcms.com) as a [hybrid CMS](https://dotcms.com/product/hybrid-cms) allows you not only edit regular pages, Single Page Apps or any kind of JamStack websites.

## NextJS
We are using the latest [NextJS](https://nextjs.org/) features to statically render all the DotCMS pages.

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

**To run production locally**

1. Create a file `.env.production.local`
2. Add `NEXT_PUBLIC_DEPLOY_URL=http://localhost:3000`

Run `yarn build` creates an optimized production build of your application. The output displays information about each route, [more information](https://nextjs.org/docs/api-reference/cli#build).

Run `yarn start` starts the application in production mode. The application should be compiled with `next build` first, [more information](https://nextjs.org/docs/api-reference/cli#production)

----------------------------

### Edit Mode Anywhere

EMA is a pattern we defined to allow creator to edit JamStack pages. [Read more](https://dotcms.com/blog/post/headless-cms-for-marketers-deep-dive-into-edit-mode-anywhere).

We create a `/pages/ema.js` that will receive the object from DotCMS to create the page and send it back to our editor.

### Docker
1. Install [Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t CONTAINER_NAME .`
3. Run your container: `docker run -p 3000:3000 CONTAINER_NAME`


### Deploy

#### Enviromental variables
For all deploys you need to set 3 env variables

```
# The DotCMS instance URL
NEXT_PUBLIC_DOTCMS_HOST=https://demo.dotcms.com

# The url of your nextjs app
NEXT_PUBLIC_DEPLOY_URL=https://yourdomain.com

# Auth token from DotCMS
BEARER_TOKEN=TOKEN
```

#### Vercel
You can deploy to [Vercel](https://vercel.com/docs/platform/deployments) which is the company behind Nextjs so the support is the best.

#### Netlify
[How to Deploy Next.js Sites to Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)

#### Amazon Web Services
[Deploy a Next.js app using Amplify Hosting](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js)
