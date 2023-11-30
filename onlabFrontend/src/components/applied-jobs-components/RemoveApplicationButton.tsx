import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCancelApplicationForJob } from "../../hooks/react-query/JobApplicationHooks";
import { Status } from "../../models/Job";
import { JobApplicationStatus } from "../../models/JobApplication";

export interface IRemoveApplicationButtonProps {
  jobStatus: Status;
  applicationStatus: JobApplicationStatus;
  applicationID: number;
}

export default function RemoveApplicationButton({
  applicationStatus,
  jobStatus,
  applicationID,
}: IRemoveApplicationButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { cancelApplication } = useCancelApplicationForJob();
  const handleDelete = () => {
    cancelApplication(applicationID);
    close();
  };
  const canWithdraw =
    jobStatus !== Status.Done &&
    jobStatus !== Status.Canceled &&
    applicationStatus !== JobApplicationStatus.Canceled;

  const wontBeAbleToReapply = jobStatus !== Status.Available;
  const wontBeAbleToReaplyText =
    "The job's status will be set canceled and you will not be able to re-apply.";
  return (
    <>
      {canWithdraw && (
        <Button color="red" onClick={open} size="xs">
          Withdraw application
        </Button>
      )}
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack>
          <Text>
            Are you sure you want to withdraw your application for this job?{" "}
            {wontBeAbleToReapply && wontBeAbleToReaplyText}
          </Text>

          <Group position="apart">
            <Button size="sm" onClick={close}>
              No, go back!
            </Button>
            <Button size="sm" color="red" onClick={handleDelete}>
              Yes.
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
