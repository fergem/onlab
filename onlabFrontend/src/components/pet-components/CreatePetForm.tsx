import {
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Select,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Pet from "../../models/Pet";
import { UserService } from "../../services/UserService";

export default function CreatePetForm() {
  const handleCreatePet = (pet: Pet) => {
    UserService.insertPet(pet).then(() => {
      window.location.reload();
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Pet>();

  return (
    <form onSubmit={handleSubmit(handleCreatePet)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Name of your pet</FormLabel>
        <Input
          id="name"
          placeholder="name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Flex direction="row" gap="10">
        <FormControl isInvalid={!!errors.age}>
          <FormLabel htmlFor="age">Age of your pet</FormLabel>
          <Input
            id="age"
            placeholder="age"
            type="number"
            {...register("age", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.age && errors.age.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.species}>
          <FormLabel htmlFor="species">Specie of your pet</FormLabel>
          <Select
            placeholder="Select option"
            {...register("species", { required: "Please select one" })}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="turtle">Turtle</option>
          </Select>
          <FormErrorMessage>
            {errors.species && errors.species.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">
          Small description of your pet
        </FormLabel>
        <Input
          id="description"
          placeholder="description"
          {...register("description", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
      <Button isLoading={isSubmitting}>Submit</Button>
    </form>
  );
}
