import { Box, Button, Divider, Flex, LoadingOverlay } from "@mantine/core";
import { InputImages, type Iimgs } from "../components/custom";
import { useMemo, useState } from "react";
import { usePageLayoutTheme } from "../components/generic/PageLayout/context/PageLayoutContext";
import { ImageCarousel } from "../components/generic/image";
import { IconAi, IconPhotoX, IconRefresh } from "@tabler/icons-react";
import { useVisionAI } from "../components/generic/image/carousel/hooks/useVisionAI";
import { useSettingsContext } from "../components/generic/settings/context/SettingsContext";

export function Receipt() {
    const { isMobileOrTablet } = usePageLayoutTheme()
    const { _prompts } = useSettingsContext()
    console.log(_prompts[0].prompt)
    const { analyze, AIresponse, setAIresponse, isAnalyzing } = useVisionAI(_prompts[0].prompt)
    const [images, setImages] = useState<Iimgs>([])
    const carouselImages = useMemo(() => {
        return images.map(i => i.url)
    }, [images])

    const doClear = () => {
        // setAIresponse(null)
        // setImages([])
        // setOpenForm(false)
    }
    const doSave = () => {
        // setAIresponse(null)
        // setImages([])
        // setOpenForm(false)
    }

    const menuItems = [
        {
            label: 'Analyze',
            icon: <IconAi style={{ width: '1rem', height: '1rem' }} />,
            action: (e: any) => analyze(e)
        },
        {
            label: 'Remove',
            icon: <IconPhotoX style={{ width: '1rem', height: '1rem' }} />,
            action: (e: any) => console.log('Remove', e)
        },
        {
            label: 'Clear',
            icon: <IconRefresh style={{ width: '1rem', height: '1rem' }} />,
            action: () => setImages([])
        },
    ]

    return (
        <>
            <Flex gap="xs" justify="center" direction="row" wrap="nowrap">
                <InputImages images={images} setImages={setImages} mode='item' />
                <Button size={isMobileOrTablet ? "xs" : "sm"} onClick={doClear} disabled={images.length > 0 && AIresponse ? false : true}>Clear</Button>
                <Button size={isMobileOrTablet ? "xs" : "sm"} onClick={doSave} disabled={images.length > 0 && AIresponse ? false : true}>Save</Button>
            </Flex>
            <Divider my={7} />
            <ImageCarousel w={120}
                images={carouselImages}
                menu={menuItems}
                open={true}
                hasChanged={false} buttonLocation="inline" withIndicators={false}
                hideActions
                hideInput
            // hideMenu 
            />
            <Divider my={5} />
            <Box pos='relative'>
                {/* <LoadingOverlay visible={isAnalyzing || isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                < ResponseEdit open={openForm} response={AIresponse} tweak={(e: any) => setAIresponse(e)} setProduct={(e: any) => set_Product(e)} saveProduct={(e: any) => saveProduct(e)} /> */}
            </Box>
        </>
    )
}
