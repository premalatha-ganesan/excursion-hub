import * as React from 'react';
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { mainNavbarItems, altNavbarItems } from './consts/navbarItems';
import { Link } from 'react-router-dom';
import { TravelExplore } from '@mui/icons-material';
import getInitials from '../Util.js';
import { useNavigate } from "react-router";

function ResponsiveAppBar({ user, logoutUser }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();


  let loggedIn = false;
  let initials = "?";
  if (user) {
    loggedIn = true;
    initials = getInitials(user);
  }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUserMenu = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/");
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TravelExplore sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#223843'}} />
          <Link to={"/"}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: '#223843',
                textDecoration: 'none',
              }}
            >
              
              ExcursionHub
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {mainNavbarItems.map((page) => (
                <Link key={page.id} style={{ textDecoration: "none", color: "#223843" }} to={`/${page.path}`}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center', color:'#224843' }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <TravelExplore sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#223843' }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#223843',
              textDecoration: 'none',
            }}
          >
            ExcursionHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {mainNavbarItems.map((page) => (
              <Link key={page.id} style={{ textDecoration: "none", color: "#223843" }} to={`/${page.path}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#223843', display: 'block' }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          {!loggedIn ?

            <Box sx={{ flexGrow: 0 }}>
                <Link style={{ textDecoration: "none", color: "#223843" }} to={`/login`}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#223843', display: 'block' }}
                  >
                    Sign In
                  </Button>
                </Link>
            </Box>
            :
            <Box sx={{ flexGrow: 0, }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user.profileUrl}>
                    {initials}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {altNavbarItems.map((setting) => (
                  <Link key={setting.id} style={{ textDecoration: "none", color: "black" }} to={`/${setting.path}`}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>
                        {setting.label}
                      </Typography>
                    </MenuItem>

                  </Link>
                ))}
                <MenuItem onClick={handleLogoutUserMenu}>
                  <Typography sx={{ textAlign: 'center', textDecoration: "none", color: "black" }}>
                    Logout
                  </Typography>

                </MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;