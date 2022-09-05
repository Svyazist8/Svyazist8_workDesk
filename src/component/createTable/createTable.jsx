import React, { useState } from 'react'
import { v4 } from 'uuid'
import {  saveAll, tables } from '../data/info'
import { Inp } from '../inp/inp'
import styles from './createTable.module.scss'
import cn from 'classnames'
import {BtnCreate} from './../btnCreate/btnCreate'
import { useDispatch } from 'react-redux'
import { refreshData } from '../../store/refreshReducer'

export const CreateTable = ({active, setActive, idDesk}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    function create(){
        var id = v4()
        var pos = 0
        // pos = pos.length
        tables.forEach(element => {
            if(element.idDesk===idDesk)
            {
                if(pos<element.posId){
                    pos=element.posId
                }
            }
        })
        pos=Number(pos)+1
        tables.push(
            {
                idTable: id,
                idDesk: idDesk,
                name: value,
                posId: pos
            }
        )
        setValue('')
        dispatch(refreshData(1))
        setActive(false)
        saveAll()
    }
    if(active){
        return (
            <div className={cn(styles.createTable, styles.boxDarkHover)} onClick={()=>setActive(false)}>
                <div className={cn(styles.content, styles.boxDark)} onClick={e => e.stopPropagation()}>
                    <div>Введите название новой таблицы</div>
                    <div>
                        <Inp value={value} setValue={setValue}  />    
                    </div>
                    {value!==''? <BtnCreate text={'Создать'}  handle={()=>create()}/>:null}
                </div>
            </div>
        )
    }
}
