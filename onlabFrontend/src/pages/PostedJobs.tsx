import { Button, Group, Stack, Title, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobApprovalList from "../components/job-components/JobApprovalList";
import JobList from "../components/job-components/JobList";
import { useGetApprovals, useGetUserPostedJobs } from "../hooks/JobHooks";
import { DefaultJobFilterParticipant } from "../models/Job";

export default function OwnerProfile() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);

  const navigate = useNavigate();

  const { jobs, error, loading, listJobs } = useGetUserPostedJobs(
    DefaultJobFilterParticipant
  );

  useEffect(() => {
    listJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const { approvals, approvalsLoading, approvalsError, listApprovals } =
    useGetApprovals();

  const handleAdd = () => {
    navigate("/createpetsitterjob");
  };
  return (
    <Stack align="center" justify="center">
      <Stack w="60%" justify="center">
        <Title align="center" order={2} mb={10}>
          Approvals
        </Title>
        <JobApprovalList
          approvals={approvals}
          loading={approvalsLoading}
          error={approvalsError}
          refetch={listApprovals}
        />
        <Group align="center" position="center" mb={3}>
          <Tooltip label="Post new job">
            <Button variant="subtle" color="dark" onClick={handleAdd}>
              <IconPlus />
            </Button>
          </Tooltip>
          <Title align="center" order={2}>
            Posted jobs
          </Title>
        </Group>

        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          refetch={listJobs}
        />
      </Stack>
    </Stack>
  );
}
