import { initDotCMS } from 'dotcms';

const dotcms = initDotCMS({
    host: 'http://localhost:8080',
    environment: 'development',
    token:
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzFlYWFkZS1mYjhiLTQwY2MtODc4Yi1kYzE1MGZhMGE3N2MiLCJpYXQiOjE1NTA4NDE2MDIsInVwZGF0ZWRfYXQiOjEyMDQ4MjQ5NjEwMDAsInN1YiI6ImRvdGNtcy5vcmcuMSIsImlzcyI6IjJhOWNmYmY3LTUyNDktNGM0Yi05NWE4LTkxMzI5YzE5MTY4MyIsImV4cCI6MTU1MTcwNTYwMn0.dsdGPbzrq9G2i7UIJQRwq-6w6JVWCeNzPzEGgdaQClM'
});

export default dotcms;