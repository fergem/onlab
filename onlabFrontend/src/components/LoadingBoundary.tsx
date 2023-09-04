import { Box, Group, Loader, LoadingOverlay, Stack, Text } from "@mantine/core";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";

export interface IPropsLoadingBoundary {
  children: React.ReactNode;
  loading: boolean;
  error: boolean;
}

export default function LoadingBoundary({
  children,
  loading,
  error,
}: IPropsLoadingBoundary) {
  if (loading) return <Loader />;
  if (error)
    return (
      <Stack align="center" justify="center ">
        <IconExclamationCircle size={48}></IconExclamationCircle>
        <Text> Sorry a problem happened</Text>
      </Stack>
    );
  return <> {children}</>;
}
