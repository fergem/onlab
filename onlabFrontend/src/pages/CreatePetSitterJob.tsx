import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobService } from "../api/JobApi";
import { usePostJobs } from "../hooks/JobHooks";
import Job from "../models/Job";
import { bg, color, selectedColor } from "../utility/Constants";

export default function CreatePetSitterJob() {
  const { register, getValues } = useForm<Job>();
  const [job, setJobData, postJob] = usePostJobs();

  return (
    <Flex direction="row" alignItems="center" justifyContent="center" py="15%">
      <Card
        direction="row"
        backgroundColor={bg}
        color={color}
        boxShadow="dark-lg"
        p="5%"
        borderRadius="xl">
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
              placeholder="Hours to work for"
              borderColor={selectedColor}
              focusBorderColor={selectedColor}
              {...register("hours")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              borderColor={selectedColor}
              focusBorderColor={selectedColor}
              {...register("location")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              borderColor={selectedColor}
              focusBorderColor={selectedColor}
              {...register("description")}
            />
          </FormControl>
          <FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              borderColor={selectedColor}
              _hover={{ bg: selectedColor }}
              variant="outline"
              fontSize="md"
              color="inherit">
              Submit
            </Button>
          </FormControl>
        </form>
      </Card>
    </Flex>
  );
}
