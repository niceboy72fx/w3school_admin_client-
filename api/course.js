import api from "../src/apis";

export default class course {
    static getListApproved() {
        return new Promise((resolve, reject) => {
            api.get('api/admin/course/approved')
                .then(function ({data}) {
                    resolve(data);
                })
                .catch(function (error) {
                    resolve(error);
                });
        });
    }

}

