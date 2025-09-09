import { Checkbox } from '@chakra-ui/react';
import type { ReactNode, Ref } from 'react';

interface TableCheckboxProps {
    ref: Ref<HTMLInputElement>;
    checked: boolean;
    onChange: () => void;
    onClick: () => void;
}

const TableCheckbox = ({ ref, checked, onChange, onClick, ...rest }: TableCheckboxProps): ReactNode => {
    return (
        <Checkbox.Root variant="solid"
            onCheckedChange={onChange}
            {...rest}
        >
            <Checkbox.HiddenInput />
            <Checkbox.Control
                ref={ref}
                onClick={onClick}
                cursor="pointer"
                bgColor={checked ? "primary" : "white"}
                borderColor={checked ? "primary" : "gray.200"}>
                <Checkbox.Indicator />
            </Checkbox.Control>
        </Checkbox.Root>
    )
}


export default TableCheckbox;