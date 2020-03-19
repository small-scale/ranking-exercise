import m from "mithril"

import Layout from "../src/view/layout"
import {MainView} from "./view/view"


     m.route(document.body, "/",{
   
       
        "/":{
            onmatch: ()=>{
                window.scrollTo(0,0);
            },
            render: ()=>{
                return m(Layout, {title: "",
                step: null,
                nextLink: null,
                nextCopy: null,
                prevLink: null,
                prevCopy: null }, [
                    m(MainView, {section:"Part1"})
                ])
            }
        }, 
    })
     
   