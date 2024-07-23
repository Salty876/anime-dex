<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
<script src="https://kit.fontawesome.com/02b66b95da.js" crossorigin="anonymous"></script>

</head>


<script>

import { onMount } from "svelte";

    let chapterID 

    let mangaID

    let chapterPics 
    let mangaInfo
    let chapterInfo
    onMount(async() => {
    chapterID = window.location.pathname.split('/')[4]
    mangaID =  window.location.pathname.split('/')[2]
    const res = await fetch('https://api.mangadex.org/at-home/server/' + chapterID);
    const data = await res.json()

    const rep = await fetch('https://api.mangadex.org/chapter/' + chapterID);
    const dates = await rep.json()
    
    const ret = await fetch('https://api.mangadex.org/manga/' + mangaID);
    const dat = await ret.json()


    chapterPics = data
    chapterInfo = dates.data
    mangaInfo = dat.data
    
    
    console.log(chapterPics)


    })
</script>


<div class="all">
{#if chapterPics}

<div class="top">
    <div class="header">
        <a class='home' href="/"><i class="fa-solid fa-face-dizzy fa-6x"  style="color: #ffffff;"></i><h1>MangaMania</h1></a>

    </div>
    

    <div class="idBox">
        <h3 class="chapterNum">Chapter {chapterInfo.attributes.chapter}</h3>
        <hr>
        <a href="/manga/{mangaID}"><h3 class="mangaTitle">{mangaInfo.attributes.title.en}</h3></a>
    </div>

</div>
<div class="chapter-Container">
{#each chapterPics.chapter.data as page}
    <img class='page' src="{chapterPics.baseUrl}/data/{chapterPics.chapter.hash}/{page}" alt="page">
  
{/each}

</div>

<div class="bottom">
    {#if (chapterInfo.attributes.chapter > 1) }
<a href="#"><button class="endAction">Previous Chapter</button></a>
    {/if}
<a href="/manga/{mangaID}"><button class="endAction">Manga Page</button></a>
    {#if mangaInfo.attributes.latestUploadedChapter > chapterID}
    <a href="#"><button class="endAction">Next Chapter</button></a>
    {/if}

</div>
{/if}

</div>
<style>

    .all{
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 4vh;
    }
    .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100vw;

       
    }


    .header{
        width: 100vw;
        height: 20vh;
        background-color: #502274;

        display:flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        gap: 5vw;

    }
    .home{
        color: white;
        font-family: "Open Sans", sans-serif;

    }

    .chapterNum{
        color: white;
        font-family: "Open Sans", sans-serif;


    }

    a{
        text-decoration: none;
        color: white;
        font-family: "Open Sans", sans-serif;

        display: flex;
        flex-direction: row;
        gap: 2vw;

    }
    .chapter-Container{
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        gap: 2vh;
    }


    .page{
        object-fit: contain;
        max-width: 50%;
        max-height: 70%;
    }

    .idBox{
        display: flex;
        flex-direction: row;
        justify-content: center;

        width: 70vw;
    }

    hr{
        color: white;
    }

    .bottom{
        width: 100vw;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    .endAction{
        object-fit: fill;
        max-width: 100vw;
        max-height: 10vh;
        min-width: 33vw;
        background-color: #502274;
        border: none;

        color: white;
    }


    @media(max-width: 600px){

        .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100vw;

       
    }

    .header{
        width: 100vw;
        height: 30vh;
        background-color: #502274;

        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5vw;

    }

    .chapter-Container{
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        gap: 2vh;

        width: 100vw;
    }

    .page{
        object-fit: contain;
        max-width: 90%;
        max-height: 100%;
    }
    }


</style>