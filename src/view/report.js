import m from "mithril"
import {Recommendations} from "./recommendations"
import { indexOf, mean, sort, sortBy, prop, last, head, isEmpty } from "ramda"
const Model = {
    resultsByRow: [],
    process:(values)=>{
        Model.results = values
        const output = [1,2].map((part)=>{
           return Recommendations[part].map((rec, index)=>{
                //rec text
                //ranks by person
                const filteredByPart = values.filter((result)=>{return result.part===part})
                const ranks = filteredByPart.map((result)=>{
                    return {name: result.name, rank: indexOf(index.toString(), result.order)+1}
                })
                const sortedRanks = sortBy(prop("name"), ranks)
            
                //average rank
                const justRanks=ranks.map((rank)=>{return rank.rank})
                const sortedJustRanks=sort((a,b)=>{return a-b}, justRanks)
                const averageRank = mean(justRanks)
                const variance = last(sortedJustRanks)-head(sortedJustRanks)
                //variancy
                return {
                    rec: rec,
                    rank: sortedRanks,
                    mean: averageRank,
                    variance: variance
                }
            })
        })
        Model.resultsByRow = output
        m.redraw()
    },
    get: ()=>{ 
        m.request({
        method: "GET",
        url: "https://keith-rankings.builtwithdark.com/report",
        }).then((response)=>{
            console.log(response.values)
            Model.process(response.values)
        })
    }
}
const ReportView = {
    oninit: Model.get(), 
    view:(vnode)=>{
        console.log(Model.resultsByRow)
        return isEmpty(Model.resultsByRow) ? null :  m("div",[
            m(TableView, {ranks: Model.resultsByRow[0]}),
            m(TableView, {ranks: Model.resultsByRow[1]}),
 
         ])
    }
}

const TableView = {
    view:(vnode)=>{
        console.log(vnode.attrs.ranks)
        return m("table", {class:"f6 w-100 mw8 center mb5", cellspacing:0},[
            m(TableHeaderView),
            sortBy(prop("mean"),vnode.attrs.ranks).map((row)=>{
                return m(TableRowView, {row: row})
            })
        ])
    }
}
const TableHeaderView = {
    view:(vnode)=>{
        const headerClass = "fw6 bb b--black-20 tl pb3 pr3 bg-white"
        return m("thead",[
            m("tr",[
                m("th", {class:`${headerClass}`}, "Recommendation"),
                m("th", {class:`${headerClass} tc`}, "Average rank"),
                m("th", {class:`${headerClass} tc`}, "Variance"),
                m("th", {class:`${headerClass} tc`}, "Raw ranks")
            ])
        ])
    }
}
const TableRowView = {
    view:(vnode)=>{
        const bodyClass = "pv3 pr3 bb b--black-20"
        return m("tr",[
            m("td", {class:`${bodyClass} w-50`}, vnode.attrs.row.rec),
            m("td", {class:`${bodyClass} tc`}, vnode.attrs.row.mean),
            m("td", {class:`${bodyClass} tc`}, vnode.attrs.row.variance),
            vnode.attrs.row.rank.map((rawRank)=>{
                return m("td", {class:`${bodyClass} i tc mid-gray`}, rawRank.rank)
            })


        ])
    }
}
export {ReportView}