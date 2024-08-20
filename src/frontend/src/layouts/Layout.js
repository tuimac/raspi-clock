import { useState } from "react";
import {
  AppBar, Box, Button, Toolbar, Typography, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function Layout({ fullScreenHandle }) {

  const toggleDrawer = (event, bar_state) => {
    if(event.type === 'click') {
      setSidebar(bar_state);
    } else {
      return;
    }
  }

  const list = () => {
    return(
      <Box width='100' role='presentation'>
        <List>
          <ListItem key='File List'>
            <ListItemButton component={ Link } to='/'>
              <ListItemText primary='File List' />
            </ListItemButton>
          </ListItem>
          <ListItem key='File Upload'>
            <ListItemButton component={ Link } to='/'>
              <ListItemText primary='File Upload' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  }

  const [sidebar, setSidebar] = useState(false);

  return(
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton onClick={(e) => toggleDrawer(e, true) } edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={ sidebar } onClose={(e) => toggleDrawer(e, false) }>
            { list() }
          </Drawer>
          <Typography variant="h6" color="inherit" underline='none'>
            <Link href="/" underline="none" color="white">
              Raspberry PI Clock
            </Link>
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            size="medium"
            variant="outlined"
            color="success"
            onClick={ fullScreenHandle.enter }
          >
            FullScreen
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Layout;
