import m from "mithril"

import Layout from "../src/view/layout"
import {MainView} from "./view/view"
import {ReportView} from "./view/report"

     m.route(document.body, "/",{
   
       
        "/":{
            view: ()=>{
                return m(Layout, {title: "",
                step: null,
                nextLink: null,
                nextCopy: null,
                prevLink: null,
                prevCopy: null }, [
                    m(MainView, {section:"1"})
                ])
            }
        }, 
        "/part2":{
           view: ()=>{
                return m(Layout, {title: "",
                step: null,
                nextLink: null,
                nextCopy: null,
                prevLink: null,
                prevCopy: null }, [
                    m(MainView, {section:"2"})
                ])
            }
        }, 
        "/results":{
            view: ()=>{
                return m(Layout, {title: "",
                step: null,
                nextLink: null,
                nextCopy: null,
                prevLink: null,
                prevCopy: null }, [
                    m(ReportView)
                ])
            }
        }, 
    })

   