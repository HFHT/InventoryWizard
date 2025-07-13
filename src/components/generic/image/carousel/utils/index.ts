export function uniqueKey() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}

export async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  // 1. Fetch the Blob from the blob URL
  const blob = await fetch(blobUrl).then(r => r.blob());

  // 2. Read as data URL
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}