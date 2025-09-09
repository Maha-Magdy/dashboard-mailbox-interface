import { Box, Container } from "@chakra-ui/react";

function Main({ children }: { children: React.ReactNode }) {
    return (
        <Box bgColor="charcoal.50" minH="full">
            <Container maxW="8xl" margin="0 auto" padding={4} paddingInline={{ "2xl": 0 }}>
                {children}
            </Container>
        </Box>
    );
}

export default Main;