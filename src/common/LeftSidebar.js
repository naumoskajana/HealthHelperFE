import { Grid, Paper } from '@mui/material';
import healthImage1 from '../images/health/health1.jpg';
import healthImage2 from '../images/health/health2.jpg';
import healthImage3 from '../images/health/health3.jpg';
import healthImage4 from '../images/health/health4.jpg';
import healthImage10 from '../images/health/health10.jpg';

const LeftSidebar = () => {
    const imageStyle = {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: 'calc(100vh - 10px)',
        marginBottom: '10px'
    };

    return (
        <Grid item xs={2}>
            <Paper style={{ height: '100%', backgroundColor: '#F0F0F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <img src={healthImage1} alt="Left" style={imageStyle} />
                    <img src={healthImage2} alt="Left" style={imageStyle} />
                    <img src={healthImage3} alt="Left" style={imageStyle} />
                    <img src={healthImage10} alt="Left" style={imageStyle} />
                    <img src={healthImage4} alt="Left" style={imageStyle} />
                </div>
            </Paper>
        </Grid>
    );
}

export default LeftSidebar;