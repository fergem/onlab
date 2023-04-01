import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { usePostJobs } from "../hooks/JobHooks";
import Job from "../models/Job";

export default function CreatePetSitterJob() {
  const { register, getValues } = useForm<Job>();
  const [job, setJobData, postJob] = usePostJobs();

  return (
    <Flex direction="row" alignItems="center" justifyContent="center" py="15%">
      <Card
        direction="row"
        boxShadow="dark-lg"
        p="5%"
        borderRadius="xl"
        backgroundColor="#EAEFD3"
        color="#505168">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setJobData({
              location: getValues("location"),
              hours: getValues("hours"),
              description: getValues("description"),
            });
            postJob();
          }}>
          <FormControl isRequired>
            <FormLabel>Hours to work for</FormLabel>
            <Input
              placeholder="Type in the work of hours"
              {...register("hours")}
              borderColor="#B3C0A4"
              focusBorderColor="#B3C0A4"
              _hover={{ backgroundColor: "#EAEFD3" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location of the work"
              {...register("location")}
              borderColor="#B3C0A4"
              focusBorderColor="#B3C0A4"
              _hover={{ backgroundColor: "#EAEFD3" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description of the work"
              {...register("description")}
              borderColor="#B3C0A4"
              focusBorderColor="#B3C0A4"
              _hover={{ backgroundColor: "#EAEFD3" }}
            />
          </FormControl>
          <FormControl>
            <Button mt={4} type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </Card>
    </Flex>
  );
}
