import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Image,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostJobs } from "../hooks/JobHooks";
import { useGetUserPets } from "../hooks/UserHooks";
import Job from "../models/Job";
import User from "../models/User";
import { UserService } from "../services/UserService";
import { baseDogPicture } from "../utility/constants";

export default function CreatePetSitterJob() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Job>();
  const [job, setJobData, postJob] = usePostJobs();

  const handleCreateJob = (job: Job) => {
    setJobData(job);
    console.log(job);
    postJob();
  };

  return (
    <Flex justify="center" direction="row" gap="7" py="15%" textAlign="center">
      <Card boxShadow="dark-lg" borderRadius="xl" color="#505168" w="40%">
        <form onSubmit={handleSubmit(handleCreateJob)}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-evenly">
            {/* <Image
              w="40%"
              h="40%"
              src={
                !!pets
                  ? "data:image/png;base64," + pets[0].image
                  : baseDogPicture
                baseDogPicture
              }
              alt="Your pet"
              borderRadius="lg"
            /> */}
            <Flex direction="column">
              {/* <FormControl>
                <Select
                  placeholder="Select option"
                  {...register("pets", { required: "Please select one" })}>
                  <option value="dog">Dog</option> majd petek .mapelve
                  <option value="cat">Cat</option>
                  <option value="turtle">Turtle</option>
                </Select>
              </FormControl> */}
              <FormControl isInvalid={!!errors.hours}>
                <FormLabel>Work of hours</FormLabel>
                <NumberInput defaultValue={1} min={1} max={12}>
                  <NumberInputField
                    id="hours"
                    placeholder="Work of hours"
                    {...register("hours", {
                      required: "This is required",
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.hours && errors.hours.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location}>
                <FormLabel>Location of the work</FormLabel>
                <Input
                  id="location"
                  placeholder="Location"
                  {...register("location", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.location && errors.location.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description of the work</FormLabel>
                <Input
                  id="description"
                  placeholder="Description"
                  {...register("description", {
                    required: "This is required",
                  })}
                  // borderColor="#B3C0A4"
                  // focusBorderColor="#B3C0A4"
                  // _hover={{ backgroundColor: "#EAEFD3" }}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.payment}>
                <FormLabel>Amount of payment for job</FormLabel>
                <Input
                  id="payment"
                  type="number"
                  placeholder="Payment"
                  {...register("payment", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.payment && errors.payment.message}
                </FormErrorMessage>
              </FormControl>
              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Flex>
          <FormControl></FormControl>
        </form>
      </Card>
    </Flex>
  );
}
