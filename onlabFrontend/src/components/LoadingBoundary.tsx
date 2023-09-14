import { Button, Loader, Paper, Stack, Text } from "@mantine/core";
import { IconExclamationCircle, IconMoodSad } from "@tabler/icons-react";

export interface IPropsLoadingBoundary {
  children: React.ReactNode;
  loading: boolean;
  error: boolean;
  isEmpty?: boolean;
  refetch(): void;
}

export default function LoadingBoundary({
  children,
  loading,
  error,
  isEmpty,
  refetch,
}: IPropsLoadingBoundary) {
  if (loading)
    return (
      <Paper shadow="sm" p="xl" withBorder>
        <Stack align="center" justify="center ">
          <Loader size="xl" />
        </Stack>
      </Paper>
    );
  if (error)
    return (
      <Paper shadow="sm" p="xl" withBorder>
        <Stack align="center" justify="center ">
          <IconExclamationCircle size={48} />
          <Text> Sorry a problem happened</Text>
          <Button onClick={refetch}>Try again!</Button>
        </Stack>
      </Paper>
    );
  if (isEmpty)
    return (
      <Paper shadow="sm" p="xl" withBorder>
        <Stack align="center" justify="center ">
          <IconMoodSad size={48} />
          <Text>No items to show yet.</Text>
        </Stack>
      </Paper>
    );

  return <> {children}</>;
}
