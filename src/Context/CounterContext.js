import { createContext, useState } from "react";


export let counterContext=createContext()


export function CounterContextProvider(props){
       
    let [counter, setcounter] = useState(0)
           function increaseCounter(){
                setcounter(counter+1)
           }
           function decreaseCounter(){
                setcounter(counter-1)
           }
         
        return     <counterContext.Provider value={{counter,increaseCounter,decreaseCounter}}>
                        {props.children}
        </counterContext.Provider>
}