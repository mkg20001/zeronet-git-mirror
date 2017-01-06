var users=new Vue({
  el:"#page-users",
  data:{
    users:[
      {name:"mkg20001",repos:41,avatar:"https://mkg20001.github.io/images/logo.png",id:"mkg20001@hubid"}
    ]
  },
  methods:{
    redirect:function(u) {
      return 'pagejs.redirect("User/'+u+'")'
    }
  }
})
var _404=new Vue({
  el:"#page-404",
  data:{url:"some-url"}
})
var navbar=new Vue({
  el:"#navbar",
  data:{
    signed_in:false,
    user:"user@provider.bit",
    space:{
      used:0,
      available:100
    }
  },
  computed:{
    used_space:function() {
      return this.space.used+"kb" // TODO: byte conversion
    },
    available_space:function() {
      return this.space.available+"kb" // TODO: byte conversion
    }
  }
})
