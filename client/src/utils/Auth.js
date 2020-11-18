export const checkAuth = () => {
    try {
        const token = localStorage.getItem("auth-token");
        if(!token) return false;
        return true;
    } catch (error) {
        return false;
    }
}