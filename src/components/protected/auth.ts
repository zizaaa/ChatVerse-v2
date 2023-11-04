import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const authenticate = () => {
      // Check if userID and userToken cookies exist
        const userID = Cookies.get('userUID');
        const accessToken = Cookies.get('accessToken');

        if (!userID || !accessToken) {
            return false;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;
    
            // Check if the token's expiration time is in the future
            return decodedToken.exp > currentTime;
        } catch (error) {
            // Token decoding error or invalid token
            return false;
        }
};

export default authenticate