import m from "mithril"
import Sortable from 'sortablejs';
import {Recommendations} from './recommendations'
//main container
const Model = {
    finalList:{},
    originalList:{},
    finalOrder:[],
    flashColor:"",
    flash:"",
    name:"",
    submit: (order)=>{
        Model.flashColor = "blue"
        Model.flash="Submitting..."
        m.request({
            method: "POST",
            url: "https://keith-rankings.builtwithdark.com/submitrank",
           // params: {id: 1},
            body: {
                name: Model.name,
                order: Model.finalOrder,
                part: 1
            }

        }).then((response)=>{
           // if(response.status==200){
                Model.flashColor="dark-green"
                Model.flash="Successfully submitted"
           // }
        })
    }
}

const MainView = {
    view: (vnode)=>{
       return  m("div",[
        m("p", {class:`f6 fw7 ${Model.flashColor}`}, Model.flash),
        m("p", `Rank these recommendations in order of importance. (Sorry, no ties allowed.) To rank them, drag recommendations from the "Report" section into the "My ranking" section. When you're done, hit "Submit".` ),
        m(submitButton),
       m("div",{class:"flex flex-wrap"},[
           m("div",{
               class:"w-100 w-50-l mh0"
           }, [
            m("p", {class:"tl pl2 f3 f2-m f1-l  fw7"},"My ranking"),
            m(finalRankingView, {section: vnode.attrs.section})
           ]),

           m("div",{
            class:"w-100 w-50-l mh0"
        }, [
         m("p", {class:"tl pl4 f3 f2-m f1-l  fw7"},"Report recommendations"),
         m(listView, {section: vnode.attrs.section})

        ]),
        ])
    ])
    }
}

//ranked list (submit view)

const finalRankingView = {
    oncreate:(vnode)=>{
        Model.finalList = Sortable.create(vnode.dom, {
            group:vnode.attrs.section,
            animation: 150,
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? order.split('|') : [];
                },
        
                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    Model.finalOrder = order;
                    localStorage.setItem(sortable.options.group.name, order.join('|'));
                    console.log(order)
                }
            },
            onEnd:(evt)=>{
                Model.flash=""
               // Model.finalList.save()
            }
        })
    },
    view:(vnode)=>{
        return m("div", {class:"w-100 pa3 br3 flex flex-wrap bg-gray", style:"background-color:hsl(233,55%,16%)"}, [
           
        ])
    }
}
const listView = {
    oncreate:(vnode)=>{
        Model.originaList = Sortable.create(vnode.dom, {group:vnode.attrs.section, animation: 150, sort:false})
    },
    view:(vnode)=>{
        return m("div", {class: "flex flex-wrap br3 pa3 mh1 mh4-l", style:"background-color:hsl(27,100%,70%)"}, [
            Recommendations.map((item, index)=>{
                return m(itemView, {rec: item, key: index, index: index})
            })
        ])
    }
}


const itemView = {
    view: (vnode)=>{
        return m("div", {class:"part1-item ba w-100 b--silver mh1 black f5-ns f6 fw5 ph3 pv2 br0", "data-id":vnode.attrs.index}, vnode.attrs.rec)
    }
}

const submitButton = {
    view:(vnode)=>{
        return m("div",{},[
            m("input", {oninput:(e)=>{Model.name=e.target.value; Model.flash=""}, value:Model.name, class:"ml1 mr3 input-reset bn pa3 Inter fw7 br2 bg-lightest-blue", type:"text", placeholder:"Name"}),
            m("a", {class:"br2 bg-lightest-blue hover-bg-light-red pa3 black fw7 pointer Inter",onclick: ()=>{
                if(Model.finalOrder.length === Recommendations.length){
                    if(Model.name != ""){
                        Model.submit(Model.finalOrder)
                    }
                    else{
                        Model.flashColor = "dark-red"
                        Model.flash="Please enter your name before submitting."
                    }
                
                }else{
                    Model.flashColor = "dark-red"
                    Model.flash="Please rank all recommendations before submitting."

                }
               
            }}, "Submit")
        ])
    }
}

export {MainView}