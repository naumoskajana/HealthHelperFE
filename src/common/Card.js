import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MedicationIcon from '@mui/icons-material/Medication';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import TextTruncate from 'react-text-truncate';
import { useState } from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CustomCard = (props) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 700 }}>
            {props.isDisease && <CardHeader
                avatar={<CoronavirusIcon fontSize='large' />}
                title={<span style={{ fontSize: '1.5rem' }}>{props.data.name}</span>}
            />}
            {props.isMedication && <CardHeader
                avatar={<MedicationIcon fontSize='large' />}
                title={<span style={{ fontSize: '1.5rem' }}>{props.data.name}</span>}
            />}
            <CardMedia
                component="img"
                height="300"
                style={{ maxHeight: '300px', width: '100%', objectFit: 'contain' }}
                image={props.data.image}
                alt={props.data.name}
            />

            <CardContent>
                <Typography variant="body2">
                    <TextTruncate
                        line={5}
                        element="span"
                        truncateText="..."
                        text={props.data.description}
                    />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {props.isDisease && <Typography paragraph >Medications:</Typography>}
                    {props.isDisease && props.data.medications.map((medication, index) => {
                        return (
                            <>
                                {index < 5 && <Typography paragraph key={index} >
                                    {`${index + 1}. ${medication.name}`}
                                </Typography>}
                            </>
                        );
                    })}
                    {props.isMedication && <Typography paragraph >Diseases:</Typography>}
                    {props.isMedication && props.data.diseases.map((disease, index) => {
                        return (
                            <>
                                {index < 5 && <Typography paragraph key={index} >
                                    {`${index + 1}. ${disease.name}`}
                                </Typography>}
                            </>
                        );
                    })}
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CustomCard;
