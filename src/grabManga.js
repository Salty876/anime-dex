export async function getTopManga() {

    ;

    const apiEndPoint = 'https://corsproxy.io/?https://api.mangadex.org/manga?limit=100'
    
        const res = await fetch(apiEndPoint)
         if (!res.ok){
            throw new Error('HTTP error! status: ${res.status}')
        }
        const data = await res.json()

        return await data.data
        }

export async function getMangaCover(id) {


    const apiEndPoint = 'https://corsproxy.io/?https://api.mangadex.org/cover?limit=10&manga%5B%5D=' + id +'&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc'
    
    const res = await fetch(apiEndPoint)
    if (!res.ok){
        throw new Error('HTTP error! status: ${res.status}')
    }

    const data =  await res.json()

    const fileName = data.data[0].attributes.fileName + '.256.jpg'
  

    return  `https://corsproxy.io/?https://uploads.mangadex.org/covers/${id}/${fileName}`
       

}


export async function searchV(searchTerm) {


    const apiEndPoint = "https://corsproxy.io/?https://api.mangadex.org/manga?title=" + searchTerm + '&limit=50'

    
    const res = await fetch(apiEndPoint)
    if (!res.ok){
        throw new Error('HTTP error! status: ${res.status}')
    }

    const data =  await res.json()

    console.log(data.data)
  

    return  data.data
       

}

export async function searchManga(searchTerm) {


    const apiEndPoint = "https://api.mangadex.org/manga?title=" + searchTerm + '&limit=50'
            
    const res = await fetch(apiEndPoint)
    if (!res.ok){
        throw new Error('HTTP error! status: ${res.status}')
        }
    const data = await res.json()

    return await data.data
    }
            
          
    export async function getManga(id) {


        const apiEndPoint = 'https://api.mangadex.org/manga/' + id
        
            const res = await fetch(apiEndPoint)
             if (!res.ok){
                throw new Error('HTTP error! status: ${res.status}')
            }
            const data = await res.json()
    
            return await data.data
            }

  export async function getChapterList(mangaID, currentPage) {


        const apiEndPoint = `https://api.mangadex.org/chapter?offset=${currentPage * 20}&limit=20&manga=${mangaID}&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=desc&order%5BupdatedAt%5D=desc&order%5BpublishAt%5D=desc&order%5BreadableAt%5D=desc&order%5Bvolume%5D=desc&order%5Bchapter%5D=desc`
        console.log(apiEndPoint)
            const res = await fetch(apiEndPoint)
             if (!res.ok){
                throw new Error('HTTP error! status: ${res.status}')
            }
            const data = await res.json()
    
            return await data.data
            }




    // export async function  stuff(title){
        
    
    
        
    //     const baseUrl = 'https://api.mangadex.org';
        
    //     const resp = await axios({
    //         method: 'GET',
    //         url: `${baseUrl}/manga`,
    //         params: {
    //             title: title,
    //             limit: 100
    //         }
    //     })
    //     let ID = resp.data.data
    //     console.log(ID)
    //     return await ID

    // const apiEndPoint = "https://api.mangadex.org/manga/" + ID
                
    //     const res = await fetch(apiEndPoint)
    //     if (!res.ok){
    //         throw new Error('HTTP error! status: ${res.status}')
    //         }
    //     const dats = await res.json()
    //         console.log(dats.data)


    //     return await dats.data
        
        
        
    
    //     }