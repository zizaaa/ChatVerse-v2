import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authenticate, children }) => {
    if (!authenticate()) {
        return <Navigate to="/form/" replace />
    }
  
    return children;
};

export default ProtectedRoute