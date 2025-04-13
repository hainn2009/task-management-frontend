import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";
import styled from "styled-components";

import "./SignUpPage.css";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router";
import { useSignUpMutation } from "../../stores/api/authApi";
import { isFetchBaseQueryError, isErrorWithMessage } from "../../stores/api/helpers";

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

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [signUp] = useSignUpMutation();
    const navigate = useNavigate();

    const submit = async () => {
        try {
            setIsLoading(true);
            await signUp({ username, password }).unwrap();
            setIsLoading(false);
            navigate("/signin");
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

    return (
        <div className="fullscreen-wrapper">
            <FormContainer>
                <Heading>Join us!</Heading>
                <p>Start managing tasks easily.</p>

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
                <p>Passwords must contain at least 1 upper case letter, 1 lower case letter and one number OR special charracter.</p>
                <hr />
                <div>
                    <Button fullWidth variant="contained" color="primary" onClick={submit}>
                        {isLoading && <CircularProgress color="inherit" size="18px" style={{ marginRight: "5px" }} />} SIGN UP
                    </Button>
                </div>
            </FormContainer>
        </div>
    );
};

export default SignUpPage;
