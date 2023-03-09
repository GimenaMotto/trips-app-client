import axios from 'axios'

class UploadServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/upload`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

const uploadServices = new UploadServices()

export default uploadServices


// import axios from "axios";

// const api = axios.create({
//     baseURL: `${process.env.REACT_APP_API_URL}`
// })

// const errorHandler = (err) => {
//     throw err;
// }


// const uploadServices = (file) => {
//     return api.post("/upload", file)
//         .then(res => res.data)
//         .catch(errorHandler);
// }


// export default uploadServices

