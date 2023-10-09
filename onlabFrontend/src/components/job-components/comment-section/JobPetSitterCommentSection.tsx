import { UserPreview } from "../../../models/User";

export interface IJobPetSitterCommentSection {
  ownerUser?: UserPreview;
}

export default function JobPetSitterCommentSection({
  ownerUser,
}: IJobPetSitterCommentSection) {}
