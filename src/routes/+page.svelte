


<head>
    <script src="https://kit.fontawesome.com/02b66b95da.js" crossorigin="anonymous"></script>

</head>


<script>
    

    
    import Card from '../components/show-card.svelte'
    import {getTopManga} from '../grabManga'
    import { searchManga } from '../grabManga'
    import {getMangaCover} from '../grabManga'
    import {searchV} from '../grabManga'

    const mangaCount = []
    let i = 0
    while(i<100){
        mangaCount.push(i)

        i++
    }
    let promise = getTopManga()
    let searchValue = ''
    let searchedValue
    let searchPromise 
    let searchStatus = false
    function defaulted(){
        searchStatus = false
    }
    function search(){
        searchStatus = true
        searchedValue = searchValue
        searchPromise = searchV(searchValue)
        searchValue = ''
    }
</script>

<div class="top">

<a href="/" on:click={defaulted}><i class="fa-solid fa-face-dizzy fa-5x"  style="color: #ffffff;"></i><h1>MangaMania</h1></a>

<form on:submit={search}>
    <label for='search-bar'>Search Manga</label>
    <input bind:value={searchValue} type="text" class="search-bar" name="search-bar">
     {#if searchValue}   
    <button>Search</button >
    {/if}
    
</form>
</div>
<div class="Main-container">
{#if searchStatus == false}
   
    <h2>Popular Manga</h2>
    <div class="cards">
        
            {#await promise}
            
            <p>hollon a quick second friend</p>
            {:then titles} 
            {#each titles as title}
                <!-- {#if title.data[manga].title_english != null} -->
                {#await getMangaCover(title.id)}
                    <p></p>
                {:then cover} 
                    {#if (title.attributes.title.en === undefined)}
                <Card title='no english name'  poster = { cover } mangaLink = {title.id}/>
                    {:else}
                <Card title={title.attributes.title.en}  poster = { cover } mangaLink = {title.id}/>
                    {/if}
                {/await}
                <!-- {:else} -->
                <!-- <Card title={title.data[manga].titles[0].title} poster = {title.data[manga].images.webp.image_url} mangaLink = {title.data[manga].url}/>
                {/if} -->
                {/each} 
            {:catch error}
                <p>lil mistake</p>   
                
            {/await}
        
    </div>

    {:else}

    <h2>Results for {searchedValue}</h2>
    <div class="cards">
        {#await searchPromise}
    <p>hollon a quick second friend</p>
    {:then titles} 
        {#each titles as manga}
          
        {#await getMangaCover(manga.id)}
        <p>haha</p>
        {:then image}
        <Card title={manga.attributes.title.en}   poster ={image} mangaLink = {manga.id}/>
        {/await}
           
              
            
                    
            
        {/each}
        {:catch error}
        <p>lil mistake</p>
        {/await}
    </div>
{/if}

</div>
<style>
    h2{
        color: white;

font-family: "Open Sans", sans-serif;
font-optical-sizing: auto;
font-weight: 650;
font-style: normal;
font-variation-settings: "wdth" 100;
    }

    label{
        font-family: "Open Sans", sans-serif;
        color: white;

        font-size: 1em; 
    }
     .top{
        width: 100vw;
        height: 20vh;
        background-color: #502274;
        margin: 0;
        padding: 0;


        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    h1{
        color: white;
        font-size: 3em; 
        font-family: "Open Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 650;
        font-style: normal;
        font-variation-settings: "wdth" 100;
    
    }

    a{
        text-decoration: none;

        display: flex;
        flex-direction: row;
        gap: 2vw;
    }

    .Main-container{
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;

       
       
    }
    .cards{
        display: flex;
        flex-wrap:wrap;

        align-items: center;
        justify-content:center;

        width: 100vw;
        
    }

    form{
        width: 50vw;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1vw;
    }


    .search-bar{
        background-color: #a3a3a3;
        width: 20vw;
        height: 4vh;
        border-radius: 5px;

        border: 0;

        color: white;
    }
    button{
        width: 4vw;
        height: 4vh;

        background-color: black;
        color: white;
        border: 0;
        border-radius: 5px;
    }

    button:hover{
        background-color: #dc2626;
    }

    .search-bar:focus{
        border-color: black;
        outline: none;
    }

    @media(max-width: 600px)  {
        .Main-container{
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;

       
       
        }
        .cards{
        display: flex;
        flex-direction: column;
        flex-wrap:nowrap;

        align-items: center;
        justify-content:center;

        width: 100vw;
        
        }

        h1{
            font-size: large;
        }

        h2{
            font-size: medium;
        }

        label{
            font-size: small;
        }
        .search-bar{
        width: 80vw;
        height: 4vh;
    }

    form{
        flex-direction: column;
    }

    button{
        width: 50vw;
    }
    } 

</style>

