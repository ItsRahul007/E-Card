import axios from "axios";

export async function loginWithEmailPassword({ email, password }: { email: string, password: string }) {
    const response = await axios.post("/api/auth/login", { email, password, socialUser: false });
    return response;
}

export async function signupWithEmailPassword(
    { name, email, password }
        : { name: string, email: string, password: string }) {
    const response = await axios.post("/api/auth/signup", { name, email, password, socialUser: false });
    return response;
}