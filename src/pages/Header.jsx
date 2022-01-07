import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton, Tooltip } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" color='transparent' style={{boxShadow: 'none'}}>
          <Toolbar>
            <Typography color='primary' variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Pixabay Image Gallery
            </Typography>
            <Tooltip title="GitHub Repo">
            <IconButton
                size="large"
                color="primary"
                href="https://github.com/agentrajat/reactapp-pixabay-image-gallery"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
    )
}

export default Header;
