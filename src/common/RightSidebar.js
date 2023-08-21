import { Grid, Paper } from '@mui/material';
import healthImage5 from '../images/health/health5.jpg';
import healthImage6 from '../images/health/health6.jpg';
import healthImage7 from '../images/health/health7.jpg';
import healthImage8 from '../images/health/health8.jpg';
import healthImage9 from '../images/health/health9.jpg';

const RightSidebar = () => {
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
                    <img src={healthImage6} alt="Left" style={imageStyle} />
                    <img src={healthImage7} alt="Left" style={imageStyle} />
                    <img src={healthImage8} alt="Left" style={imageStyle} />
                    <img src={healthImage9} alt="Left" style={imageStyle} />
                    <img src={healthImage5} alt="Left" style={imageStyle} />
                </div>
            </Paper>
        </Grid>
    );
}

export default RightSidebar;