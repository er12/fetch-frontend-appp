"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import { useUserContext } from '../api/context/UserContext';
import { userService } from '../api/services/users-services';
import { usePathname, useRouter } from "next/navigation";
import { Button } from '@mui/material';

export default function NavBar() {
  const { userName, setUserName } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  
  const logOut = () => {
    userService.logOut().then(() => {
      setUserName(null);
      router.push("/login");
    }).catch((err) => {
      console.log("Error logging out: ", err);
    });
  };

  React.useEffect(() => {
    if (!userName || userName == "null") {
      router.push("/login");
    }
  }, [userName, router]);

  if (!userName || userName == "null" ||pathname == "/login") return null;

  // Render the NavBar only if userName is not null
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" color="inherit"      >
        <Toolbar>
          <PetsIcon sx={{ display: { xs: 'none', sm: 'block' }, color: "black" }} />
          <Typography variant="h5" component="div" sx={{ marginX: 4 }}>
            {"Fetch Dogs Front End"}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div" sx={{ marginX: 4 }}>
            User: {userName}
          </Typography>
          <Button variant='outlined' color='inherit' onClick={logOut}>{"Log Out"}</Button>
        </Toolbar>
      </AppBar>
    </Box >
  );

}
