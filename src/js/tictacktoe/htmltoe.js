const template2 = document.createElement('template')
template2.innerHTML = `
<head><link rel="stylesheet" href="css/style.css"></head>
<h1>Tic Tac Toe</h1>
<table>
<tr>
<td class = 'box' id = '1' value = '1'></td>
<td class = 'box' id = '2'></td>
<td class = 'box' id = '4'></td>
</tr>

<tr>
<td class = 'box' id = '8'></td>
<td class = 'box' id = '16'></td>
<td class = 'box' id = '32'></td>
</tr>

<tr>
<td class = 'box' id = '64'></td>
<td class = 'box' id = '128'></td>
<td class = 'box' id = '256'></td>
</tr>
</table>


`
const template3 = document.createElement('template')
template3.innerHTML = `
<form>
player 1: <br>
<input type = 'text' name = 'player1'><br>
player2: <br>
<input type = 'text' name = 'player2'><br><br>
<input id='username' type = 'submit' value = 'Submit'>
</form>
`

export { template2, template3 }
