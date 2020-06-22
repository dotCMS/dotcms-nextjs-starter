import next from 'next';
import dotcms from '../../config/dotcms';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

export default (req, res) => {
    if(req.method === "GET") {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify({ name: 'John Doe' }));
    } 
};
