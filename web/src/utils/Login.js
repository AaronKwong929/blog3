import router from '../router/index'

export const login = (name, token) => {
    localStorage.setItem(`name`, name);
    localStorage.setItem(`token`, token)
    router.push(`/admin`);
};


export const logout = () => {
    localStorage.removeItem(`name`);
    localStorage.removeItem(`token`);
    router.push(`/login`);
};