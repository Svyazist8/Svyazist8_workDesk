import React, {useRef} from 'react'
import cn from 'classnames'
import styles from './leftPanel.module.scss'
import { desks } from '../data/info'

export const LeftPanel = ({setIdDesk}) => {
    const divRef = useRef(null);
    function mouse(){
        if(localStorage.getItem('curNote')!=='null'){
            divRef.current.style.left = '0'
        }else{
            divRef.current.style.left = '-270px'
        }
    }
    
    function locNull()
    {
        localStorage.setItem('curNote', null);
        localStorage.setItem('curTable', null);
        localStorage.setItem('curDesk', null);
    }
    function clickPanel()
    {
        
        if(divRef.current.style.left==='-270px')
        {
            divRef.current.style.left='0'
        }else{
            divRef.current.style.left='-270px'
        }
    }
    function drag(idDesk){
        if(localStorage.getItem('curNote')!=='null'){
            setIdDesk(idDesk)
        }
    }
  return (
    <div ref={divRef} onMouseUp={()=>locNull()} onClick={()=>clickPanel()} className={cn(styles.leftPanel, styles.boxDark)} onMouseOver={()=>mouse()}>
        <div onMouseOver={e => e.stopPropagation()} className={styles.container}>
            {
                desks.map((desk)=>{
                    if(desk.idDesk){
                        return(<div key={desk.idDesk} onMouseOver={()=>drag(desk.idDesk)} onClick={()=>setIdDesk(desk.idDesk)} className={cn(styles.desk,styles.boxDark)} >
                            {desk.name}
                        </div>)
                    }
                    return null
                })
            }
        </div>
        <div className={styles.r}>AllDesk</div>
    </div>
  )
}
