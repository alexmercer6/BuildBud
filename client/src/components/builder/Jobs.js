import "./Builder.css"
import axios from "axios"
import { Box } from "@mui/system"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../UserContext"
import HouseIcon from "@mui/icons-material/House"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import {
    TextField,
    List,
    ListItemText,
    ListItemButton,
    Button,
    Modal,
} from "@mui/material"

function Jobs({ data, formInput, setFormInput, setClicked, clicked }) {
    const { user } = useContext(UserContext)
    const [search, setSearch] = useState("")
    const [parent] = useAutoAnimate(/* optional config */)
    const navigate = useNavigate()

    const redirectTo = (location, event) => {
        event.preventDefault()
        navigate(location)
    }

    const deleteJob = async (id, event) => {
        const response = await axios.delete(`/api/builder/jobs/${id}`)
        console.log(response)
        setClicked(!clicked)
        event.stopPropagation()
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <AddJobsModal
                formInput={formInput}
                setFormInput={setFormInput}
                clicked={clicked}
                setClicked={setClicked}
            />
            <TextField
                id="standard-basic"
                label="Search Jobs"
                variant="standard"
                fullWidth={true}
                onChange={(event) => {
                    handleChange(event)
                }}
            />
            <div className="listContainer" ref={parent}>
                {data
                    .filter((job) =>
                        job.address.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((house, index) => {
                        return (
                            <List key={index} color="primary">
                                <ListItemButton
                                    variant="link"
                                    onClick={(event) => {
                                        redirectTo(
                                            `/builder-dashboard/${user.sessionId}/job/${house.job_id}`,
                                            event
                                        )
                                    }}
                                >
                                    <HouseIcon />
                                    <ListItemText>{house.address}</ListItemText>
                                    <Button
                                        onClick={(event) => {
                                            console.log("clicked", event.target)
                                            deleteJob(house.job_id, event)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </ListItemButton>
                            </List>
                        )
                    })}
            </div>
        </div>
    )
}

function AddJobsModal({ formInput, setFormInput, clicked, setClicked }) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        // border: "2px solid primary",
        boxShadow: 24,
        p: 4,
    }

    //temporary placeholder until I add sessions
    const builder_id = 1

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleInput = (event) => {
        const name = event.target.name
        const newValue = event.target.value

        setFormInput({ ...formInput, [name]: newValue })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios
            .post(`/api/builder/jobs/${builder_id}`, formInput)
            .then((response) => {
                console.log(response)
                handleClose()
                setClicked(!clicked)
            })
    }
    return (
        <div>
            <Button onClick={handleOpen}>
                <AddBusinessIcon />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className="add-job-modal">
                    <form>
                        <TextField
                            required
                            name="lotNumber"
                            label="Lot Number"
                            variant="standard"
                            onChange={handleInput}
                        />
                        <TextField
                            required
                            label="Street Name"
                            name="streetName"
                            variant="standard"
                            onChange={handleInput}
                        />
                        <TextField
                            required
                            label="Suburb"
                            name="suburb"
                            variant="standard"
                            onChange={handleInput}
                        />
                        <TextField
                            required
                            label="City"
                            name="city"
                            variant="standard"
                            onChange={handleInput}
                        />
                        <TextField
                            required
                            label="Postcode"
                            name="postcode"
                            variant="standard"
                            onChange={handleInput}
                        />
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            variant="contained"
                        >
                            Add Job
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Jobs
