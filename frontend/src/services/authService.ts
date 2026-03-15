export const login = async (credentials: Record<string, string>) => {
    try {
        const response = await fetch("http://localhost:5008/api/auth/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!data.token) throw new Error(data.message);
        localStorage.setItem("token", data.token);
        return { data, error: null }
    } catch (error) {
        if (!(error instanceof Error)) throw new Error("something went wrong :(")
        console.error(error?.message);
        return { error, data: null };
    }
}