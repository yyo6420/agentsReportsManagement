const login = async (request, response) => {
    try {
        const newLogin = {
            agentCode: request.body.agentCode || "",
            password: request.body.password || ""
        }

        if (newLogin.agentCode === "" || newLogin.password === "") {
            response.status(400).json({ massage: "you must type a agentCode and password" })
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({ massage: `error: ${error.massage}` })
    }
}