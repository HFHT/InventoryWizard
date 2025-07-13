import { ActionIcon, Burger, Center, Grid } from "@mantine/core";
import { ProfileAvatar } from "./ProfileAvatar";
import { IconBell } from "@tabler/icons-react";
import Logo from "../../../assets/Logo";
import { usePageLayoutTheme } from "./context/PageLayoutContext";
import { Search } from ".";

interface HeaderInterface {
    opened: boolean
    toggle: () => void
}
export function Header({ opened, toggle }: HeaderInterface) {
    const { hiddenFrom, isMobileOrTablet } = usePageLayoutTheme()
    return (
        <Grid m='xs' columns={48}>
            <Grid.Col span='content' order={1}>
                <Burger opened={opened} onClick={toggle} hiddenFrom={hiddenFrom} size="sm" />
            </Grid.Col>
            <Grid.Col span='content' order={2}>
                <Logo w='260px' />
            </Grid.Col>
            <Grid.Col span={isMobileOrTablet ? 45 : 35} order={isMobileOrTablet ? 6 : 3}>
                <Search searching={false} />
            </Grid.Col>
            <Grid.Col span={'content'} order={4} offset={isMobileOrTablet ? 14 : 0}>
                <Center>
                    <ActionIcon variant='default' size={40}  >
                        <IconBell />
                    </ActionIcon>
                </Center>
            </Grid.Col>
            <Grid.Col span={'content'} order={5}>
                <Center>
                    <ProfileAvatar size={40} />
                </Center>
            </Grid.Col>
        </Grid>
    )
}
