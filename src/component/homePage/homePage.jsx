import React, { useState } from 'react'
import styles from './homePage.module.scss'
import CreateDesk from '../createDesk/createDesk'
import { Desk } from '../desk/desk'
import { desks, localData } from '../data/info'
import cn from 'classnames'
import { BtnCreate } from '../btnCreate/btnCreate'
import { useSelector } from 'react-redux/es/exports'
import { Info } from '../info/info'



export const HomePage = () => {
    const [createDesk, setCreateDesk] = useState(false)
    const [idDesk, setIdDesk] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)
    localData()
    const a = useSelector(state => state.refreshReducer.refreshReducer)
  return (
    <div className={styles.home}>
        <div className={styles.desks} >
          {
            desks.map(function(desk){
              if(desk.idDesk){
                return(<div key={desk.idDesk} className={cn(styles.desk,styles.boxDark)} onClick={()=>setIdDesk(desk.idDesk)}>
                  {desk.name}
                </div>)
              }
              return null
            })
          }
          
        </div>
        <BtnCreate className={styles.btn} text={'Создать доску'} handle={()=>setCreateDesk(true)}/>
        <CreateDesk active={createDesk} setActive={setCreateDesk} setIdDesk={setIdDesk}/>
        <Desk idDesk={idDesk} setIdDesk={setIdDesk} />
        <div 
        className={cn(styles.infoBtn,styles.boxDark)}
        onClick={()=>setInfoOpen(true)}
        >Какие функции есть у этого сайта?</div>
        <Info active={infoOpen} setActive={setInfoOpen}/>
    </div>
  )
}