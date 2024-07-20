<script>
    import { onMount } from "svelte";
    import axios from 'axios';


import { stuff } from "../../../grabManga";

let proms 

let mangaTitle

onMount(async() => {
    mangaTitle = window.location.pathname.split('/')[2]

    // proms = await stuff(mangaTitle)

    console.log(mangaTitle)

    return mangaTitle
    })



</script>


{#await stuff(mangaTitle)}
    
{:then manga} 
    <h1>{manga.attributes.title.en}</h1>
{/await}