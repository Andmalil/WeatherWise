export async function getSearchHints(word: string): Promise<any> {
    if (!word.length) {
        return []
    }
    const url = `http://127.0.0.1:3000/citysearch/${word}`
        try {
            const response = await fetch(url, {method: "GET"})
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json()
            if (data) {
                return data
            }
            
        } catch (error) {
            console.error(error)
        }
        return []
}


export async function getWeather(id: number) {
    const url = `http://127.0.0.1:3000/search/${id}`
    try {
        const response = await fetch(url, {method: "GET"})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const data = await response.json()
        if (data) {
            return data
        }
        
    } catch (error) {
        console.error(error)
    }

    return null
}