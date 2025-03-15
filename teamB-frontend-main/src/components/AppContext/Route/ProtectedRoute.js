import useProtectedRoutePolicy from "./ProtectedRouteHook";
const ProtectedRoute = ({ children }) => {
    const { user } = useProtectedRoutePolicy();
    if (user.username === 'guest' && user.role === 'guest') {
        window.location.replace("/")
    }
    return children;
};
export default ProtectedRoute;