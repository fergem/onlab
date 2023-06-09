import { useState } from "react";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import JobDialog from "./JobDialog";

export interface IPropsJobCard {
  job: Job;
}

export interface IPropsJobList {
  jobs: Job[];
}

export const JobList: React.FC<IPropsJobList> = ({ jobs }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2">
      {jobs.map((x) => (
        <JobCard key={x.id} job={x} />
      ))}
    </div>
  );
};

const JobCard: React.FC<IPropsJobCard> = ({ job }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className="card shadow-2xl rounded-xl p-10"
      onClick={() => setIsOpen(true)}>
      <div className="card-body">
        <img
          className="object-contain rounded-lg w-62 h-62"
          src={
            job?.ownerUserInformation?.picture
              ? "data:image/png;base64," + job.ownerUserInformation.picture
              : baseProfilePicture
          }
          alt="Job picture"
        />
        <h2>{job?.ownerUserInformation?.userName}'s job</h2>
        <div className="flex direction-col justify-center align-center">
          <span> {job.hours} hours of work</span>
          <span>{job.location}</span>
        </div>
        <JobDialog
          job={job}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}></JobDialog>
      </div>
    </div>
  );
};
