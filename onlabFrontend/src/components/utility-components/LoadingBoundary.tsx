import { Button, Loader, Paper, Stack, Text } from "@mantine/core";
import { IconExclamationCircle, IconMoodSad } from "@tabler/icons-react";

interface IPropsLoadingBoundary {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  refetch(): void;
  emptyMessage?: string;
}

export default function LoadingBoundary({
  children,
  isLoading,
  isError,
  isEmpty,
  refetch,
  emptyMessage,
}: IPropsLoadingBoundary) {
  if (isLoading)
    return (
      <LoadingBoundaryLayout>
        <Loader size="xl" />
      </LoadingBoundaryLayout>
    );
  if (isError)
    return (
      <LoadingBoundaryLayout>
        <IconExclamationCircle size={48} />
        <Text>
          The server encountered an error and could not complete your request.
        </Text>
        <Button onClick={refetch}>Try again!</Button>
      </LoadingBoundaryLayout>
    );
  if (isEmpty)
    return (
      <LoadingBoundaryLayout>
        <IconMoodSad size={48} />
        <Text>{emptyMessage}</Text>
      </LoadingBoundaryLayout>
    );

  return <> {children}</>;
}

interface ILoadingBoundaryLayoutProps {
  children: React.ReactNode;
}

function LoadingBoundaryLayout({ children }: ILoadingBoundaryLayoutProps) {
  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack align="center" justify="center">
        {children}
      </Stack>
    </Paper>
  );
}
