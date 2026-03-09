import bcrypt, { hash } from "bcrypt";

export const hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

export const verifyPassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}