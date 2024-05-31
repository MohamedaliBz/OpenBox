import './title.css'
import minBox from '../../Assets/images/box.png'



export default function Title({title,subTitle }:{
    title:string;
    subTitle:string
}
){
    return(
        <div className='headForm'>
            <img src={minBox} className='minBox' alt='title'/>
            <h2 className='title'>{title}</h2>
            <p className='p' >{subTitle}</p>
        </div>
    )
}