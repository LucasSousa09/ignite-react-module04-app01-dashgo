import { Button, ButtonProps as ChakraButtonProps} from "@chakra-ui/react";

interface PaginationItemProps extends ChakraButtonProps{
    isCurrent?: boolean
    buttonNumber: number,
    onPageChange: (page: number) => void
}

export function PaginationItem({ isCurrent=false, buttonNumber, onPageChange, ...rest}: PaginationItemProps) {
    if(isCurrent){
        return (
            <Button {...rest}
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bgColor: 'pink.500',
                    cursor: "default"
                }}
            >
                { buttonNumber }
            </Button>
        )
    }
    
    return (
        <Button {...rest}
            size="sm"
            fontSize="xs"
            width="4"
            bgColor="gray.700"
            _hover={{
                bgColor: 'gray.500'
            }}
            onClick={() => onPageChange(buttonNumber)}
        >
            { buttonNumber }
        </Button>
    )
}
