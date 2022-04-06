import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CachedIcon from '@mui/icons-material/Cached';

const icon_style = {
  fontSize: "120px",
  color: "#5d5d66",
}

const button_style = {
  color: '#fff',
  backgroundColor: "#5d5d66",
  textTransform: "capitalize",
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };

    this.refreshPage = this.refreshPage.bind(this);
  }

  static getDerivedStateFromError(){
    return { hasError: true };
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="86vh" textAlign="center">
          <div>
            <ErrorOutlineIcon style={icon_style}/>
            <Typography variant="h2">Something went wrong!</Typography>
            <Box component="summary" mb={2}>
              <span>We can't get that information right now. Please try again later. </span>
            </Box>
            <Button startIcon={<CachedIcon />} disableElevation variant="contained" color="primary" onClick={this.refreshPage} style={button_style}>
              Refresh
            </Button>
          </div>
        </Box>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
