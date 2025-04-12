import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import "./SignInPage.css";
import ErrorMessage from "../../components/ErrorMessage";
import { useSignInMutation } from "../../stores/api/authApi";
import { useNavigate } from "react-router";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../stores/api/helpers";

const Heading = styled.h1`
    margin-top: 0;
`;

const FormContainer = styled.div`
    max-width: 480px;
    width: 100%;
    background-color: #edf4ff;
    padding: 30px;
    border-radius: 5px;
`;

const FormField = styled(TextField)`
    width: 100%;
`;

const SignInPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [signIn] = useSignInMutation();
    const navigate = useNavigate();

    const submit = async () => {
        setErrorMessage("");

        try {
            await signIn({ username, password }).unwrap();
            navigate("/tasks");
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
                console.error("FetchBaseQueryError:", errMsg, { variant: "error" });
                setErrorMessage(errMsg);
            } else if (isErrorWithMessage(error)) {
                console.error("SerializedError:", error.message, { variant: "error" });
                setErrorMessage(error.message);
            }
        }
    };

    const goToSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="fullscreen-wrapper">
            <FormContainer>
                {/* <h1 style={{ marginTop: 0 }}>Hello!</h1> */}
                <Heading>Hello!</Heading>
                <p>Fill in your username and password to sign in.</p>

                {errorMessage && <ErrorMessage message={errorMessage} />}

                <div>
                    <FormField id="outlined-name" label="Username" margin="dense" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <FormField
                        id="outlined-password"
                        label="Password"
                        margin="dense"
                        variant="outlined"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <hr />
                <div>
                    <Button style={{ marginBottom: "10px" }} fullWidth variant="contained" color="primary" onClick={submit}>
                        SIGN IN
                    </Button>

                    <Button fullWidth onClick={goToSignUp}>
                        Don&apos;t have an account? Sign up now!
                    </Button>
                </div>
            </FormContainer>
        </div>
    );
};

export default SignInPage;
