import { initDotCMS } from 'dotcms';

const dotcms = initDotCMS({
    host: 'http://localhost:8080',
    environment: 'development',
    token:
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MGEwNDk0MC01NmEzLTQ1MGQtYWU5Ny0xY2YyY2M2NGUzMTgiLCJpYXQiOjE1NTEyOTI2ODQsInVwZGF0ZWRfYXQiOjEyMDQ4MjQ5NjEwMDAsInN1YiI6ImRvdGNtcy5vcmcuMSIsImlzcyI6IjU2MDk4YTIyLTgzYjEtNDZmMS05ZjZiLWYwMTRmOWI2NjRiMyIsImV4cCI6MTU1MjE1NjY4NH0.U04A_TU4LTKJvLhkLpJkhvCnqwgKFGtsITsZSPDSkpc'
});

export default dotcms;