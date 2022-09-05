import React, { useState } from 'react'
import { BtnCreate } from '../btnCreate/btnCreate'
import { notes, saveAll } from '../data/info'
import { Inp } from '../inp/inp'
import styles from './newNote.module.scss'
import { v4 } from 'uuid'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { refreshData } from '../../store/refreshReducer'

export const CreateNote = ({active, setActive, idTable, idDesk}) => {
    const [value, setValue]=useState('')
    const [description, setDescription]=useState('')
    const dispatch = useDispatch()
    const createNote = () =>{
        var pos = 0
        notes.forEach(element => {
            if(element.idTable===idTable)
            {
                if(pos<element.posId){
                    pos=element.posId
                }
            }
        })
        pos=Number(pos)+1
        var id =v4()
        notes.push(
            {
                idNote: id,
                idTable: idTable,
                idDesk: idDesk,
                name: value,
                description: description,
                posId: pos,
            }
        )
        dispatch(refreshData(1))
        saveAll()
        setActive(false)
        setValue('')
    }
  if(active){return (
    <div className={styles.modal} onClick={()=>setActive(false)}>
        <div className={cn(styles.content,styles.boxDark)}  onClick={e => e.stopPropagation()}>
            <div className={styles.text}>Новая запись</div>
            <p>Название</p>
            <Inp value={value} setValue={setValue} onChange={(e)=>setValue(e.target.value)}/>
            <p>Описание</p>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>
            {value?<BtnCreate handle={createNote} text={"Создать"}/>:null}
        </div>
    </div>
  )}
}
