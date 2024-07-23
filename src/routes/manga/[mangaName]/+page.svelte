
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/02b66b95da.js" crossorigin="anonymous"></script>
</head>
<script>
    import { onMount } from "svelte";



import { getMangaCover } from "../../../grabManga";
import ChapterLink from '../../../components/chapter.svelte'

import {getChapterList} from '../../../grabManga'

let mangaPromise 

let totalChapters

let mangaID

let chapterLoaded = false

let buttonsLoaded = false

let currentPage = 0

let chapterPages = []

let chapters = []



onMount(async() => {
    mangaID = window.location.pathname.split('/')[2]

    const res = await fetch('https://api.mangadex.org/manga/' + mangaID);

    

    const data = await res.json()


     mangaPromise = data.data



     
     console.log('hii');
     let i = 0
     

     const ret = await fetch(`https://api.mangadex.org/chapter?&limit=20&manga=${mangaID}&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`)
    const dava = await ret.json()
    totalChapters = dava.total
     console.log(totalChapters)

     while (i < Math.floor(Number(totalChapters)/20) + 1){
        chapterPages.push(i)

        i ++
     }

     buttonsLoaded = true
  
       
     for (const page in chapterPages) {
        const rep = await fetch(`https://api.mangadex.org/chapter?offset=${page * 20}&limit=20&manga=${mangaID}&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`)
        const date = await rep.json()

        console.log('done')
        
        let paga = []
        for (const data in date.data){

            let chapter = date.data[data]
            paga.push({id:chapter.id, name:chapter.attributes.chapter})
            
        }

        chapters.push(paga)

        

     }

     console.log(chapters)

     chapterLoaded = true


    
    
    // proms = await stuff(mangaTitle)





    })


    
   

     

    function changePage(page){
    
        currentPage = page
        
        
    }
    
     console.log(chapterPages)

    console.log(buttonsLoaded, chapterLoaded)

</script>
<div class="top">
    <i class="fa-solid fa-face-dizzy fa-5x"  style="color: #ffffff;"></i>
    <a class='home' href="/"><h1>MangaMania</h1></a>
</div>

{#if mangaPromise}
<div class="manga">
    <div class="mangaInfo">
        <div class="top-left">
            {#await getMangaCover(mangaPromise.id)}
            {:then image}
            <img src={image} alt="manga-cover">
            {/await}
            
        </div>

        <div class='top-right'>
            <h1 class="title">{mangaPromise.attributes.title.en}</h1>
            <div class="pettyInfoContainer">
                <p class="pettyInfo">Origination: {mangaPromise.type}</p>
                {#if (mangaPromise.attributes.publicationDemographic) != null}
                <p class="pettyInfo">Demographic: {mangaPromise.attributes.publicationDemographic}</p>
                {/if}
                
                <p class="pettyInfo">Published: {mangaPromise.attributes.year}</p>
                <p class="pettyInfo">Status: {mangaPromise.attributes.status}</p>
            </div>
            {#if chapterLoaded}

            <a href="/manga/{mangaPromise.id}/chapter/{chapters[0][0].id}">
                <button class = 'readFirst'>Read Ch.1</button>
            </a>
                
            {/if}
            
            <div class="mangaDescContainer">
                <h2 class="descTitle">Descritption</h2>
                <div class="desc">
                    <p class="mangaDesc">{mangaPromise.attributes.description.en}</p>

                </div>
            </div>

            
        </div>

    </div>
    
    <div class='chapters'>
        <h1 class="chaptersTitle">Chapters</h1>
        <div class="chapterPage">
           
   
          {#if chapterLoaded}
            {#each chapters[currentPage] as chapter}
              
                
                <ChapterLink mangaID = {mangaID} chapterName = {chapter.name} chapterID = {chapter.id}></ChapterLink>

                <hr>

                
                
            {/each}
                
        {/if}

        
            

            
            
        </div>

        {#if buttonsLoaded}

        <div class="buttonContainer">
            {#each chapterPages as page}
        
            <button class="pagination" on:click={ () => changePage(page)} let position = {page}>{page + 1}</button>
     
            
        {/each}

    </div>
            
        {/if}
        
     
        
       

    </div>
</div>
{/if}




<style>


    .top{
        width: 100vw;
        height: 20vh;

        

        background-color: #502274;

        gap: 2vh;

        display: flex;
        flex-direction: row;

        justify-content: right;
        align-items: center;
    }

    .top-left{
        display: flex;
        flex-direction: column;

        justify-content: start;
    }

    .home{
        color: white;
        font-size: 1.5em; 
        font-family: "Open Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 650;
        font-style: normal;
        font-variation-settings: "wdth" 100;

        padding: 2vw;
    }

    a{
        text-decoration: none;
    }

    
    .manga{
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: start;
    }

    .chapters{
        display: flex;
        flex-direction: column;

        align-items: center;
        gap: 5vh;

    }

    img{
        object-fit: contain;
        border-radius: 5px;
    }


    .mangaInfo{

        width: 90vw;
        display: flex;
        justify-content:space-evenly;

        gap:2vw;
    }

    .top-left{
        display: flex;
        justify-content: center;
    }

    .title{
        font-family: "Ubuntu", sans-serif;
        color: white;
        font-weight: 500;
    }

    img{
        border-radius: 5px;
    }

    .pettyInfo{
        font-family: "Ubuntu", sans-serif;
        color: white;
    }

    .readFirst{
        width: 16vw;
        height: 6vh;

        background-color: #502274;

        font-family: "Ubuntu", sans-serif;
        color: white;
        font-size: larger;
        font-weight: 700;
        border: none;
        border-radius: 5px;
    }

    .readFirst:hover{
        background-color: white;
        color: #502274;
        border-color: #502274;
        border:1em
    }

    .chapterPage{
        display: flex;
        flex-direction: column;
    }

    .buttonContainer{
        display: flex;

        flex-direction: row;
        align-items: center;
        justify-content: start; 
        flex-wrap: wrap;

        gap:2vw;

        width: 50vw;
    }

    .chaptersTitle{
        font-family: "Open Sans", sans-serif;
        color: white;


    }

    .pagination{
        width: 5vh;
        height: 5vh;

        font-family: "Open Sans", sans-serif;

        background-color: #502274;

        font-family: "Ubuntu", sans-serif;
        color: white;
        font-size: larger;
        font-weight: 700;
        border: none;
        border-radius: 5px;
    }


    hr{
        object-fit: fill;

        width: 100%;
    }

    .descTitle{
        font-family: "Ubuntu", sans-serif;
        color: white;
    }

    .mangaDesc{
        font-family: "Ubuntu", sans-serif;
        color: white;
    }

    @media(max-width: 600px){

        .mangaInfo{

        width: 90vw;
        display: flex;
        justify-content:center;
        flex-direction: column;

        gap:2vw;
    }


    .top-left{

        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .top-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .readFirst{
        width: 40vw;
        height: 6vh;

        background-color: #502274;

        font-family: "Ubuntu", sans-serif;
        color: white;
        font-size: larger;
        font-weight: 700;
        border: none;
        border-radius: 5px;
    }

    .mangaDescContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        width: 100vw;

    }
    .chapterPage{
        display: flex;
        flex-direction: column;

        align-items: center;
  

        width: 97vw;

    }

    .buttonContainer{
        display: flex;

        flex-direction: row;
        align-items: center;
        justify-content: center; 
        flex-wrap: wrap;

        gap:2vw;

        width: 100vw;
    }

    .desc{
        display: flex;
        justify-content: center;
        align-items: center;

    
    }

    }

    
</style>