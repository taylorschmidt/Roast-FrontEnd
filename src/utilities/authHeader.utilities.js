//importing getItem from another utility so we can access it in the funcion below
import { getItem } from './localStorage.utilities'

export default function authHeader(){
    //grabbing user from local storage (provided by browser)
    const user = getItem('user')
    //check is user was in the local storage and if the user has an access token
    if(user && user.accessToken){
        return { 'x-access-token': user.accessToken}
    }else{
        return{}
    }
}
