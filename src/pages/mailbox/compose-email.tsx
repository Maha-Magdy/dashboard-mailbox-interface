import { Box, Heading, VStack } from "@chakra-ui/react";
import ComposeEmailForm from "./components/compose-email-form";
import { useNavigate } from "react-router";

const ComposeEmail = () => {
    const navigate = useNavigate();

    return (
        <Box width="full" p="4" pt="8">
            <VStack alignItems="flex-start" gap={6}>
                <Heading as="h1" fontWeight="light" fontSize="2xl">New Email</Heading>
                <ComposeEmailForm callback={() => navigate("/mailbox/inbox")} />
            </VStack>
        </Box>
    );
}

export default ComposeEmail;