import axios from "axios";

const instance = axios.create();
instance.defaults.baseURL = "https://react-burger-builder-a91c2.firebaseio.com";

export default instance;
