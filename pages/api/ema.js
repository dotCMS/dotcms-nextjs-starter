import next from 'next';
import dotcms from '../../config/dotcms';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

export default async function(req, res) {
  return new Promise( async () => {
    switch (req.method) {
      case "POST": {
         console.log('POST from dotCMS')
         await app.prepare();
         const page = JSON.parse(req.body.dotPageData).entity;
         const pageRender = await dotcms.transformPage(page);
         const nav = await dotcms.getNav(4);
         app.setAssetPrefix('https://3e850c4f7b2b.ngrok.io/');
         app.render(req, res, '/ema', {pageRender, nav});
      }  
    }

  })
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb'
        }
    }
};