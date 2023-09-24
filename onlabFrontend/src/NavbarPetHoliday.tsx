import { Group, Navbar } from "@mantine/core";

export interface INavbarProps {
  opened: boolean;
}

export default function NavbarPetHoliday({ opened }: INavbarProps) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="xl"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Group />
    </Navbar>
  );
}
