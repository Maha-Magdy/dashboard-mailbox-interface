import * as Yup from 'yup';
import { useAuthStore } from '../../../store';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { VStack, Field as ChakraField, Input, Textarea } from '@chakra-ui/react';
import DMIButton from '../../../components/ui/dmi-button';
import { sendNewEmail } from '../../../services';
import { getUsers } from '../../../services';
import { toaster } from '../../../components/ui/toaster';
import { useNavigate } from 'react-router';

interface ComposeEmailForm {
    to: string;
    cc: string;
    subject: string;
    body: string;
}

const validationSchema = Yup.object().shape({
    to: Yup.string().email('Invalid email').required('To email is required'),
    cc: Yup.string().email('Invalid Email'),
    subject: Yup.string().required('Subject is required'),
    body: Yup.string().required('Body for email is required'),
});

const ComposeEmailForm = ({ callback }: { callback: () => void }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const handleSendEmail = (values: ComposeEmailForm, { setSubmitting }: FormikHelpers<ComposeEmailForm>) => {
        const newEmail = sendNewEmail({
            from: {
                name: user?.name!,
                email: user?.email!,
            },
            to: {
                name: getUsers().find(user => user.email === values.to)?.name || '',
                email: values.to,
            },
            cc: {
                name: getUsers().find(user => user.email === values.cc)?.name || '',
                email: values.cc,
            },
            subject: values.subject,
            body: values.body,
            category: undefined,
            hasAttachment: false
        });

        setSubmitting(false);

        toaster.create({
            description: "Message sent",
            type: "success",
            closable: true,
            action: {
                label: "View message",
                onClick: () => navigate(`/mailbox/sent/${newEmail.id}`),
            },
        });

        callback();
    };

    return (
        <Formik
            initialValues={{ to: "", cc: "", subject: "", body: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSendEmail}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form style={{ width: "100%", maxWidth: "42rem" }}>
                    <VStack gap={4} alignItems="flex-start">
                        <ChakraField.Root invalid={!!(errors.to && touched.to)}>
                            <ChakraField.Label>To</ChakraField.Label>
                            <Field
                                as={Input}
                                id="to"
                                name="to"
                                type="email"
                                autoComplete="off"
                                placeholder="Enter the recipient email"
                                borderColor="gray.200" fontWeight="medium"
                                css={{ "--focus-color": "colors.gray.300" }}
                                _focusVisible={{ outlineWidth: "0.5px" }}
                            />
                            <ChakraField.ErrorText>{errors.to}</ChakraField.ErrorText>
                        </ChakraField.Root>

                        <ChakraField.Root invalid={!!(errors.cc && touched.cc)}>
                            <ChakraField.Label>Cc</ChakraField.Label>
                            <Field
                                as={Input}
                                id="cc"
                                name="cc"
                                type="email"
                                autoComplete="off"
                                placeholder="Enter the cc email"
                                borderColor="gray.200" fontWeight="medium"
                                css={{ "--focus-color": "colors.gray.300" }}
                                _focusVisible={{ outlineWidth: "0.5px" }}
                            />
                            <ChakraField.ErrorText>{errors.cc}</ChakraField.ErrorText>
                        </ChakraField.Root>

                        <ChakraField.Root invalid={!!(errors.subject && touched.subject)}>
                            <ChakraField.Label>Subject</ChakraField.Label>
                            <Field
                                as={Input}
                                id="subject"
                                name="subject"
                                type="text"
                                autoComplete="off"
                                placeholder="Enter the subject"
                                borderColor="gray.200" fontWeight="medium"
                                css={{ "--focus-color": "colors.gray.300" }}
                                _focusVisible={{ outlineWidth: "0.5px" }}
                            />
                            <ChakraField.ErrorText>{errors.subject}</ChakraField.ErrorText>
                        </ChakraField.Root>

                        <ChakraField.Root invalid={!!(errors.body && touched.body)}>
                            <ChakraField.Label>Body</ChakraField.Label>
                            <Field
                                as={Textarea}
                                id="body"
                                name="body"
                                autoComplete="off"
                                placeholder="Enter the body of the email"
                                rows={8}
                                borderColor="gray.200" fontWeight="medium"
                                css={{ "--focus-color": "colors.gray.300" }}
                                _focusVisible={{ outlineWidth: "0.5px" }}
                            />
                            <ChakraField.ErrorText>{errors.body}</ChakraField.ErrorText>
                        </ChakraField.Root>

                        <DMIButton type="submit" loading={isSubmitting} width="full" maxW="2xs" mode='primary' px={24}>Send</DMIButton>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default ComposeEmailForm;