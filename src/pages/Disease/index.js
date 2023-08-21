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
    disease: yup.string().required('Disease is required!'),
});

const DiseasePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });

    const [disease, setDisease] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);

        API.fetchMedicationsForDisease(data.disease)
            .then((res) => {
                setDisease(res.data);
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
                            <InputLabel htmlFor='disease'>Disease</InputLabel>
                            <Input
                                id='disease'
                                endAdornment={
                                    <IconButton
                                        size="large"
                                        aria-label="search disease"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleSubmit(onSubmit)}
                                        color="inherit"
                                    >
                                        <TroubleshootIcon fontSize='large' />
                                    </IconButton>
                                }
                                {...register('disease')}
                            />
                        </FormControl>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            disease && <CustomCard data={disease} isDisease={true} isMedication={false} />
                        )}
                    </Paper>
                </Grid>
                <RightSidebar />
            </Grid>
        </div>
    );
}

export default DiseasePage;