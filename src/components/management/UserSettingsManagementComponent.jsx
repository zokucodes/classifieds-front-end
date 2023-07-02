import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import BaseManagementComponent from "./BaseManagementComponent"
import { useState } from "react"

const UserSettingsManagementComponent = () => {
    window.history.replaceState(null, "Listings", "/app/manage/settings")

    const [email, setEmail] = useState("")

    return (
        <BaseManagementComponent title={"Settings"}>
            <div className="mt-8 w-full justify-evenly items-start flex flex-row flex-wrap gap-4">
                <Box width={"30%"}>
                    <Typography variant="h6" sx={{ m: 1 }} textAlign={"left"}>My Profile</Typography>
                    <div>
                        <Avatar sx={{ width: 150, height: 150 }} />
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="current_password"
                            label="First Name"
                            name="current_password"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="new_password"
                            label="Last Name"
                            name="new_password"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <Button sx={{ marginTop: "24px" }} variant="contained" fullWidth>
                            Change Password
                        </Button>
                    </div>


                </Box>

                <Box width={"30%"}>
                    <Typography variant="h6" sx={{ m: 1 }} textAlign={"left"}>Login Details</Typography>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="current_password"
                            label="Current Password"
                            name="current_password"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="new_password"
                            label="New Password"
                            name="new_password"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirm_password"
                            label="Confirm Password"
                            name="confirm_password"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <Button sx={{ marginTop: "24px" }} variant="contained" fullWidth>
                            Change Password
                        </Button>
                    </div>


                </Box>


            </div>


        </BaseManagementComponent>
    )
}

export default UserSettingsManagementComponent