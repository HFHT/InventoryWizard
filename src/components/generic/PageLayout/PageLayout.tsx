import React, { type ReactElement } from 'react';
import { AppShell, Stack, NavLink } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Footer, Header, MainPageSelector, type DatabaseMeta, type SearchFnType } from '.';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { useDisclosure } from '@mantine/hooks';
import { PageLayoutProvider } from './context/PageLayoutContext';

interface MainNavbarProps {
    navigationTree: NavStructure
    toggle: () => void
}
function MainNavbar({ navigationTree, toggle }: MainNavbarProps) {
    const { navigation, setNavigation } = useNavigation();
    const handleNavClick = (selected: NavItem) => {
        setNavigation((prev: any) => ({ ...prev, page: selected.page, filter: selected.filter, key: selected.key }));
        toggle()
    };

    return (
            <Stack gap="xs">
                {navigationTree.map((item) =>
                    item.children ? (
                        <NavLink key={item.label} label={item.label} childrenOffset={12}>
                            {item.children.map((child: any) => (
                                <NavLink
                                    key={child.label}
                                    label={child.label}
                                    active={navigation.key === child.key}
                                    onClick={() => handleNavClick(child)}
                                />
                            ))}
                        </NavLink>
                    ) : (
                        <NavLink
                            key={item.label}
                            label={item.label}
                            active={navigation.key === item.key}
                            onClick={() => handleNavClick(item)}
                        />
                    )
                )}
            </Stack>
    );
}

// type NavNode<P = string> = {
//     label: string;
// } & (
//         | { page: P; filter?: string; children?: never, key: string }
//         | { children: NavNode<P>[]; page?: never; filter?: never, key: string }
//     );

// export type NavStructureType<P = string> = NavNode<P>[];

type NavItemBase = {
    label: string;
    key: string;
};

type NavLeaf = NavItemBase & {
    page: ReactElement;
    filter?: string;
    children?: never;
};

type NavGroup = NavItemBase & {
    children: NavItem[];
    filter?: never;
    page?: never;
};

export type NavItem = NavLeaf | NavGroup;

export type NavStructure = NavItem[];

type PageLayoutProps = {
    children?: React.ReactNode
    themeProps: PageLayoutTheme,
    searchProps: SearchProps,
    navigationTree: NavStructure
};
export type PageLayoutTheme = {
    hiddenFrom: mantineBreakPoints,
    isMobileOrTablet: boolean
}
export type mantineBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SearchProps = {
    searchSources: DatabaseMeta[]
    searchFn: SearchFnType
    unsavedChanges: boolean
    requestSave: () => void
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, themeProps, searchProps, navigationTree }) => {
    const [opened, { toggle }] = useDisclosure();
    const { isMobileOrTablet, hiddenFrom } = themeProps
    return (
        <NavigationProvider>
            <Notifications />
            <AppShell
                header={{ height: isMobileOrTablet ? 110 : 70 }}
                navbar={{
                    width: { base: 200, md: 220, lg: 240 },
                    breakpoint: hiddenFrom,
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <PageLayoutProvider themeProps={themeProps} searchProps={searchProps}>
                    <AppShell.Header>
                        <Header opened={opened} toggle={toggle} />
                    </AppShell.Header>
                    <AppShell.Main>
                        {children ? children : null}
                        <MainPageSelector />
                    </AppShell.Main>
                </PageLayoutProvider>
                <AppShell.Navbar p="md">
                    <MainNavbar navigationTree={navigationTree} toggle={toggle} />
                </AppShell.Navbar>
                <AppShell.Footer zIndex={opened ? 'auto' : 201}>
                    <Footer />
                </AppShell.Footer>
            </AppShell>
        </NavigationProvider>
    )
};
