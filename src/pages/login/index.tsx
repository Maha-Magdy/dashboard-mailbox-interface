import { Formik, Field, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { chakra, Flex, Heading, Text, Image, Link, useBreakpointValue, Box, Field as ChakraField, Input, VStack } from "@chakra-ui/react";
import landingImage from "../../assets/images/landing-image.jpg";
import { PasswordInput } from '../../components/ui/password-input';
import DMIButton from '../../components/ui/dmi-button';
import { authenticateUser } from '../../services';
import { useAuthStore } from '../../store';
import { Navigate, useNavigate } from 'react-router';

// Yup validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


const LoginPage = () => {
    const { isAuthenticated, login } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const isMobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();

    const handleLogin = ({ email, password }: { email: string, password: string }, { setSubmitting, setStatus }: FormikHelpers<{ email: string, password: string }>) => {
        const authenticatedUser = authenticateUser(email, password);
        if (authenticatedUser) {
            setStatus();
            login(authenticatedUser);
            navigate("/");
        } else {
            setStatus("invalid credentials")
        }
        setSubmitting(false);
    }

    return (
        <Flex minH="vh">
            {!isMobile && <Image src={landingImage} alt="An abstract image with shapes blue, and teal colors" width="50%" fit="cover" />}
            <Flex direction="column" alignItems="start" p={12}>
                <Link aria-label="Go to homepage" href="/">
                    <chakra.svg width="50px" height="20px" viewBox="0 0 100 40" fill="null">
                        <path d="M6.58546 39.7824H0V0H6.58546V39.7824Z" fill="#253746" />
                        <path d="M45.2885 0V39.7824H38.7031L23.1031 12.3612V39.7824H16.5176V0H23.1031L38.7031 27.4213V0H45.2885Z" fill="#253746" />
                        <path d="M100 23.4886H83.7061V39.7824H76.5113V23.4886H60.2174V16.2939H76.5113V0H83.7061V16.2939H100V23.4886Z" fill="#253746" />
                    </chakra.svg>
                </Link>
                <Flex flexGrow={1} alignItems="center">
                    <Flex direction="column" gap="12">
                        <Box>
                            <Heading as="h1">Hello Again!</Heading>
                            <Text color="gray.600">Enter your email and password to login our dashboard</Text>
                        </Box>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                        >
                            {({ errors, touched, isSubmitting, status }) => (
                                <Form>
                                    <Flex direction="column" alignItems="flex-start" gap="6">
                                        {status === "invalid credentials" && <Text color="fg.error">Invalid login credentials.</Text>}

                                        <ChakraField.Root invalid={!!(errors.email && touched.email)}>
                                            <ChakraField.Label htmlFor="email">Email</ChakraField.Label>
                                            <Field
                                                as={Input}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="off"
                                                placeholder="Enter you email"
                                                borderColor="gray.200" fontWeight="medium"
                                                css={{ "--focus-color": "colors.gray.300" }}
                                                _focusVisible={{ outlineWidth: "0.5px" }}
                                            />
                                            <ChakraField.ErrorText>{errors.email}</ChakraField.ErrorText>
                                        </ChakraField.Root>

                                        <ChakraField.Root invalid={!!(errors.password && touched.password)}>
                                            <ChakraField.Label htmlFor="password">Password</ChakraField.Label>
                                            <Field
                                                as={PasswordInput}
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter you password"
                                                borderColor="gray.200" fontWeight="medium"
                                                css={{ "--focus-color": "colors.gray.300" }}
                                                _focusVisible={{ outlineWidth: "0.5px" }}
                                            />
                                            <ChakraField.ErrorText>{errors.password}</ChakraField.ErrorText>
                                        </ChakraField.Root>

                                        <VStack alignItems="flex-start" width="full" mt={2}>
                                            <DMIButton type="submit" loading={isSubmitting} width="full">Login</DMIButton>
                                            <Link color="charcoal.800" fontSize="14px">Forget Password?</Link>
                                        </VStack>
                                    </Flex>
                                </Form>
                            )}
                        </Formik>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default LoginPage;