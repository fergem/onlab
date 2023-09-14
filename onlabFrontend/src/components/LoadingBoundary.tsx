import {
  Box,
  Button,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";

export interface IPropsLoadingBoundary {
  children: React.ReactNode;
  loading: boolean;
  error: boolean;
  refetch(): void;
}

export default function LoadingBoundary({
  children,
  loading,
  error,
  refetch,
}: IPropsLoadingBoundary) {
  if (loading)
    return (
      <Paper shadow="sm" p="xl">
        <Stack align="center" justify="center ">
          <Loader size="xl" />
        </Stack>
      </Paper>
    );
  if (error)
    return (
      <Paper shadow="sm" p="xl">
        <Stack align="center" justify="center ">
          <IconExclamationCircle size={48}></IconExclamationCircle>
          <Text> Sorry a problem happened</Text>
          <Button onClick={refetch}>Try again!</Button>
        </Stack>
      </Paper>
    );
  return <> {children}</>;
}
