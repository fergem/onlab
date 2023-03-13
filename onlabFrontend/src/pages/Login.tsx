import { Card, Flex } from "@chakra-ui/react"
import HookForm from "../components/HookForm"

export default function Login() {
    const bg = "#EAEFD3"
    const color = "#505168"
    const borderColor = "#B3C0A4"
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
