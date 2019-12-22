const desktop = document.createElement('template')
desktop.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<div id = 'endiv'></div>
<footer></footer>
<div>
<img class = 'ikon' id = 'chat' src = '/image/chatikon.png'/>
<img class = 'ikon' id = 'memo' src = '/image/memoryikon.png'/>
<img class = 'ikon' id = 'puzzle' src = '/image/puzzleikon.jpg'/>
</div>

`

const wind = document.createElement('template')
wind.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<div id = 'div'>
<div id = 'div2' draggable = 'true'>
<div class = 'close'>+</div>
</div>
</div> 
`

export { desktop, wind }
