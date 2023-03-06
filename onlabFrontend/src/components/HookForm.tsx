import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"

export default function HookForm() {
    return (
        <form>
            <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" />
            </FormControl>
            <FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                </Button>
            </FormControl>
        </form>
    )
}
