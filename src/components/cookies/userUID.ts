import Cookies from 'js-cookie'

function userUID (){
    const userUID = Cookies.get('userUID');
    return userUID
}

export default userUID