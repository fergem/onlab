import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useAuth } from "../../hooks/AuthHooks";
import { useTakeJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import Pet from "../../models/Pet";
import { baseDogPicture, baseProfilePicture } from "../../utility/constants";

interface JobDialog {
  job: Job;
  onClose: () => void;
  isOpen: boolean;
}

const JobDialog: React.FC<JobDialog> = ({ job, onClose, isOpen }) => {
  const [takeJob] = useTakeJob();
  const { user } = useAuth();
  const takeJobButtonRef = useRef(null);

  const handleTakeJob = () => {
    takeJob(job.id, {
      onSuccess: () => {
        // toast({
        //   title: "Job taken",
        //   description: `You have taken the job`,
        //   status: "success",
        // });
        onClose();
      },
      onError: (err: any) => {
        // toast({
        //   title: "Job not taken",
        //   description: err.response.data,
        //   status: "error",
        // });
      },
    });
  };

  return (
    <Dialog
      as="div"
      className="absolute top-0 z-10"
      onClose={onClose}
      open={isOpen}
      initialFocus={takeJobButtonRef}>
      <Dialog.Panel className="bg-base-100 h-fit w-fit">
        <Dialog.Title>
          {job.ownerUserInformation?.userName ?? ""}'s job
        </Dialog.Title>
        <div className="divider"></div>
        <div className="flex directon-col items-center">
          <div className="flex direction-row justify-center items-center">
            <div className="flex-1 direction-col items-center justify-center">
              <img
                // borderRadius="200"
                // objectFit="cover"
                // w="20vh"
                // h="20vh"
                // mx="3vh"
                // mb="2vh"
                src={
                  job.ownerUserInformation?.picture
                    ? "data:image/png;base64," +
                      job.ownerUserInformation.picture
                    : baseProfilePicture
                }
                alt="Your picture"
              />
              <span>{job.hours} hours of work</span>
              <span>{job.payment}$/hours</span>
            </div>

            <div className="flex-1 direction-col items-center justify-center">
              <div>
                <h2>Description:</h2>
                <span>{job.description}</span>
              </div>
              <div>
                <h2>Availability:</h2>
                <span>{job.status?.name ?? "No"}</span>
              </div>

              <div>
                <h2>Location: </h2>
                <span>{job.location ?? "No"}</span>
              </div>

              <div>
                <h2>Minimum required experience: </h2>
                <span>{job.minRequiredExperience ?? "No"} years</span>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex direction-col items-center gap-1">
            <span>Pets that you will have to look for</span>
            <div className="flex flex-wrap gap-1 items-center">
              {job.pets?.map((s) => (
                <PetDescription key={s.id} pet={s} />
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn"
          onClick={handleTakeJob}
          disabled={user?.userName === job.ownerUserInformation?.userName}
          ref={takeJobButtonRef}>
          Take Job
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export interface IPetsProps {
  pet: Pet;
}

export const PetDescription: React.FC<IPetsProps> = ({ pet }) => {
  return (
    <div className="flex direction-col rounded-lg items-center justify-center border border-neutral">
      <div className="w-72 h-72">
        <img
          className="object-contain"
          // objectFit="cover"
          // w="20vh"
          // h="20vh"
          // mx="3vh"
          // mb="2vh"
          src={
            pet.image
              ? "data:image/png;base64," + pet.image.picture
              : baseDogPicture
          }
        />
      </div>

      <span>{pet.name}</span>
    </div>
  );
};

export default JobDialog;
