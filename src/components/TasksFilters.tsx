import { useState, useCallback, ChangeEvent } from "react";
import { debounce } from "lodash";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { setFilters } from "../stores/slices/filtersSlice";
import { useDispatch } from "react-redux";

const FiltersContainer = styled.div`
    margin-top: 20px;
`;

const ControlContainer = styled.div`
    background-color: #c0cde0;
    border-radius: 5px;
    padding: 10px;
`;

const TasksFilters = () => {
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetFilters = useCallback(
        debounce((search: string, status: string) => {
            dispatch(setFilters({ search, status }));
        }, 500),
        []
    );

    const handleStatusFilterChange = (e: SelectChangeEvent) => {
        setStatus(e.target.value);
        debouncedSetFilters(search, e.target.value);
    };

    const handleSearchFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSetFilters(e.target.value, status);
    };

    return (
        <FiltersContainer>
            <Grid justifyContent="space-between" container>
                <Grid>
                    <ControlContainer>
                        <FormControl style={{ width: "220px" }}>
                            <TextField
                                placeholder="Search..."
                                value={search}
                                onChange={handleSearchFilterChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </FormControl>
                    </ControlContainer>
                </Grid>

                <Grid>
                    <ControlContainer>
                        <FormControl style={{ width: "220px" }}>
                            <Select value={status} onChange={handleStatusFilterChange} displayEmpty>
                                <MenuItem value="">No status filter</MenuItem>
                                <MenuItem value={"OPEN"}>Open</MenuItem>
                                <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                <MenuItem value={"DONE"}>Done</MenuItem>
                            </Select>
                        </FormControl>
                    </ControlContainer>
                </Grid>
            </Grid>
        </FiltersContainer>
    );
};

export default TasksFilters;
