const template1 = document.createElement('template')
template1.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<h1>Chat</h1>
username: <br>
<p id = 'yourUsername'></p>
<input id = 'username' type = 'text' name = 'username'><br>
<button id = 'save'> Spara </button>
<h2></h2>
<p></p>
<div class = 'chat'>
<div class = 'messages'>

<template>
<div class = 'message'>
<p class = 'author'></p>
<p class = 'text'></p>

</div>
</template>

</div>
<textarea class = 'messageArea'></textarea>
</div>

`

export { template1 }
