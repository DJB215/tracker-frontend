import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Box,
    Container,
    Button,
    Typography,
    createTheme,
    ThemeProvider,
    TextField,
    Select,
    MenuItem, 
    FormControl,
    InputLabel,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner2';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Scanner = (props) => {
    const history = useHistory();
    const [TestResult, setTestResult] = useState('');
    const [CovidTestCode, setCovidTestCode] = useState('Not Found');

    let EinsteinID = history.location.state.loginId;

    const MySwal = withReactContent(Swal);

    const theme = createTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:4000/api/tests'
           
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ EinsteinID, CovidTestCode, TestResult })
        };

        if (document.getElementById('CovidTestCode').value === 'Not Found') {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must scan the QR Code from the swab packaging to continue'
            })
        } else if (TestResult === '' || TestResult === 'None') {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must enter your test result.'
            })
        } else {
            fetch(url, requestOptions)
                .then(response => {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Test Result Submitted',
                        text: 'Your test result was submitted successfully!'
                    })
                })
                .catch(error => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There was a problem when you submitted your test result.'
                    })
                    console.log(error)
                });
        }
    };

    const handleChangeResult = (event) => {
        setTestResult(event.target.value);
    };

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    const classes = useStyles()

    return (
        <div className="pageLook">
            <BarcodeScannerComponent 
            width={300} 
            height={300}
            onUpdate={(err, result) => {
                if (result) setCovidTestCode(result.text)
            }}
            />

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
                    <Typography component="h1" variant="h5">
                        Scan
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="CovidTestCode"
                        label="Covid-19 Test ID"
                        name="CovidTestCode"
                        autoFocus
                        value={CovidTestCode}
                        />
                        <FormControl style={{ width: '100%' }} className={classes.formControl}>
                            <InputLabel id="test">Test Result</InputLabel>
                            <Select
                            labelId="test"
                            id="TestResult"
                            name="TestResult"
                            value={TestResult}
                            onChange={handleChangeResult}
                            label="Test Result"
                            fullWidth
                            >
                                <MenuItem value={'None'}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Negative'}>Negative</MenuItem>
                                <MenuItem value={'Positive'}>Positive</MenuItem>
                                <MenuItem value={'Invalid'}>Invalid</MenuItem>
                            </Select>
                        </FormControl>
                       
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Submit
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
        
    );
}




export default Scanner;

