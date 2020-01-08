const template = document.createElement('template')
template.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<h1>Memory Game</h1>
<h2></h2>
<p id = 'win'></p>
<div id = 'pics'>
</div>

`
const fourOrTwo = document.createElement('template')
fourOrTwo.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<p>
choose a gameboard </p>
<button id = 'four'> 4 x 4</button>
<button id = 'two'> 2 x 2</button>
<button id = 'twofour'> 2 x 4</button>

`
export { template, fourOrTwo }
