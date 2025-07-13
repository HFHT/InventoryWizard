import { useState } from "react";
import { fetchWithNotification } from "../../../../../services";
import { blobUrlToDataUrl } from "../utils";
import { showNotification } from "@mantine/notifications";
const VISIONPROMPT = 'Analyze the image. Generate a product title. Also generate a product description which includes the color and finish or fabric. Estimate the product weight in pounds, size in feet, and thrift store price in US dollars. Try to provide the manufacturer.  Categorize the product into one of the following:  Cabinet, Rug, Lighting, Art/Décor, Sporting Goods, Furniture, Appliance, Household, Tool, Electronics, Electrical, Plumbing, Flooring, Door, Window, or Building Materials. For the Furniture and Appliance categories provide the most appropriate room from the following choices: Living Room, Dining Room, Kitchen, Laundry, Patio & Outdoor Living, Office, Heating & Cooling, Garage, or Household. Return response in JSON format: {title: string, description: string, category: string, room: string, weight: number, size: {height: number, width: number, depth: number}, manufacturer: string, price: number}'

const PRICE_ADJUST = -1
const AI_RESPONSE_EMPTY = { category: '', description: '', manufacturer: '', price: 0, room: '', title: '', weight: 0, size: { height: 0, width: 0, depth: 0 }, feature: false, product: false, guarantee: false, deliver: false, dimensions: false, qty: 1 }
export function useVisionAI(prompt: string) {
    const [AIresponse, setAIresponse] = useState<null | any>(null)
    const [AIresponseList, setAIresponseList] = useState<null | string>(null)

    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const analyze = async (imgUrl: any) => {
        console.log(imgUrl)
        console.log(imgUrl.blob)

        const dataUrl = await blobUrlToDataUrl(imgUrl)
        const headers = new Headers()
        const optionsDesc = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                img: dataUrl,
                prompt: prompt
            })
        };
        setIsAnalyzing(true)
        setAIresponse(null)
        const res: any = await fetchWithNotification(
            `${import.meta.env.VITE_OPENAI_VISION}/api/AnalyzeImage`, optionsDesc, {showSuccessNotification: false}
        );
        console.log(res)
        const cleanedRes = res.choices[0].message.content.substring(res.choices[0].message.content.indexOf('{'), res.choices[0].message.content.lastIndexOf('}') + 1)
        if (cleanedRes === '' || cleanedRes === null || cleanedRes === undefined) {
            console.warn('useVision could not analyze image - ', res.choices[0].message.content)
            showNotification({
                title: 'Open AI',
                message: res.choices[0].message.content,
                color: 'yellow',
            });
            setIsAnalyzing(false)
            setAIresponse({ ...AI_RESPONSE_EMPTY })
            return
        }
        const objRes = JSON.parse(cleanedRes)
        console.log(cleanedRes)
        console.log(objRes)
        setIsAnalyzing(false)
        objRes.price = objRes.price > 50 ? objRes.price + PRICE_ADJUST : objRes.price
        objRes.manufacturer = objRes.manufacturer === 'Unknown' ? '' : objRes.manufacturer
        setAIresponse({ ...objRes, feature: false, product: false, guarantee: false, deliver: true, dimensions: true, qty: 1 })
    }

    return { analyze, AIresponse, setAIresponse, AIresponseList, setAIresponseList, isAnalyzing } as const
}