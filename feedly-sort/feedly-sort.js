/*
sort function
original: https://gist.github.com/paulegan/b5f98fdc36b85e58618d
*/
function sort_all () {
    var engagement = function (entry) {return parseInt(entry.querySelector('[data-engagement]').dataset.engagement);},
        entries = [],
        section = 0,
        firstContainer,
        container;
    while (true) {
        container = document.getElementById('section' + section + '_column0');
        if (!container)
            break;
        if (!firstContainer)
            firstContainer = container;
        [].push.apply(entries, container.children);
        section++;
    }
    if (firstContainer) {
        entries.sort(function (a, b) {return engagement(b) - engagement(a);});
        entries.forEach(function (i) {firstContainer.appendChild(i);});
    }
}

/*
add button to action bar and floating action bar
*/
function wait_for_actionbar () {
    
    var actionBar = document.querySelector('#feedlyPageHeader > div[class="pageActionBar"]');
    var floatingBar = document.querySelector('#floatingPageActionBar');

    if (!actionBar || !floatingBar) {
        window.requestAnimationFrame(wait_for_actionbar);
        return
    }
    
    {   /* actionbar button */
        var sortImage = document.createElement("img");
        sortImage.src = chrome.extension.getURL("icons/sort-icon-48px.png");
        sortImage.title = "sort by popularity";
        sortImage.id = "pageActionSort";
        sortImage.setAttribute("data-page-action", "sort");
        sortImage.setAttribute("class", "pageAction requiresLogin");
        sortImage.setAttribute("style", "display: inline");
        sortImage.setAttribute("border", "0");
        sortImage.setAttribute("width", "24");
        sortImage.setAttribute("height", "24");
        sortImage.onclick = function() { sort_all(); };

        actionBar.insertBefore(sortImage, actionBar.firstChild);
    }
    {   /* floating action bar button */
        var sortImage = document.createElement("img");
        sortImage.src = chrome.extension.getURL("icons/sort-icon-48px.png");
        sortImage.title = "sort by popularity";
        sortImage.id = "floatingPageActionSort";
        sortImage.setAttribute("data-page-action", "sort");
        sortImage.setAttribute("class", "pageAction requiresLogin");
        sortImage.setAttribute("style", "display: inline");
        sortImage.setAttribute("border", "0");
        sortImage.setAttribute("width", "18");
        sortImage.setAttribute("height", "18");
        sortImage.onclick = function() { sort_all(); };

        floatingBar.insertBefore(sortImage, floatingBar.firstChild);
    }
}

function wait_for_content () {
    var contentTable = document.getElementById('section0_column0');

    if (!contentTable) {
        window.requestAnimationFrame(wait_for_content);
        return
    }

    /*
        Auto Sort directly one time
    */
    sort_all();

    /*
        remove summaries, they distract
    */
    var elements = document.querySelectorAll("span[class=u0Summary]");
    for(var i=0; i < elements.length; i++) {
        elements[i].setAttribute("style", "display:none;")
    }
}

wait_for_actionbar();
wait_for_content();
