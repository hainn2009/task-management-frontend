import { Routes, Route } from "react-router";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import TasksPage from "./pages/tasks/TasksPage";
import CreateTaskPage from "./pages/create-task/CreateTaskPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    // const test;
    return (
        <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signin/" element={<SignInPage />} />
            <Route path="/signup/" element={<SignUpPage />} />
            <Route path="tasks" element={<ProtectedRoute />}>
                <Route index element={<TasksPage />} />
                <Route path="create" element={<CreateTaskPage />} />
            </Route>
        </Routes>
    );
}

export default App;
