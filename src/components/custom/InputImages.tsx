import { Button, FileButton, Group, HoverCard, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";

interface Iimg {
    name: string;
    url: string;
    blob: any;
}
export interface Iimgs extends Array<Iimg> { }

interface InputImagesInterface {
    images: Iimg[]
    setImages: Function
    mode: 'item' | 'donation'
}
export function InputImages({ images, setImages, mode }: InputImagesInterface) {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
    const setFiles = (files: any) => {
        console.log(files)
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue
            if (!images.some((e: any) => e.name === files[i].name)) {
                setImages((prevImages: any) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        blob: files[i]
                    }
                ])
            }
        }
    }
    return (
        <>
            <FileButton onChange={setFiles} accept="image/*" multiple capture>
                {(props) =>
                    <>
                        <Button size={mobile ? "xs" : "sm"} {...props}>{mode === 'item' ? 'Upload Item Images' : 'Donation Images'}</Button>
                        <Group justify='center'>
                            <HoverCard width={310} shadow="md">
                                <HoverCard.Target>
                                    <IconInfoCircle />
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Text size="sm">
                                        The best results are when the manufacturer logo/name is clear and
                                        the product is at an angle so it can estimate height, width, and depth.                                    </Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Group>
                    </>}
            </FileButton>
        </>
    )
}
