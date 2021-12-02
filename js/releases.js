octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'behemehal',
    repo: 'ellie-language'
}).then((e) => {
    document.querySelector('.loader').style.display = 'none';
    for (let i = 0; i < e.data.length; i++) {
        var div = document.createElement('div');
        div.style.padding = '3rem';

        var header = document.createElement('a');
        header.href = e.data[i].html_url;
        header.style["font-size"] = "2rem";
        header.innerHTML = e.data[i].name;
        div.appendChild(header);
        div.innerHTML += marked.parse(e.data[i].body);
        document.querySelector('.releases').appendChild(div);

        var row_parent = document.createElement('div');
        row_parent.className = 'rowParent';

        var row = document.createElement('row');
        row.className = 'row dark-section section';
        var bre = document.createElement('br');
        for (let j = 0; j < e.data[i].assets.length; j++) {
            var dw = document.createElement('div');
            dw.className = 'col';
            dw.style["text-align"] = 'center';

            var br = document.createElement('br');

            var span = document.createElement('span');
            span.className = 'material-icons';
            span.innerHTML = 'description';
            span.style["font-size"] = '45px';

            dw.appendChild(span);
            dw.appendChild(br);

            var a = document.createElement('a');

            a.href = e.data[i].assets[j].browser_download_url;
            a.style.color = 'white !important';
            a.innerHTML = e.data[i].assets[j].name;
            dw.appendChild(a);

            row.appendChild(dw);
        }

        row_parent.appendChild(row);
        document.querySelector('.releases').appendChild(row_parent);
        document.querySelector('.releases').appendChild(bre);
    }

    document.querySelector('.releases').style.display = 'block';
});