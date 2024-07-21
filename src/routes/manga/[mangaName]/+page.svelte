
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
</head>
<script>
    import { onMount } from "svelte";
    import axios from 'axios';


import { getMangaCover } from "../../../grabManga";
import ChapterLink from '../../../components/chapter.svelte'

let mangaPromise 

let chapterList

let mangaID

onMount(async() => {
    mangaID = window.location.pathname.split('/')[2]

    const res = await fetch('https://api.mangadex.org/manga/' + mangaID);

    const data = await res.json()


    const rep = await fetch('https://api.mangadex.org/manga/' + mangaID + '/feed?limit=500&order%5BcreatedAt%5D=desc');
    const dates = await rep.json()

     mangaPromise = data.data
     chapterList = dates.data

    console.log(mangaPromise)
    // proms = await stuff(mangaTitle)

    console.log(mangaID)



    })



</script>
<a class='home' href="/"><h1>The <b>super</b> complete manga pokedex</h1></a>
{#if mangaPromise && chapterList}
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
            <a href="/manga/{mangaPromise.id}/chapter/{chapterList[0].id}">
                <button>Read Ch.1</button>
            </a>
            <div class="mangaDescContainer">
                <h2 class="descTitle">Descritption</h2>
                <p class="mangaDesc">{mangaPromise.attributes.description.en}</p>
            </div>

            
        </div>

    </div>

    <div class='chapters'>
        <h1>chapters</h1>

  
            {#each chapterList as chapter}
                {#if (chapter.attributes.translatedLanguage) == 'en'}
                <ChapterLink mangaID = {mangaPromise.id} chapterName = {chapter.attributes.chapter} chapterID = {chapter.id}></ChapterLink>
                <br>
                {/if}
                
            {/each}
            
       

    </div>
</div>
{/if}




<style>

    .home{
        color: #dc2626;

        font-family: "Open Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 650;
        font-style: normal;
        font-variation-settings: "wdth" 100;
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


    .mangaInfo{
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

    button{
        width: 16vw;
        height: 6vh;

        background-color: #facc15;

        font-family: "Ubuntu", sans-serif;
        color: white;
        font-size: larger;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        
    }

    
</style>