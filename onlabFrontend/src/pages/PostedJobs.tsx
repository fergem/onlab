import { Affix, Button, Stack, rem } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import NonRepeatedSection from "../components/posted-jobs-components/NonRepeatedSection";
import RepeatedSection from "../components/posted-jobs-components/RepeatedSection";

export default function OwnerProfile() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/createpetsitterjob");
  };
  return (
    <Stack align="center" justify="center">
      <Stack w="60%" justify="center">
        {/* <JobApprovalList
          approvals={approvals}
          loading={approvalsLoading}
          error={approvalsError}
          refetch={listApprovals}
        /> */}

        <NonRepeatedSection />
        <RepeatedSection />
        {/* <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          refetch={listJobs}
        /> */}
      </Stack>
      <Affix position={{ bottom: rem(20), right: rem(20) }}>
        <Button onClick={handleAdd}>Post new job</Button>
      </Affix>
    </Stack>
  );
}
