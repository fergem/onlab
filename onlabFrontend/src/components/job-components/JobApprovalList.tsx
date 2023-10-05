// import { ActionIcon, Group, Image, Paper, Stack, Text } from "@mantine/core";
// import { IconCheck, IconX } from "@tabler/icons-react";
// import { baseProfilePicture } from "../../utility/constants";
// import LoadingBoundary from "../utility-components/LoadingBoundary";

// export interface IPropsJobApprovalCard {
//   job: Job;
// }

// export function JobApprovalCard({ job }: IPropsJobApprovalCard) {
//   const { approveJob, declineJob } = useProgressJob();

//   const handleApproveJob = () => {
//     approveJob(job.id);
//   };
//   const handleDeclineJob = () => {
//     declineJob(job.id);
//   };

//   return (
//     <Paper shadow="sm" p="md" withBorder>
//       <Group align="center" position="center">
//         <Image
//           radius="sm"
//           width="8vw"
//           height="8vw"
//           src={
//             job.petSitterUserInformation?.picture
//               ? `data:image/png;base64,${job.petSitterUserInformation.picture}`
//               : baseProfilePicture
//           }
//           alt="Job picture"
//         />
//         <Text size="xs">
//           {job.petSitterUserInformation?.userName} wants to apply for your job
//         </Text>
//         <Stack align="center" justify="center">
//           <ActionIcon
//             color="green"
//             size="lg"
//             variant="filled"
//             onClick={handleApproveJob}
//           >
//             <IconCheck />
//           </ActionIcon>
//           <ActionIcon
//             color="red"
//             size="lg"
//             variant="filled"
//             onClick={handleDeclineJob}
//           >
//             <IconX />
//           </ActionIcon>
//         </Stack>
//       </Group>
//     </Paper>
//   );
// }

// export interface IPropsJobApprovalList {
//   approvals: Job[];
//   loading: boolean;
//   error: boolean;
//   refetch(): void;
// }

// export default function JobApprovalList({
//   approvals,
//   loading,
//   error,
//   refetch,
// }: IPropsJobApprovalList) {
//   return (
//     <LoadingBoundary
//       loading={loading}
//       error={error}
//       refetch={refetch}
//       isEmpty={approvals.length === 0}
//     >
//       <Stack justify="center">
//         {approvals.map((x) => (
//           <JobApprovalCard key={x.id} job={x} />
//         ))}
//       </Stack>
//     </LoadingBoundary>
//   );
// }
