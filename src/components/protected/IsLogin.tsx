import { Navigate } from 'react-router-dom'

const IsLogIn = ({ authenticate, children }) => {
    if (!authenticate()) {
        return children
    }

    return <Navigate to="/" replace />
}

export default IsLogIn