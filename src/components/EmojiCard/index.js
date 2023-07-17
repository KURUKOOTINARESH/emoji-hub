import "./index.css"

const EmojiCard = (props)=>{
    const {details} = props
    const {name,category,group,htmlCode} = details
    return(
        <div className="emoji-card">
        <ul className="emoji-img-container">
            {htmlCode && htmlCode.map((eachHtmlCode,index)=>
                <li key={index}>
                    <p
                    dangerouslySetInnerHTML={{ __html: eachHtmlCode }}
                    className="emoji"
                    >
                    </p>
                </li>)
            }
        </ul>
    
        <p className="emoji-name">{name}</p>
        <div className="emoji-details-container">
            <p className="emoji-details">Category : <span>{category}</span></p>
            <p className="emoji-details">Group : <span>{group}</span></p>
        </div>
        
        </div>
    )
}
export default EmojiCard