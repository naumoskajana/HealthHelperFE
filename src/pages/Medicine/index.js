import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, Grid, IconButton, Input, InputLabel, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomCard from '../../common/Card';
import Header from '../../common/Header';
import LeftSidebar from '../../common/LeftSidebar';
import RightSidebar from '../../common/RightSidebar';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import useKeyPress from '../../hooks/useKeyPress';
import { useState } from 'react';
import { API } from '../../api';
import { CircularProgress } from '@mui/material';

const schema = yup.object().shape({
    medication: yup.string().required('Medication is required!'),
});

const MedicationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });

    const [medication, setMedication] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);

        API.fetchDiseasesForMedication(data.medication)
            .then((res) => {
                setMedication(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useKeyPress({ callback: handleSubmit(onSubmit) });

    return (
        <div>
            <Header />
            <Grid container spacing={0} style={{ height: '100vh' }}>
                <LeftSidebar />
                <Grid item xs={8}>
                    <Paper style={{ height: '100%', backgroundColor: '#E0E0E0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl style={{ marginBottom: '30px' }}>
                            <InputLabel htmlFor='medication'>Medication</InputLabel>
                            <Input
                                id='medication'
                                endAdornment={
                                    <IconButton
                                        size="large"
                                        aria-label="search medication"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleSubmit(onSubmit)}
                                        color="inherit"
                                    >
                                        <TroubleshootIcon fontSize='large' />
                                    </IconButton>
                                }
                                {...register('medication')}
                            />
                        </FormControl>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            medication && <CustomCard data={medication} isDisease={false} isMedication={true} />
                        )}
                    </Paper>
                </Grid>
                <RightSidebar />
            </Grid>
        </div>
    );
}

export default MedicationPage;