import { Button, type ButtonProps } from "@chakra-ui/react";

interface DMIButtonProps extends ButtonProps {
    mode?: 'primary';
    children: React.ReactNode;
}

const DMIButton = ({ mode = 'primary', children, ...props }: DMIButtonProps) => (
    <Button
        fontWeight='semibold'
        bgColor={mode === 'primary' ? 'primary' : ''}
        _hover={{ bgColor: "#19a287" }}
        _active={{ bgColor: "#19a287" }}
        {...props}>
        {children}
    </Button>
);

export default DMIButton;