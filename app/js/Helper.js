help = {
  que:{},
  getQPath:() => {
    return help.getNPath(window.location.pathname+window.location.search)
  },
  getNPath:(path) => {
    if (!path.startsWith("/")&&!path.startsWith("?")) return path;
    if (path.indexOf("?")==-1) return ""
    return path.split("?")[1].split("&").filter((i) => {
      return i.indexOf("=")==-1
    }).join("")
  }
}

/* until the ZeroFrame is ready this will queue the functions */
function que(name) {
  help.que[name]=[]
  help[name]=function(a) {
    if (typeof a == "function") {
      help[name]=a.bind(a);
      help.que[name].map((b) => {
        a.apply(a,b)
      })
      delete help.que[name]
      return; //we are done
    }
    help.que[name].push([].slice.call(arguments,0))
  }
}
["replaceState","pushState","log","notify","cmd"].map(i => {que(i)})

/* switch to a page */
function switchPage(p) {
  $(".page").hide()
  $("#page-"+p).fadeIn("fast")
}

/* hide all pages until everything has loaded */
$(".page").hide()
/* except the loading page */
$("#page-loading").show()
