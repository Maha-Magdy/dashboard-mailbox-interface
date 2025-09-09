import { Box, Flex, Heading, VStack, Image, Text, IconButton } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { deleteEmail, getEmail, markEmailAsRead } from "../../services";
import { useEffect, useState } from "react";
import { TrashIcon } from "../../icons";
import { toaster } from "../../components/ui/toaster";
import { useAuthStore, useMailboxStore } from "../../store";

const ViewEmail = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { unreadMailsCount, setUnreadMailsCount } = useMailboxStore();
    const { folderId, emailId } = useParams();
    const [email] = useState(getEmail(emailId!));
    const userPhoto = email?.from.email.split('@')[0];
    const [imageUrl, setImageUrl] = useState();

    const getImageUrl = async () => {
        try {
            const { default: imageUrl } = await import(`../../assets/user-profile-photos/${userPhoto}.jpg`);
            return imageUrl;
        } catch (err) {
            const { default: defaultImageUrl } = await import(`../../assets/user-profile-photos/default-user.jpg`);
            return defaultImageUrl;
        }
    };

    const handleDeleteEmail = () => {
        deleteEmail(email?.id!);
        navigate(`/mailbox/${folderId}`);
        toaster.create({
            description: "Email has been deleted",
            type: "success",
            closable: true,
        });
    }

    useEffect(() => {
        if (!email) {
            navigate(`/mailbox/${folderId}`);
        }

        if (email?.to.email === user?.email && !email?.isRead) {
            markEmailAsRead(email?.id!);
            setUnreadMailsCount(unreadMailsCount - 1);
        }
    }, [user, email]);

    useEffect(() => {
        getImageUrl().then(url => setImageUrl(url));
    }, [userPhoto]);

    return (
        <Box width="full" p="4" pt={{ base: "4", lg: "8" }}>
            <VStack gap="4" alignItems="flex-start" color="gray.600" borderBottom="1px solid" borderColor="charcoal.100" pb={4}>
                <Heading as="h1" fontWeight="light" fontSize="2xl">{email?.subject}</Heading>
                <Flex justifyContent="space-between" width="full">
                    <Flex gap={4}>
                        <Image
                            src={imageUrl}
                            boxSize="50px"
                            borderRadius="full"
                            fit="cover"
                            border="1px solid"
                            borderColor="charcoal.100"
                            alt={email?.from.email.split("@")[0]}
                        />
                        <VStack alignItems="flex-start" gap={1} fontSize="xs">
                            <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 2, lg: 0 }} alignItems={{ base: "flex-start", lg: "center" }}>
                                <Text fontWeight="bold" fontSize="sm">{email?.from.name}</Text>
                                <Text>({email?.from.email})</Text>
                            </Flex>
                            <Text>to: {email?.to.email}</Text>
                            {email?.cc?.email && (<Text>cc: {email?.cc.email}</Text>)}
                        </VStack>
                    </Flex>

                    <IconButton aria-label="Delete" title="Delete" variant="outline" size="xs" height="7"
                        onClick={handleDeleteEmail}
                    >
                        <TrashIcon color="gray" style={{ width: "14", height: "14" }} />
                    </IconButton>
                </Flex>
            </VStack>

            <Box py={4} fontSize="sm">
                <Text>{email?.body}</Text>
            </Box>
        </Box>
    );
}

export default ViewEmail;