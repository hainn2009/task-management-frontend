import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { useUpdateTaskStatusMutation, useDeleteTaskMutation } from "../stores/api/taskApi";
import { TaskType } from "../stores/api/taskApi";

const CardContainer = styled.div`
    margin-bottom: 20px;
`;

const CardTitle = styled.h1`
    margin: 8px 0;
    font-size: 22px;
`;

const Task = ({ id, title, description, status }: TaskType) => {
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const handleStatusChange = (e: SelectChangeEvent) => {
        updateTaskStatus({ id, status: e.target.value });
    };

    return (
        <CardContainer>
            <Card>
                <CardContent>
                    <CardTitle>{title}</CardTitle>
                    {description}
                </CardContent>
                <CardActions style={{ padding: "14px" }} disableSpacing>
                    <Grid justifyContent="space-between" container>
                        <Grid>
                            <FormControl style={{ width: "140px" }}>
                                <Select value={status} onChange={handleStatusChange} displayEmpty>
                                    <MenuItem value={"OPEN"}>Open</MenuItem>
                                    <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                    <MenuItem value={"DONE"}>Done</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid>
                            <IconButton onClick={() => deleteTask(id)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </CardContainer>
    );
};

export default Task;
