import axios from "axios";
axios.defaults.withCredentials = true

export default class auth {
    static login(formData) {
        return new Promise((resolve, reject) => {
            axios.post('login', formData)
                .then(function ({data}) {
                    console.log(data)
                    resolve(null, data);
                })
                .catch(function (error) {
                    resolve(error);
                });

        });
    }
    static csrf(){
        return new Promise((resolve, reject) => {
            axios.get(`sanctum/csrf-cookie`)
                .then(function ({data}) {
                    resolve(null, data);
                })
                .catch(function (error) {
                    resolve(error);
                });

        });
    }
}

