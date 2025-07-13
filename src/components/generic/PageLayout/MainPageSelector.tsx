import { useNavigation } from "./context/NavigationContext"

export function MainPageSelector() {
    const { navigation } = useNavigation()
    return (
        <>
            {navigation.page}
        </>
    )
}
