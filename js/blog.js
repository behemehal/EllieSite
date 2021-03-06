var targeted = new URLSearchParams(location.search).get("page");
if (targeted == null) {
    fetch(new Request('https://raw.githubusercontent.com/behemehal/EllieBlog/main/blog.json'), {
            method: 'GET',
            cache: "no-cache"
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#rm').style.display = 'block';
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

    fetch(new Request('https://raw.githubusercontent.com/behemehal/EllieBlog/main/blogs/' + targeted), {
            method: 'GET',
            cache: "no-cache"
        })
        .then(response => response.text())
        .then(data => {
            if (data == "404: Not Found") {
                location = "/404.html";
            } else {
                var lineEnding = whichLineEnding(data);
                var lines = data.split(lineEnding);
                var conf = lines.slice(1, 7);
                var md = lines.slice(8);
                var parsedConf = convertToObject(conf.map(x => parseKeyValue(x)));

                /*
                    date: "4.12.2021-00.56"
                    description: "After 29 days build is finally complete"
                    publisher: "@ahmtcn123"
                    title: "Tokenizer build is complete"
                    updated_at: "false"
                    updated_by: "false"
                */

                document.querySelector("[name=description]").content = parsedConf.description;
                document.querySelector("[property=\"og:description\"]").content = parsedConf.description;
                document.querySelector("[property=\"twitter:description\"]").content = parsedConf.description;

                document.querySelector("[name=title]").content = "EllieBlog | " + parsedConf.title;
                document.querySelector("[property=\"og:title\"]").content = "EllieBlog | " + parsedConf.title;
                document.querySelector("[property=\"twitter:title\"]").content = "EllieBlog | " + parsedConf.title;
                document.title = "EllieBlog | " + parsedConf.title;
                document.querySelector("[name=author]").content = parsedConf.publisher;
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
                script.setAttribute("data-term", parsedConf.title);
                script.setAttribute("data-reactions-enabled", "1");
                script.setAttribute("data-emit-metadata", "0");
                script.setAttribute("data-theme", "https://www.ellie-lang.org/css/gis_theme.css");
                script.setAttribute("data-lang", "en");
                script.setAttribute("crossorigin", "anonymous");

                var owner = document.createElement("div");
                owner.style = "text-align: right;";
                owner.innerHTML = `<a style="text-align: right;" href="https://github.com/${parsedConf.publisher.toString().replace("@", "")}">Created by ${parsedConf.publisher}</a>
                <p style="text-align: right;">Created at ${moment(parsedConf.date, "MM.DD.YYYY HH:mm").format("MM.DD.YYYY HH:mm")}</p>`;

                console.log(parsedConf)
                if (conf.updated_by) {
                    owner.innerHTML = `<br><a style="text-align: right;" href="https://github.com/${parsedConf.updated_by.toString().replace("@", "")}">Updated by: ${parsedConf.updated_by}</a>
                    <p style="text-align: right;">Created at ${moment(parsedConf.updated_at, "MM.DD.YYYY HH:mm").format("MM.DD.YYYY HH:mm")}</p>`;
                }

                var div = document.createElement('div');
                div.style.padding = "3rem";
                div.innerHTML += marked.parse(md.join(lineEnding));
                var gis = document.createElement('div');
                gis.className = "giscus";
                div.appendChild(owner);
                div.appendChild(gis)
                document.body.appendChild(script);
                document.querySelector('.blogs').appendChild(div)
                document.querySelector('.loader').style.display = 'none';
                document.querySelector('.blogs').style.display = 'block';
            }
        }).catch(function (err) {
            location = "/404.html";
        });
}