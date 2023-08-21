import { Button, FormControl, FormHelperText, Input, InputLabel, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useLoginUser from "../../hooks/useLoginUser";
import useKeyPress from "../../hooks/useKeyPress";
import logoImage from '../../images/logo.PNG';
import { Link } from "react-router-dom";

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email must be a valid email!')
        .required('Email is required!'),
    password: yup.string().required('Password is required!'),
});

const LoginPage = () => {
    const { login, isLoading } = useLoginUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });

    const onSubmit = (data) => {
        login(data);
    };

    useKeyPress({ callback: handleSubmit(onSubmit) });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <img src={logoImage} alt="Logo" style={{ maxWidth: '100%', marginBottom: '20px' }} />
            <div style={{ width: '400px' }}>
                <Stack spacing={3}>
                    <FormControl error={!!errors.email} required>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <Input
                            id='email'
                            endAdornment={<PersonIcon fontSize='large' />}
                            {...register('email')}
                        />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={!!errors.password} required>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <Input
                            id='password'
                            endAdornment={<KeyIcon fontSize='large' />}
                            type='password'
                            {...register('password')}
                        />
                        <FormHelperText>
                            {errors.password?.message}
                        </FormHelperText>
                    </FormControl>
                    <Button onClick={handleSubmit(onSubmit)}>Login</Button>
                </Stack>
            </div>
            <p style={{ marginTop: '20px' }}>Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#50C878', cursor: 'pointer' }}>Register</Link></p>
        </div>
    );
}

export default LoginPage;