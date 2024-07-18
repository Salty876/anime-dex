export async function getTopManga() {


    const apiEndPoint = 'https://api.jikan.moe/v4/top/manga'
    
        const res = await fetch(apiEndPoint)
         if (!res.ok){
            throw new Error('HTTP error! status: ${res.status}')
        }
        const data = await res.json()
        return await data
        }
    

export async function searchManga(searchTerm) {


    const apiEndPoint = "https://api.jikan.moe/v4/manga?q=" + searchTerm + '&sfw=true'
            
    const res = await fetch(apiEndPoint)
    if (!res.ok){
        throw new Error('HTTP error! status: ${res.status}')
        }
    const data = await res.json()
    console.log(data)
    return await data
    }
            
          