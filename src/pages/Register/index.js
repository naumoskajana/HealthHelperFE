import { Button, FormControl, FormHelperText, Input, InputLabel, Stack } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import LockResetIcon from '@mui/icons-material/LockReset';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useKeyPress from "../../hooks/useKeyPress";
import logoImage from '../../images/logo.PNG';
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api";
import { useState } from "react";
import PopupMessage from "../../common/PopupMessage";

const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required!'),
    email: yup.string().email('Email must be a valid email!').required('Email is required!'),
    password: yup.string().required('Password is required!'),
    repeatPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Repeat password is required!'),
});

const RegisterPage = () => {
    const history = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            const user = {
                fullName: data.fullName,
                email: data.email,
                password: data.password
            }
            await API.register(user);
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                history('/login');
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useKeyPress({ callback: handleSubmit(onSubmit) });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <img src={logoImage} alt="Logo" style={{ maxWidth: '100%', marginBottom: '20px' }} />
            <div style={{ width: '400px' }}>
                <Stack spacing={3}>
                    <FormControl error={!!errors.fullName} required>
                        <InputLabel htmlFor='fullName'>Name</InputLabel>
                        <Input
                            id='fullName'
                            endAdornment={<PersonIcon fontSize='large' />}
                            {...register('fullName')}
                        />
                        <FormHelperText>{errors.fullName?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!errors.email} required>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <Input
                            id='email'
                            endAdornment={<EmailIcon fontSize='large' />}
                            {...register('email')}
                        />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!errors.password} required>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <Input
                            id='password'
                            endAdornment={<HttpsIcon fontSize='large' />}
                            type='password'
                            {...register('password')}
                        />
                        <FormHelperText>
                            {errors.password?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl error={!!errors.repeatPassword} required>
                        <InputLabel htmlFor='repeatPassword'>Repeat password</InputLabel>
                        <Input
                            id='repeatPassword'
                            endAdornment={<LockResetIcon fontSize='large' />}
                            type='password'
                            {...register('repeatPassword')}
                        />
                        <FormHelperText>
                            {errors.repeatPassword?.message}
                        </FormHelperText>
                    </FormControl>
                    <Button onClick={handleSubmit(onSubmit)}>Register</Button>
                </Stack>
                {showPopup && <PopupMessage message="User successfully registered!" onClose={handleClosePopup} />}
            </div>
            <p style={{ marginTop: '20px' }}>Have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#50C878', cursor: 'pointer' }}>Login</Link></p>
        </div>
    );
}

export default RegisterPage;