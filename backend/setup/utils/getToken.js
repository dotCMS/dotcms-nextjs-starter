import dotcmsApi from '../../../src/dotcmsApi';
import { printError } from './index';

export const getToken = ({ user, password, expirationDays, host }) => {
    return dotcmsApi.auth
        .login({ user, password, expirationDays, host })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }

            if (res.status === 400 || res.status === 401) {
                console.log('\n');
                printError('WRONG CREDENTIALS');
            } else {
                console.log('\n');
                printError(`ERROR ${res.status}`);
            }

            return {};
        })
        .then(res => (res.entity ? res.entity.token : null));
};
