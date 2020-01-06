import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
const ViewSwitcher = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: 'center',
            width: '500px',
            height: '480px',
            alignSelf: 'center'
        }}>
            <Link to='/harmonic-mean' style={{textDecoration: 'none'}}>
                <Button variant="contained" >śrenia harmoniczna</Button>
            </Link>
            <Link to='/standard-deviation' style={{textDecoration: 'none'}}>
                <Button variant="contained">odchylenie standardowe</Button>
            </Link>
            <Link to='/kurtoz-concentration' style={{textDecoration: 'none'}}>
                <Button variant="contained">koncentracja kurtoza</Button>
            </Link>
            <Link to='/asymmetry-measure' style={{textDecoration: 'none'}}>
                <Button variant="contained">Miara Asymetrii</Button>
            </Link>

        </div>
    )
}

export default ViewSwitcher
