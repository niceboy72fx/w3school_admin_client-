import api from "../src/apis";

export default class account {
    static getListAccountClient() {
        return new Promise((resolve, reject) => {
            api.get('api/admin/account/client')
                .then(function ({data}) {
                    resolve(data);
                })
                .catch(function (error) {
                    resolve(error);
                });
        });
    }

    static getListAccountCms() {
        return new Promise((resolve, reject) => {
            api.get('api/admin/account/cms')
                .then(function ({data}) {
                    resolve(data);
                })
                .catch(function (error) {
                    resolve(error);
                });
        });
    }
}

