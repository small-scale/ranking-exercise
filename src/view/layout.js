import m from "mithril"
//import { Menu, MenuItems } from "./menu"


const Layout = {
    
    view: (vnode)=>{
      const path = (m.route.get()==="") || (m.route.get()==="/report") || (m.route.get()==="/results") 
        return [
            m("nav", {"class":"dt w-100  border-box center pa3 pb3-ns pb0 ph5-l"},
              [
                m("a", {"class":"dtc v-mid mid-gray  tl mb1","href":"#","title":"Home"},
                  [
                    m("img", {"class":"dib h3","src":"static/longpink.png","alt":"small scale"}),

                  ]
                ),
              m("a", {"class":"pointer dtc v-mid silver z-99 link hover-black tr mb2 mb0-l","id":"menuburger","onclick":()=>{Menu.showMenu=true},"title":"Menu"}, 
                  m("span", {class:"spartan f3-ns f4 ttu"}, "Menu"),
                  
              )
              ]
            ), 
            m("article", {"class":"pa3 pa5-ns pt3-ns pt0 mw10 center spvar fw4 near-black vh-100"},
              [
      
                m("h1", {"class":"mt6-ns mt5 mb0 f2 spartan f-subheadline-ns fw7", "style":`color:${vnode.attrs.color || "black"}`},
                  vnode.attrs.title
                ),
                m("section", {"class":"f4-ns f5 lh-copy"}, 
                 vnode.children
                ),

              ]
            ), 

           
    //        m(Menu, {items: MenuItems["loggedin"]})
          ]
    }
}

export default Layout