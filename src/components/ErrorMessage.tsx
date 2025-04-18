import styled from "styled-components";

const ErrorContainer = styled.div`
    width: 100%;
    padding: 8px 16px;
    background-color: #f7c5c0;
    color: #a51809;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const ErrorHeading = styled.h1`
    font-size: 18px;
    margin: 10px 0;
`;

const ErrorList = styled.ul`
    padding-left: 20px;
`;

export default function ErrorMessage({ message }: { message: string | string[] }) {
    const renderMessageArray = (errors: string[]) => {
        const constraints = errors.map((constraint, idx) => <li key={idx}>{constraint}</li>);

        return <ErrorList>{constraints}</ErrorList>;
    };
    return (
        <ErrorContainer>
            <ErrorHeading>Oops!</ErrorHeading>
            {Array.isArray(message) ? renderMessageArray(message) : <p>{message}</p>}
        </ErrorContainer>
    );
}
