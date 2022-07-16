module.exports = {
    HTML:function(title, list, body, control){
        return `
        <!doctype tml>
        <html>
        <head>
            <title>ADDRESS BOOK</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">HOME</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        <html>
        `;
    }, list:function(filelist){
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
            i += 1;
        }
        list += '</ul>';
        return list;
    }
}