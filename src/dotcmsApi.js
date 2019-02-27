import { initDotCMS } from 'dotcms';

const dotcms = initDotCMS({
    host: 'http://localhost:8080',
    environment: 'development',
    token:
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2OWNlOWUwYi0zZDM5LTQ1ZWQtYWY2Zi1kOGNiYjA2NjA4YjkiLCJpYXQiOjE1NTEyOTA4NjUsInVwZGF0ZWRfYXQiOjEyMDQ4MjQ5NjEwMDAsInN1YiI6ImRvdGNtcy5vcmcuMSIsImlzcyI6IjUyMDgzN2M1LTZkNjktNDVmZS1hYTdjLTgzYzEwOGIxMmNkMiIsImV4cCI6MTU1MjE1NDg2NX0.M92e2uQjIsI5zP1jfg5jV0L6pM9_DSGQqzkT9Oc_nfI'
});

export default dotcms;