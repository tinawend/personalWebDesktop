const desktop = document.createElement('template')
desktop.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<div id = 'endiv'></div>
<footer></footer>
<div>
<img class = 'ikon' id = 'chat' src = '/image/chatikon.png'/>
<img class = 'ikon' id = 'memo' src = '/image/memoryikon.png'/>
<img class = 'ikon' id = 'tictac' src = '/image/tictacikon.png'/>
</div>

`

const wind = document.createElement('template')
wind.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<div id = 'wrapper' draggable = 'true'>
<div class = 'close'>+</div>
<div class = 'app' >


</div> 
</div>
`

export { desktop, wind }
