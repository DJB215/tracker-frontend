import React from 'react'
import {
    CssBaseline,
    Box,
    Container,
    createTheme,
    ThemeProvider
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Thanks = () => {

    const theme = createTheme();
    return (
        <div className="pageLook">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <h1>Your test has been submitted successfully!</h1>
                <Link to="/">Back to Home</Link>
                </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Thanks
