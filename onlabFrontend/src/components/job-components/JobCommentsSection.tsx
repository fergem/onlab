import { Fragment, useMemo } from "react";
import { useUser } from "../../hooks/react-query/AuthHooks";
import { JobApplication } from "../../models/JobApplication";
import { UserPreview } from "../../models/User";
import JobOwnerCommentsSection from "./comment-section/JobOwnerCommentsSection";
import JobPetSitterCommentSection from "./comment-section/JobPetSitterCommentSection";

export interface IPropsJobCommentsSection {
  ownerUser: UserPreview | undefined;
  isOwner: boolean | null;
  applications: JobApplication[];
}

export default function JobCommentsSection({
  applications,
  isOwner,
  ownerUser,
}: IPropsJobCommentsSection) {
  const { user } = useUser();

  const application = useMemo(
    () => applications.find((s) => s.applicantUser.id === user?.id),
    [applications, user?.id]
  );
  return (
    <Fragment key={user?.userName}>
      {isOwner ? (
        <JobOwnerCommentsSection
          applications={applications}
          ownerUser={ownerUser}
        />
      ) : (
        applications.some((s) => s.applicantUser.id === user?.id) && (
          <JobPetSitterCommentSection
            application={application}
            ownerUser={ownerUser}
          />
        )
      )}
    </Fragment>
  );
}
