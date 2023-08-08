import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGetUserPets } from "../../hooks/UserHooks";
import { baseDogPicture } from "../../utility/constants";

interface IProps {
  selectedPets: number[];
  setSelectedPets: (id: number) => void;
}

export const PetSelector: React.FC<IProps> = ({
  selectedPets,
  setSelectedPets,
}) => {
  const theme = useTheme();
  const [pets, error, loading, listPets] = useGetUserPets();
  useEffect(() => {
    listPets();
  }, []);

  const handleSelectPets = (id: number) => {
    setSelectedPets(id);
  };

  const getIsSelectedPet = (id: number) =>
    selectedPets.includes(id)
      ? `solid ${theme.palette.primary.main}`
      : "solid white";

  console.log(selectedPets);
  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ padding: "2%" }}>
      <Stack direction="column" sx={{ padding: "2%" }}>
        <Typography variant="h6" gutterBottom>
          Please select pets
        </Typography>
        <Typography variant="body2">
          These pets will be added to your newly created job.
        </Typography>
      </Stack>
      <Box sx={{ padding: "1%", minWidth: 350, maxWidth: 300 }}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap">
          {pets.map((s) => (
            <Stack
              onClick={() => handleSelectPets(s.id)}
              key={s.id}
              minWidth="150px"
              minHeight="150px"
              borderRadius="10%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="2%"
              sx={{
                border: getIsSelectedPet(s.id),
              }}>
              <Box sx={{ maxWidth: "120px", borderRadius: "10%" }}>
                <img
                  src={s.image?.picture ?? baseDogPicture}
                  srcSet={s.image?.picture ?? baseDogPicture}
                  alt={s.name ?? "title"}
                  loading="lazy"
                />
              </Box>
              <Typography variant="caption">{s.name}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
