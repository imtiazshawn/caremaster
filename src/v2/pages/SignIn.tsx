import { LoginCredentials } from "$types/auth";
import HookFormSelect from "@common/HookFormSelect";
import HookFormTextField from "@common/HookFormTextField";
import { FullColumn } from "@common/index";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useSignInMutation } from "@reducers/api/authApi";
import { setTokenToLocalStorage } from "@redux/localStore/token";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link
        color='inherit'
        href='/'
      >
        Care Master
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function SignIn() {
  const { handleSubmit, control, setError } = useForm<LoginCredentials>({});
  const [signIn, { isLoading, error, data }] = useSignInMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (values: LoginCredentials) => {
    await signIn(values);
  };

  useEffect(() => {
    if (data) {
      setTokenToLocalStorage(data.token);
      window.location.href = "/";
    }
    if (error) {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  }, [data, error, navigate, setError]);

  return (
    <FullColumn
      sx={{
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          justifyContent: "center",
          backgroundColor: "#f7f6f7",
          p: 2,
          borderRadius: 4,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
          >
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <HookFormTextField
              margin='normal'
              required
              fullWidth
              label='Email Address'
              autoComplete='email'
              autoFocus
              name='email'
              control={control}
            />

            <HookFormTextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              control={control}
            />

            <HookFormSelect
              margin='dense'
              required
              fullWidth
              label='User Type'
              name='user_type'
              defaultValue='staff'
              control={control}
              options={[
                {
                  label: "Staff",
                  value: "staff",
                },
                {
                  label: "Care Worker",
                  value: "care_worker",
                },
              ]}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mb: 4 }} />
      </Container>
    </FullColumn>
  );
}
