export async function fetchWrapper<T>(url: string): Promise<T> {
  let data;
  try {
    const response = await fetch(url);
    if (response.status !== 200 ) {
      throw new Error;
    }
    data = await response.json();
  } catch (error) {
    data = (error as Error).message;
  }
  return data;
}
