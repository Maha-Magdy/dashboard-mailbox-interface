import { Badge, Flex, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { system } from "../../../theme";

interface FolderLinkProps {
    link: string;
    Icon: React.ElementType;
    title: string;
    badgeInfo?: string | number;
    badgeColor?: string;
}

const FolderLink = ({ link, Icon, title, badgeInfo, badgeColor }: FolderLinkProps) => {
    return (
        <RouterLink to={link}>
            <Flex justifyContent="space-between" alignItems="center" py={1} px={2} borderBottom="1px solid" borderColor="charcoal.100"
                _hover={{ bgColor: 'charcoal.100', borderRadius: 'sm' }}
            >
                <Flex gap={2} alignItems='center'>
                    <Icon color={system.token("colors.charcoal.800")} width={16} height={16} />
                    <Text fontWeight='medium'>{title}</Text>
                </Flex>
                {badgeInfo && <Badge bgColor={badgeColor} color="white" fontWeight="bold" height={5} px={2}>{badgeInfo}</Badge>}
            </Flex>
        </RouterLink>
    );
}

export default FolderLink;