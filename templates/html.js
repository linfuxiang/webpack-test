let args = process.argv.slice(2);
var html_innerText = `<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title></title>
</head>

<body>
    <div class="page" id="app" v-cloak>
    </div>
    <script src="../src/${args[0]}.js"></script>
</body>

</html>`;

module.exports = html_innerText