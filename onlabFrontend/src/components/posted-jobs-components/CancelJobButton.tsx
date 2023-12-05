import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCancelJob } from "../../hooks/react-query/JobHooks";
import { Status } from "../../models/Job";

interface IRemoveApplicationButtonProps {
  jobID: number;
  jobStatus: Status;
}

export default function CanceljobButton({
  jobID,
  jobStatus,
}: IRemoveApplicationButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { cancelJob } = useCancelJob();
  const handleDelete = () => {
    cancelJob(jobID);
    close();
  };
  const canCancel = jobStatus !== Status.Done && jobStatus !== Status.Canceled;

  return (
    <Group position="center" mt="15px">
      {canCancel && (
        <Button color="red" onClick={open} size="xs">
          Cancel job
        </Button>
      )}
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack>
          <Text>Are you sure you want to cancel this job?</Text>
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
    </Group>
  );
}
