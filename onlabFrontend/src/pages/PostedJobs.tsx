import { Button, Grid, Group, Stack, Title, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import JobApprovalList from "../components/job-components/JobApprovalList";
import JobList from "../components/job-components/JobList";
import { useGetApprovals, useGetUserPostedJobs } from "../hooks/JobHooks";
import { DefaultJobFilter } from "../models/Job";

export default function OwnerProfile() {
  const navigate = useNavigate();
  const { jobs, error, loading, listJobs } =
    useGetUserPostedJobs(DefaultJobFilter);
  const { approvals, approvalsLoading, approvalsError, listApprovals } =
    useGetApprovals();

  const handleAdd = () => {
    navigate("/createpetsitterjob");
  };
  return (
    <Stack align="center" justify="center">
      <Grid w="90%" justify="center">
        <Grid.Col span={4}>
          <Title align="center" order={2} mb={10}>
            Approvals
          </Title>
          <JobApprovalList
            approvals={approvals}
            loading={approvalsLoading}
            error={approvalsError}
            refetch={listApprovals}
          />
        </Grid.Col>
        <Grid.Col span={7}>
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
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
