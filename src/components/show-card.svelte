<script>
    export let title
    export let poster
    export let mangaLink
</script>


<main> 

    <div class="card">
        <a href='/manga/{mangaLink}'>
        
                <input class='img' type="image" src="{poster}" alt="anime-poster" href='/manga/{mangaLink}'/>
        </a>
    
        <p class="anime-title">{title}</p>
    
    </div>
</main>

<style>
    main{
      width: 10vw;
      padding-left: 5vw;
      padding-right: 6vw;
    }
  
    .img{
      border-radius: 2vh;
    }
  
    p{
    font-family: "Open Sans", sans-serif;
      
      color: white;
    }
  
    .card{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }


    @media(max-width: 600px) {
        main{
            width: 80vw;
        }
    }
  </style>
  