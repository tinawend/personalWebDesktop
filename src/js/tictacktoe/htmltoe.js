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

export { template2 }
