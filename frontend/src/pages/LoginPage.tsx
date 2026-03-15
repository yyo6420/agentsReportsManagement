import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import { login } from "../services/authService.ts";

function LoginPage() {
    const [credentials, setCredentials] = useState<Record<string, string>>({});
    const [error, setError] = useState<null | Error>()
    const navigate = useNavigate();


    const handleChange = ({ target }: React.ChangeEvent) => {
        const { id, value } = target as React.ChangeEvent["target"] & { id: string; value: string };
        setCredentials(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();
        const { error, data } = await login(credentials);
        if (error) return setError(error);
        navigate(data.agent.role === "agent" ? "/agentHomePage" : "/adminHomePage");
    }

    return (
        <div className="loginPage">
            <h1 className="welcomeTitle">ברוך הבא</h1>

            <form className="loginDiv" onChange={handleChange} onSubmit={handleSubmit}>
                {error && <p>{error.message}</p>}
                <h2 className="loginTitle">התחברות לאתר:</h2>
                <label className="inputLable" htmlFor="agentCode">שם</label>
                <input type="text" className="loginInput" id="agentCode" />
                <label className="inputLable" htmlFor="password">סיסמא</label>
                <input type="text" className="loginInput" id="password" />
                <button className="loginButton">כניסה למערכת</button>
            </form>
        </div>
    )
}

export default LoginPage