import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
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
    const [isLoading, setIsLoading] = useState(false);

    const [signIn] = useSignInMutation();
    const navigate = useNavigate();

    const submit = async () => {
        setErrorMessage("");

        try {
            setIsLoading(true);
            await signIn({ username, password }).unwrap();
            setIsLoading(false);
            navigate("/tasks");
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errMsg = "error" in error ? error.error : (error?.data as { message?: string })?.message;
                console.error("FetchBaseQueryError:", errMsg, { variant: "error" });
                setErrorMessage(errMsg || "");
                setIsLoading(false);
            } else if (isErrorWithMessage(error)) {
                console.error("SerializedError:", error.message, { variant: "error" });
                setErrorMessage(error.message);
                setIsLoading(false);
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
                        {isLoading && <CircularProgress color="inherit" size="18px" style={{ marginRight: "5px" }} />} SIGN IN
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
