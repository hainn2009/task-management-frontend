import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SignOutIcon from "@mui/icons-material/ExitToApp";
import styled from "styled-components";
import Task from "../../components/Task";
import TasksFilters from "../../components/TasksFilters";
import { useGetTasksQuery } from "../../stores/api/taskApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../stores/hook";
import { logout } from "../../stores/slices/authSlice";
import taskLogo from "../../assets/task.png";
import { User } from "../../stores/slices/authSlice";

const TasksWrapper = styled.div`
    width: 100%;
    max-width: 860px;
    margin: auto;
    padding: 20px;
    box-sizing: border-box;
`;

const TasksHeader = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 3px solid #757c87;
`;

const CreateButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TasksContainer = styled.div`
    padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
    color: #edf4ff;
    text-align: center;
    font-size: 22px;
`;

const SignOutIconContainer = styled.div`
    margin-left: 10px;

    .signOutIcon {
        fill: #edf4ff;
    }
`;

const TasksPage = () => {
    const { search, status } = useAppSelector((state) => state.filters);
    const { data: tasks, error, isLoading } = useGetTasksQuery({ search, status });
    const user = useAppSelector((state) => state.auth.user) as User | null;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(logout());
        navigate("/signin");
    };

    const renderTasks = () => {
        if (!tasks || tasks.length === 0) {
            return <EmptyTasksPlaceholder>No tasks available. Create one?</EmptyTasksPlaceholder>;
        }
        // TODO tại sao chỗ này ae không truyền isCompleted
        return tasks.map((task) => (
            <Task isCompleted={task.isCompleted} key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} isPending={task.isPending} />
        ));
    };

    return (
        <TasksWrapper>
            <TasksHeader>
                <div style={{ textWrap: "nowrap" }}>
                    <h1 style={{ width: "100%", color: "#edf4ff", marginBottom: 0 }}>
                        <img src={taskLogo} alt="Task management logo" width={30} /> Get things done
                    </h1>
                    <p style={{ marginTop: 0, color: "#edf4ff" }}>Hello, {user && user.username}</p>
                </div>

                <CreateButtonContainer>
                    <Fab variant="extended" onClick={() => navigate("/tasks/create")}>
                        <AddIcon />
                        Create Task
                    </Fab>

                    <SignOutIconContainer>
                        <IconButton onClick={handleSignOut}>
                            <SignOutIcon className="signOutIcon" />
                        </IconButton>
                    </SignOutIconContainer>
                </CreateButtonContainer>
            </TasksHeader>

            <TasksFilters />

            {error && <h2>Something went wrong...</h2>}
            {isLoading ? <h2>Loading...</h2> : <TasksContainer>{renderTasks()}</TasksContainer>}
        </TasksWrapper>
    );
};

export default TasksPage;
