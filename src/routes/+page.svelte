





<script>
    

    
    import Card from '../components/show-card.svelte'
    import {getTopManga} from '../grabManga'
    import { searchManga } from '../grabManga'

    const mangaCount = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
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
        searchPromise = searchManga(searchValue)
        searchValue = ''
    }
</script>

<div class="top">
<a href="/" on:click={defaulted}><h1>The <b>super</b> complete manga pokedex</h1></a>
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
        {#each mangaCount as manga}
            {#await promise}
            <p>hollon a quick second friend</p>
            {:then title} 
                {#if title.data[manga].title_english != null}
                
                <Card title={title.data[manga].title_english} poster = {title.data[manga].images.webp.image_url} mangaLink = {title.data[manga].url}/>
                {:else}
                <Card title={title.data[manga].titles[0].title} poster = {title.data[manga].images.webp.image_url} mangaLink = {title.data[manga].url}/>
                {/if}
            {:catch error}
                <p>lil mistake</p>    
            {/await}
        {/each}
    </div>

    {:else}

    <h2>Results for {searchedValue}</h2>
    <div class="cards">
        {#await searchPromise}
    <p>hollon a quick second friend</p>
    {:then title} 
        {#each title.data as manga}
          
            
                {#if manga.title_english != null}
                
                <Card title={manga.title_english} poster = {manga.images.webp.image_url} mangaLink = {manga.url}/>
                {:else}
                <Card title={manga.titles[0].title} poster = {manga.images.webp.image_url} mangaLink = {manga.url}/>
                {/if}
            
                    
            
        {/each}
        {:catch error}
        <p>lil mistake</p>
        {/await}
    </div>
{/if}

</div>
<style>
    h2{
        color: #dc2626;

font-family: "Open Sans", sans-serif;
font-optical-sizing: auto;
font-weight: 650;
font-style: normal;
font-variation-settings: "wdth" 100;
    }

    label{
        font-family: "Open Sans", sans-serif;
        color: white;
    }
     .top{
        width: 100vw;
        height: 20vh;

        margin: 0;
        padding: 0;


        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    h1{
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

