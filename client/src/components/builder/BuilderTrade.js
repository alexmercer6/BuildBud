import Avatar from "@mui/material/Avatar"
import { red } from "@mui/material/colors"
import { List, ListItem, ListItemText, Checkbox } from "@mui/material"

function BuilderTrade() {
    const trade = {
        name: "Alex Mercer",
        job: "Bricklayer",
        phoneNumber: "0412345678",
        email: "alex@test.com",
    }

    const materials = [
        { material: "Sand", qty: "1 tonne" },
        { material: "Flashing", qty: "5" },
    ]
    return (
        <div className="builder-trade">
            <div className="builder-trade-heading">
                <Avatar sx={{ bgcolor: red[500] }}>
                    {trade.name.charAt(0)}
                </Avatar>
                <h1>{trade.name}</h1>
            </div>
            <p>{trade.job}</p>

            <List
                dense
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                <h1>Materials needed:</h1>
                {materials.map((material, index) => {
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
                })}
            </List>
        </div>
    )
}

export default BuilderTrade
