import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useFinishJob } from "../../hooks/react-query/JobHooks";
import { Status } from "../../models/Job";

export interface IRemoveApplicationButtonProps {
  jobID: number;
  endDate?: Date;
  jobStatus: Status;
}

export default function FinishJobButton({
  jobID,
  endDate,
  jobStatus,
}: IRemoveApplicationButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { finishJob } = useFinishJob();
  const handleDelete = () => {
    finishJob(jobID);
    close();
  };
  const canFinish = jobStatus !== Status.Done && jobStatus !== Status.Canceled;
  const isFinishDisabled =
    jobStatus !== Status.Upcoming ||
    (endDate && dayjs().isBefore(dayjs(endDate)));

  return (
    <Group position="center" mt="15px">
      {canFinish && (
        <Button
          color="blue"
          onClick={open}
          size="xs"
          disabled={isFinishDisabled}
        >
          Finish job
        </Button>
      )}
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack>
          <Text>
            Are you sure you want to finish this job?{" "}
            {!endDate &&
              "Payment will be issued by the number of days that have been worked."}
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
    </Group>
  );
}
