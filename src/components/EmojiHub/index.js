import {UseState,useEffect, useState} from "react"
import EmojiCard from "../EmojiCard"
import {BsFilterLeft} from "react-icons/bs"
import { TailSpin } from 'react-loader-spinner'
import "./index.css"
const EmojiHub = () =>{
    const [data,setData] = useState()
    const [emojiCategory,setEmojiCategory] = useState("All")
    const [page,setPage] = useState(1)
    const category = ['All','smileys and people','animals and nature','food and drink','travel and places','activities','objects','symbols','flags']
    useEffect(()=>{
        fetch('https://emojihub.yurace.pro/api/all')
        .then(res=>res.json())
        .then(resData=>setData(resData))
    },[])
    const onCategoryChange = (event)=>{
        setEmojiCategory(event.target.value)
        setPage(1)
    }
    const getPagination = ()=>{
        const pageCount = Math.ceil(data.filter(eachItem=>{
            if(emojiCategory === "All"){
                return true
            }
            return eachItem.category === emojiCategory
        }).length / 10)
        const pages = new Array(pageCount).fill(0)
        return (
            <div className="page-numbers-wrappers">
                <p className="page-number" onClick={()=>{
                    if(page!==1){
                        setPage(page-1)}
                    }
                    
                }>&#60;</p>
                {pages.map((eachPage,index)=><span className={page-1 === index ? "page-number active-page-number" : "page-number"} onClick={()=>setPage(index+1)}>{index+1}</span>)}
                <p className="page-number" onClick={()=>{
                    if(page!==pageCount){
                        setPage(page+1)}
                    }
                    
                }>&#62;</p>
            </div>
        )
    }
    return (
        <div className="emoji-hub">
            <h1 className="title">Emoji Hub</h1>
            <hr/>
            <div className="emoji-display-container">
                <div className="filter-container">
                    <div className="filter-text-wrapper">
                        <p className="filter-text">Filter</p>
                        <BsFilterLeft className="filter-icon"/>
                    </div>
                    <select onChange={onCategoryChange} className="filter">
                        {category.map(eachItem=><option id={eachItem} value={eachItem}>{eachItem}</option>)}
                    </select>
                </div>
                <di className="big-container">
                    <ul className="emojis-wrapper">
                        {data ? data.filter((eachItem,index)=>{
                            if(emojiCategory === "All"){
                                return true
                            }
                            else{
                                return eachItem.category === emojiCategory
                            }
                            })
                            .filter((eachItem,index)=>{
                                if(index >= ((page-1)*10) && index < (page*10)){
                                    return true
                                }
                                return false
                            })
                            .map((eachEmoji,index)=><li key={index}><EmojiCard details = {eachEmoji}/></li>) : 
                            <TailSpin
                            height="80"
                            width="80"
                            color="#0a7fc3"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                        }
                    </ul>
                    <div>
                        {data && getPagination()}
                    </div>
                </di>
            </div>
            
        </div>
    )
}

export default EmojiHub