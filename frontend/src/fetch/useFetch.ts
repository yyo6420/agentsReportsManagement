import { useEffect, useState } from "react"

const useFetch = (
    url: string,
    option: Record<string, any>,
    dependencies: ReadonlyArray<unknown> = []
) => {

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = option ? await fetch(url, option) : await fetch(url);
                const result = await response.json();
                if (!response.ok) throw new Error(result.message || "The fecth request failed :(");

                setData(result);

            } catch (error) {
                if (!(error instanceof (Error))) return console.log(error);
                setError(error);
            } finally {
                setIsloading(false)
            }
        }
        fetchData();
    }, dependencies)
    return { data, error, isLoading }
};

export default useFetch;