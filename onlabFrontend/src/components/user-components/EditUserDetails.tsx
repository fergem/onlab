import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { UpdateUserDetailsModel } from "../../models/User";
import ProfilePicture from "./ProfilePicture";

export interface IEditUserDetails {
  profilePicture: string | undefined;
  currentUserDetails: UpdateUserDetailsModel;
  updateUserDetails(newDetails: UpdateUserDetailsModel): void;
}

export default function EditUserDetails({
  profilePicture,
  currentUserDetails,
  updateUserDetails,
}: IEditUserDetails) {
  const [userDetails, setUserDetails] = useState(currentUserDetails);

  const updateDisabled =
    userDetails.email === currentUserDetails?.email &&
    userDetails.firstName === currentUserDetails?.firstName &&
    userDetails.lastName === currentUserDetails?.lastName &&
    userDetails.location === currentUserDetails?.location &&
    userDetails.phoneNumber === currentUserDetails?.phoneNumber;

  const handleUpdate = () => {
    updateUserDetails(userDetails);
  };

  const handleSetFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstName = event.target.value;
    setUserDetails((prev) => ({ ...prev, firstName: newFirstName }));
  };
  const handleSetLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = event.target.value;
    setUserDetails((prev) => ({ ...prev, lastName: newLastName }));
  };
  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setUserDetails((prev) => ({ ...prev, email: newEmail }));
  };
  const handleSetLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = event.target.value;
    setUserDetails((prev) => ({ ...prev, location: newLocation }));
  };
  const handleSetPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = event.target.value;
    setUserDetails((prev) => ({ ...prev, phoneNumber: newPhoneNumber }));
  };

  return (
    <Group grow spacing={0}>
      <ProfilePicture picture={profilePicture} />
      <Stack justify="center" miw="250px">
        <Group miw="250px" noWrap>
          <TextInput
            label="First Name"
            placeholder="John"
            onChange={handleSetFirstName}
            value={userDetails.firstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Doh"
            onChange={handleSetLastName}
            value={userDetails.lastName}
          />
        </Group>

        <Group miw="250px" noWrap>
          <TextInput
            label="Location"
            placeholder="Budapest"
            onChange={handleSetLocation}
            value={userDetails.location}
          />
          <TextInput
            label="Phone number"
            placeholder="+36709912323"
            onChange={handleSetPhoneNumber}
            value={userDetails.phoneNumber}
          />
        </Group>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          onChange={handleSetEmail}
          value={userDetails.email}
        />
        <Button disabled={updateDisabled} onClick={handleUpdate}>
          Update profile
        </Button>
      </Stack>
    </Group>
  );
}
