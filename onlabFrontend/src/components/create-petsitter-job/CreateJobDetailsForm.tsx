import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks";
import { usePostJobs } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
interface IProps {
  selectedPetIds: number[];
}

export const CreateJobDetailsForm: React.FC<IProps> = ({ selectedPetIds }) => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Job[]>({
    resolver: yupResolver(validationSchema),
  });

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
        <Stack direction="column">
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <Button>Submit</Button>
        </Stack>
      </Container>
    </form>
  );
};
