import { mockUsers } from "../data/mock-users";

export const authenticateUser = (email: string, password: string) => {
    return mockUsers.find(user => user.email === email && user.password === password);
};

export const getUsers = () => {
    return mockUsers || [];
}