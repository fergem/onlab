import {
    Card,
    Flex,
    Heading,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react"
import HookForm from "../components/HookForm"

export default function Login() {
    const bg = useColorModeValue("#EAEFD3", "#505168")
    const color = useColorModeValue("#505168", "#EAEFD3")
    const borderColor = useColorModeValue("#B3C0A4", "#27233A")
    return (
        <Flex
            px="40%"
            justify="center"
            direction="column"
            gap="7"
            py="2%"
            textAlign="center"
            h="calc(92vh)"
        >
            <Card
                direction="row"
                backgroundColor={bg}
                color={color}
                boxShadow="dark-lg"
                padding="8"
                borderRadius="xl"
            >
                <HookForm />
            </Card>
        </Flex>
    )
}
