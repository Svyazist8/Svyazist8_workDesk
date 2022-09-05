import React, { useState } from 'react'
import styles from './createDesk.module.scss'
import { desks, saveAll} from './../data/info'
import { v4 } from 'uuid'
import cn from 'classnames'
import {BtnCreate}  from './../btnCreate/btnCreate'
import { useDispatch } from 'react-redux'
import { refreshData } from '../../store/refreshReducer'

export default function CreateDesk({active, setActive, setIdDesk}) {
    const [nameDesk, setNameDesk] = useState('')
    const dispatch = useDispatch()
    function create(){
        var id = v4();
        desks.push(
            {
                idDesk: id,
                name: nameDesk,
            }
        )
        dispatch(refreshData(1))
        setNameDesk('')
        saveAll()
        setActive(false)
    }
  if(active){return (
    <div className={cn(styles.create, styles.boxDarkHover)} onClick={()=>setActive(false)}>
        <div className={cn(styles.block, styles.boxDark)} onClick={e => e.stopPropagation()}>
            <div className={styles.flex} ><h1>Новая доска</h1></div>
            <div className={styles.flex} ><input placeholder='Название доски' value={nameDesk} onChange={(e)=>setNameDesk(e.target.value)} /></div>
            {nameDesk!==''?<BtnCreate 
                // className={styles.btn} 
                text={'Создать'}
                handle={()=>create()}
            >
            </BtnCreate>:null}
                
        </div>
    </div>
  )}
}

