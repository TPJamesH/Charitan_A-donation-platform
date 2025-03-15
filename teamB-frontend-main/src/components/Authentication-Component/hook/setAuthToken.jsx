import useJWT from "../../JWT/useJWT";
const setAuthToken = async (options ={}) =>{
    const token = await useJWT.getAccessToken();
    if(token){
      options.header = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    }else{
        delete options.headers['Authorization'];
    }
    return options
}

export default setAuthToken