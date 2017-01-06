//Init page js
page.base(window.location.pathname)

pagejs=page

//GitMirror main class
class GitMirror extends ZeroFrame {
    onOpenWebsocket () {
        this.cmd("siteInfo", {}, (site_info) => {
            if (site_info.cert_user_id)
                document.getElementById("select_user").innerText = site_info.cert_user_id
            this.site_info = site_info
            console.log(site_info)
        })
        /* register event handlers */
        help.replaceState((a,b,c) => {
          this.log("repl",a,b,c)
          this.cmd("wrapperReplaceState",[a,b,c])
        })
        help.pushState((a,b,c) => {
          this.log("push",a,b,c)
          this.cmd("wrapperPushState",[a,b,c])
        })
        /* redirects */
        pagejs("Users/:user",(p) => {
          pagejs.redirect("User/"+p.params.user)
        })
        pagejs("Repos/:user",(p) => {
          pagejs.redirect("User/"+p.params.user)
        })
        pagejs("Repos/:user/:repo",(p) => {
          pagejs.redirect("Repo/"+p.params.user+"/"+p.params.repo)
        })
        pagejs("Hubs/:hub",(p) => {
          pagejs.redirect("Hub/"+p.params.hub)
        })
        /* add routes */
        pagejs("Users",() => {
          switchPage("users")
        })
        pagejs("Repos",() => {
          switchPage("repos")
        })
        pagejs("Hubs",() => {
          switchPage("hubs")
        })
        pagejs("Hub/:hub",() => {
          var hub=p.params.hub // TODO: do something with it
          switchPage("hub")
        })
        pagejs("User",(p) => {
          var user=p.params.user // TODO: do something with it
          switchPage("user")
        })
        pagejs("Repo/:user/:repo",(p) => {
          var user=p.params.user // TODO: do something with it
          var repo=p.params.repo // TODO: do something with it
          switchPage("repo")
        })
        pagejs("",() => {
          switchPage("home")
        })
        pagejs("*",() => {
          switchPage("404")
        })
        /* and run */
        pagejs()

        this.log("READY")
    }

    onRequest (cmd, message) {
        if (cmd == "setSiteInfo") {
            if (message.params.cert_user_id)
                document.getElementById("select_user").innerHTML = message.params.cert_user_id
            else
                document.getElementById("select_user").innerHTML = "Select user"
            this.site_info = message.params  // Save site info data to allow access it later
        }
    }

    selectUser () {
        this.cmd("certSelect", {accepted_domains: ["zeroid.bit"]})
        return false
    }
}

page = new GitMirror()
