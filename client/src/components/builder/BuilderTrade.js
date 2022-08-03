import axios from "axios"
import Avatar from "@mui/material/Avatar"
import { red } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import { useContext, useEffect, useState } from "react"
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material"

function BuilderTrade() {
    const { user } = useContext(UserContext)
    const [materials, setMaterials] = useState({})
    const [formInput, setFormInput] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [availableTrades, setAvailableTrades] = useState({})
    const [isLoadingAvailableTrades, setIsLoadingAvailableTrades] =
        useState(true)
    const [assignedTrade, setAssignedTrade] = useState({})
    const params = useParams()

    useEffect(() => {
        const getMaterials = async () => {
            const response = await axios.get(
                `/api/builder/materials/user/${user.sessionId}/job/${params.job_id}/${params.trade}`
            )

            setMaterials(response.data)
        }
        getMaterials()
    }, [user, submitted])

    useEffect(() => {
        const getAvailableTrades = async () => {
            const response = await axios.get(`/api/builder/trade/Bricklayer`)
            console.log(response.data)

            setAvailableTrades(response.data)
            setIsLoadingAvailableTrades(false)
        }

        getAvailableTrades()
    }, [])

    const addMaterials = async (data, event) => {
        event.preventDefault()
        const response = await axios.post(
            `/api/trade/materials/user/${user.sessionId}/job/${params.job_id}/${params.trade}`,
            data
        )

        setSubmitted(!submitted)
    }

    const handleInput = (event) => {
        const name = event.target.name
        const newValue = event.target.value

        setFormInput({ ...formInput, [name]: newValue })
    }

    // const materials = [
    //     { material: "Sand", qty: "1 tonne" },
    //     { material: "Flashing", qty: "5" },
    // ]
    return (
        <div className="builder-trade">
            {isLoadingAvailableTrades ? (
                "Loading"
            ) : (
                <FormControl fullWidth>
                    <InputLabel>Available Trades</InputLabel>
                    <Select label="Available Trades">
                        {availableTrades.map((trade) => {
                            return (
                                <MenuItem
                                    value={{ trade }}
                                    onClick={() => {
                                        setAssignedTrade(trade)
                                    }}
                                >
                                    {trade.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            )}
            {Object.keys(assignedTrade).length > 0 ? (
                <div>
                    <div className="builder-trade-heading">
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {assignedTrade.name.charAt(0)}
                        </Avatar>
                        <h1>{assignedTrade.name}</h1>
                    </div>
                    <p>{params.trade}</p>
                </div>
            ) : (
                <p>Assign a {params.trade}</p>
            )}

            <h1>Add Materials:</h1>
            <form>
                <TextField
                    required
                    label="Material"
                    name="material"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
                <TextField
                    required
                    label="Quantity"
                    name="qty"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
                <Button
                    variant="contained"
                    onClick={(event) => {
                        addMaterials(formInput, event)
                    }}
                >
                    Add Materials
                </Button>
            </form>

            <List
                dense
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                <h1>Materials needed:</h1>
                {materials.length > 0 ? (
                    materials.map((material, index) => {
                        return (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        // onChange={handleToggle(value)}
                                        // checked={checked.indexOf(value) !== -1}
                                        // inputProps={{ "aria-labelledby": labelId }}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={material.material}
                                    secondary={material.qty}
                                />
                            </ListItem>
                        )
                    })
                ) : (
                    <p>No materials needed</p>
                )}
            </List>
        </div>
    )
}

export default BuilderTrade
