
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
</head>


<script>
    export let chapterName
    export let chapterID
    export let mangaID

</script>

<div class="container">
    <a href="/manga/{mangaID}/chapter/{chapterID}"><h3>Chapter {chapterName}</h3></a>

</div>


<style>
    a{
        text-decoration: none;
        color: white;
        font-family: "Open Sans", sans-serif;

    }

    .container{
        width: 60vw;

        display: flex;
        flex-direction: row;
        justify-content:start;
        align-items: center;
        gap:5vw
    }

</style>