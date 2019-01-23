import DotCMSApi from '../../src/libs/dotcms.api';

export const getToken = ({ user, password, expirationDays, host }) => {
    return DotCMSApi.auth.login({ user, password, expirationDays, host })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }

            if (res.status === 400 || res.status === 401) {
                console.log(
                    '------------------------------------\nWRONG CREDENTIALS \n------------------------------------'
                );
            } else {
                console.log(
                    `------------------------------------\nERROR ${res.status}\n------------------------------------`
                );
            }

            return {};
        })
        .then(res => (res.entity ? res.entity.token : null));
};