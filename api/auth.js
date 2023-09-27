import api from "../src/apis";

export default class auth {
    static login(formData) {
        return new Promise((resolve, reject) => {
            api.get(`sanctum/csrf-cookie`)
                .then(function ({data}) {
                    api.post('login', formData)
                        .then(function ({data}) {
                            resolve(data);
                        })
                        .catch(function (error) {
                            resolve(error);
                        });
                })
                .catch(function (error) {
                    resolve(error);
                });
        });
    }

    static logout() {
        return new Promise((resolve, reject) => {
            api.post('logout')
                .then(function ({data}) {
                    resolve(null, data);
                })
                .catch(function (error) {
                    resolve(error);
                });
        });
    }

    static user() {
        return new Promise((resolve, reject) => {
            api.get('api/user')
                .then(function ({data}) {
                    resolve(null, data);
                })
                .catch(function (error) {
                    resolve(error);
                });
        });
    }

}

