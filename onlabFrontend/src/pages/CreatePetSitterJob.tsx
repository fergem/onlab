import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  FormErrorMessage,
  useToast,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import { usePostJobs } from "../hooks/JobHooks";
import { useGetUserPets } from "../hooks/UserHooks";

import Job from "../models/Job";
import Pet from "../models/Pet";
import { baseDogPicture } from "../utility/constants";

export default function CreatePetSitterJob() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Job>();
  const { user } = useAuth();
  const [pets] = useGetUserPets();
  const [selectedPet, setSelectedPet] = useState<Pet[]>([]);
  const [job, error, postJob] = usePostJobs();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSelectPet = () => {};

  const handleCreateJob = (job: Job) => {
    postJob(job, {
      onSuccess() {
        toast({
          title: "Job created",
          description: "You have succesfully created a job",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/postedjobs");
      },
      onError(error) {
        toast({
          title: "Job not created created",
          description: "You have not succesfully created a job",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Flex justify="center" direction="row" gap="7" py="15%" textAlign="center">
      <Card boxShadow="dark-lg" borderRadius="xl" color="#505168" w="60%">
        <form onSubmit={handleSubmit(handleCreateJob)}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-evenly">
            <Flex direction="column" flex="1 1 0" p="3%">
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
              <FormControl isInvalid={!!errors.hours}>
                <FormLabel>Minimum Required Experience (years)</FormLabel>
                <NumberInput
                  defaultValue={user?.ownerProfile?.minRequiredExperience ?? 0}
                  min={0}
                  max={12}>
                  <NumberInputField
                    id="minRequiredExperience"
                    placeholder="Minimum Required Experience"
                    {...register("minRequiredExperience", {
                      required: "This is required",
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.minRequiredExperience &&
                    errors.minRequiredExperience.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location}>
                <FormLabel>Location of the work</FormLabel>
                <Input
                  id="location"
                  placeholder="Location"
                  defaultValue={user?.location ?? ""}
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
                  defaultValue={user?.ownerProfile?.minWage ?? 0}
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
            <Flex flex="1 1 0" p="3%">
              <FormControl>
                <FormLabel>
                  Select the animals that you want to be petsitted
                </FormLabel>

                <CheckboxGroup
                  colorScheme="blue"
                  defaultValue={["naruto", "kakashi"]}>
                  <SimpleGrid columns={3} spacing={4}>
                    {pets.map((s) => (
                      <Flex
                        direction="column"
                        backgroundColor="#EAEFD3"
                        borderRadius="10px"
                        alignItems="center"
                        justifyContent="center">
                        <Image
                          src={
                            s.image
                              ? "data:image/png;base64," + s.image
                              : baseDogPicture
                          }></Image>
                        <Checkbox value={s.name}>{s.name}</Checkbox>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </FormControl>
            </Flex>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
