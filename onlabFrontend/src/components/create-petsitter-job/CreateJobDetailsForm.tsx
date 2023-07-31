import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks";
import { usePostJobs } from "../../hooks/JobHooks";
import Job from "../../models/Job";

interface IProps {
  selectedPetIds: number[];
}

export const CreateJobDetailsForm: React.FC<IProps> = ({ selectedPetIds }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Job>();
  const { user } = useAuth();
  const handleCreateJob = (job: Job) => {
    postJob(
      { ...job, petIDs: selectedPetIds },
      {
        onSuccess() {
          navigate("/postedjobs");
        },
        onError(error) {},
      }
    );
  };
  const [job, error, postJob] = usePostJobs();
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit(handleCreateJob)}>
      <Container>
        <Container>
          <Button type="submit">Submit</Button>
        </Container>
      </Container>
    </form>
  );
};
