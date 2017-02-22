/*
sort function
original: https://gist.github.com/paulegan/b5f98fdc36b85e58618d
*/
function sort_all_and_remove_summary () {

    var engagement = function engagement(entry) {
      var e = entry.querySelector('[data-dot="engagement-count"]');
      if (e) {
        var t = e.innerText;
        var x = t[t.length - 1] === 'K' ? 1000 : 1;
        return parseInt(t) * x;
      } else {
        return 0;
      }
    };

    var entries = [];
    var firstContainer = null;
    for (var container of document.getElementsByClassName('list-entries')) {
      if (!firstContainer)
        firstContainer = container;
      [].push.apply(entries, container.getElementsByClassName('entry'));
    }
    if (firstContainer) {
      entries.sort(function (a, b) {return engagement(b) - engagement(a);});
      entries.forEach(function (i) {firstContainer.appendChild(i);});
  }

    /*
        remove summaries, they distract
    */
    var elements = document.querySelectorAll(".content > .summary");
    for(var i=0; i < elements.length; i++) {
        elements[i].setAttribute("style", "display:none;")
    }
}

/*
add button to action bar and floating action bar
*/
function wait_for_actionbar () {
    
    var actionBar = document.querySelector('.actions-and-details-container');
    var floatingBar = document.querySelector('#headerBarFX > header:nth-child(1) > div:nth-child(2)');

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
        sortImage.setAttribute("width", "40");
        sortImage.setAttribute("height", "40");
        sortImage.onclick = function() { sort_all_and_remove_summary(); };

        actionBar.appendChild(sortImage);
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
        sortImage.setAttribute("width", "40");
        sortImage.setAttribute("height", "40");
        sortImage.onclick = function() { sort_all_and_remove_summary(); };

        floatingBar.appendChild(sortImage);
    }
}

function wait_for_content () {
    var contentTable = document.getElementsByClassName('list-entries');
    if (contentTable.length < 1) {
        window.requestAnimationFrame(wait_for_content);
        return;
    }

    /*
        Auto Sort directly one time
    */
    sort_all_and_remove_summary();
}

wait_for_actionbar();
wait_for_content();
