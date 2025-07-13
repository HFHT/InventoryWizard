export async function fetchSettings() {
    const retVal = await (await fetch(`${import.meta.env.VITE_INVENTORY_API}/getSettings`)).json();
    return retVal;
}