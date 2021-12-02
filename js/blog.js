var targeted = new URLSearchParams(location.search).get("page");

if (targeted == null) {
    fetch('https://raw.githubusercontent.com/behemehal/EllieBlog/main/blog.json')
        .then(response => response.json())
        .then(data => {
            let light = false;
            for (var i = 0; i < data.length; i++) {
                var post = data[i];

                var div = document.createElement("div");
                div.className = "col";

                div.id = post.id;
                div.className = light ? "dark-section section" : "light-section section";

                var row = document.createElement("div");
                row.className = "row"

                var container = document.createElement("div");
                container.className = "container";

                var title = document.createElement("div");
                title.className = "col";

                var h3 = document.createElement("a");
                h3.href = "?page=" + post.file_name;
                h3.style["font-size"] = "1.7em";
                h3.innerHTML = post.title;
                var h6 = document.createElement("h6");
                h6.innerHTML = post.description;
                title.appendChild(h3);
                title.appendChild(h6);
                light = !light;


                var details = document.createElement("div");
                details.style["text-align"] = "right";
                details.className = "col";

                var pub = document.createElement("a");
                pub.href = "https://github.com/" + post.publisher.replace("@", "");
                pub.innerHTML = post.publisher;

                var date = document.createElement("p");
                date.innerHTML = moment(post.date).format("MM.DD.YYYY HH:mm");

                details.appendChild(pub);
                details.appendChild(date);


                row.appendChild(title);
                row.appendChild(details);
                container.appendChild(row)
                div.appendChild(container);
                document.querySelector('.blogs').appendChild(div);
            }
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.blogs').style.display = 'block';
        });
} else {

    //Parse key and value seperated by ':'
    function parseKeyValue(str) {
        var arr = str.toString().split(':');
        return {
            key: arr[0].trim(),
            value: arr[1].trim()
        };
    }

    //Convert object array which has key and value to object (This comment exist because co-pilot)
    function convertToObject(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i].key] = arr[i].value;
        }
        return obj;
    }

    function whichLineEnding(source) {
        var temp = source.indexOf('\n');
        if (source[temp - 1] === '\r')
            return '\r\n'
        return "\n"
    }

    fetch('https://raw.githubusercontent.com/behemehal/EllieBlog/main/blogs/' + targeted)
        .then(response => response.text())
        .then(data => {
            var lineEnding = whichLineEnding(data);
            var lines = data.split(lineEnding);
            var conf = lines.slice(1, 7);
            var md = lines.slice(8);
            var parsedConf = convertToObject(conf.map(x => parseKeyValue(x)));

            console.log(parsedConf)

            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (code, lang) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, {
                        language
                    }).value;
                },
                langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
                pedantic: false,
                gfm: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            });

            var script = document.createElement("script");
            script.setAttribute("src", 'https://giscus.app/client.js');
            script.setAttribute("data-repo", "behemehal/ellieblog");
            script.setAttribute("data-repo-id", "R_kgDOGdv8Ow");
            script.setAttribute("data-category", "Comments");
            script.setAttribute("data-category-id", "DIC_kwDOGdv8O84CAHDn");
            script.setAttribute("data-mapping", "specific");
            script.setAttribute("data-term", "change_this");
            script.setAttribute("data-reactions-enabled", "1");
            script.setAttribute("data-emit-metadata", "0");
            script.setAttribute("data-theme", "https://ellie.behemehal.net/css/gis_theme.css");
            script.setAttribute("data-lang", "en");
            script.setAttribute("crossorigin", "anonymous");

            var div = document.createElement('div');
            div.style.padding = "3rem";
            div.innerHTML += marked.parse(md.join(lineEnding));
            var gis = document.createElement('div');
            gis.className = "giscus";
            div.appendChild(gis)
            document.body.appendChild(script);
            document.querySelector('.blogs').appendChild(div)
            document.querySelector('#rm').style.display = 'none';
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.blogs').style.display = 'block';


        })
}