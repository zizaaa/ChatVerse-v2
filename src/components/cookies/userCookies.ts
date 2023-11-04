import Cookies from 'js-cookie'

function userCookies (userUID:any, accessToken:any){
    Cookies.set('accessToken', accessToken, { expires: 7 }); // Expires in 7 days
    Cookies.set('userUID',userUID, {expires: 7})
}

export default userCookies