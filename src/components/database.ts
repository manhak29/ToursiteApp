export interface User {
    email: string;
    password: string;
}

// Save user data to localStorage
export const saveUser = (user: User): void => {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

// Retrieve all users from localStorage
export const getAllUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

// Check if a user exists
export const doesUserExist = (email: string): boolean => {
    const users = getAllUsers();
    return users.some((user) => user.email === email);
};

// Validate user credentials
export const isUserValid = (email: string, password: string): boolean => {
    const users = getAllUsers();
    return users.some((user) => user.email === email && user.password === password);
};