import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const instance = makeUseAxios({
    axios: axios.create({
        baseURL: 'https://hotel-server-p3pz.onrender.com/'
    })
})

export default instance;