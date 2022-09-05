import React, {useRef, useState } from 'react'
import styles from './desk.module.scss'
import {desks, saveAll, notes, tables} from './../data/info'
import { Table } from '../table/table'
import cn from 'classnames'
import { Inp } from '../inp/inp'
import { BtnCreate } from '../btnCreate/btnCreate'
import { Dump } from '../dump/dump'
import { DeskInfo } from '../deskInfo/deskInfo'
import { BigNote } from '../bigNote/bigNote'
import { useDispatch, useSelector } from 'react-redux'
import { refreshData } from '../../store/refreshReducer'
import { moveNote } from '../../store/moveNoteReducer'
import { AllDesks } from '../allDesks/allDesks'
import { booleanMove } from '../../store/moveReducer';
import { moveTable } from '../../store/moveTableReducer';
import { TableMini } from '../tableMini/tableMini'

export const Desk = ({idDesk, setIdDesk}) => {
    
    const moveRefNote = useRef(null)
    const moveRefTable = useRef(null)
    let allTable =  tables.filter(table => table.idDesk === idDesk).sort((a, b) => a.posId > b.posId ? 1 : -1);;
    let deskInfo = desks.find(item => item.idDesk === idDesk);
    
    const [renameDesk, setRenameDesk]= useState(false)
    const [newName, setNewName]=useState('')

    const dispatch = useDispatch()
    const moveNoteId = useSelector(state => state.moveNoteReducer.moveNoteReducer)
    const moveTableId = useSelector(state => state.moveTableReducer.moveTableReducer)
    const moveTableBool = useSelector(state => state.moveReducer.moveReducer)
    function locNull()
    {
        var checkTableInDesk = tables.filter(table=>{
            if(table.idDesk===idDesk){
                return table
            }else{
                return null
            }
        })
        if(checkTableInDesk.length===0){
            tables.forEach(table => {
                if(table.idTable ===localStorage.getItem('moveTableId')){
                    table.idDesk=idDesk
                }
            })
            notes.forEach(note => {
                if(note.idTable ===localStorage.getItem('moveTableId')){
                    note.idDesk=idDesk
                }
            })
            saveAll()
        }
        localStorage.setItem('curNote', null);
        localStorage.setItem('curTable', null);
        localStorage.setItem('curDesk', null);
        localStorage.setItem('moveTableId', null);
        dispatch(moveNote(null))
        dispatch(moveTable(null))
        dispatch(refreshData(1))
        dispatch(booleanMove(false))
    }
    function move(e){
        if(localStorage.getItem('curNote')!=='null')
        {
            moveRefNote.current.style.display = 'block'
            moveRefNote.current.style.top = Number(e.clientY)+'px'
            moveRefNote.current.style.left = Number(e.clientX)+'px'
        }else{
            if(localStorage.getItem('moveTableId')!=='null'){
                moveRefTable.current.style.display = 'block'
                moveRefTable.current.style.top = Number(e.clientY+15)+'px'
                moveRefTable.current.style.left = Number(e.clientX+15)+'px'
                moveRefTable.current.style.height = '150px'
            }else{
                moveRefNote.current.style.display = 'none'
                moveRefTable.current.style.display = 'none'
            }
        }
    }
    function rename(){
        if(newName!=='')
        {
            desks.map(desk => {
                if(desk.idDesk===idDesk){
                    desk.name=newName;
                }
                return null
            })
            setNewName('')
            saveAll()
        }
        dispatch(refreshData(1))
        setRenameDesk(false)
    }
    if(idDesk){
        return (
            <div className={styles.desk} onMouseUp={()=>locNull()} onMouseMove={(e)=>move(e)}>
            {/* <LeftPanel setIdDesk={setIdDesk}/> */}
            <AllDesks idDesk={idDesk} setIdDesk={setIdDesk}/>
            <div ref={moveRefNote} className={cn(styles.move,styles.boxDark)}>{moveNoteId?moveNoteId.name:null}</div>
            <div ref={moveRefTable} style={{position: 'fixed', zIndex: '100'}}>
                {moveTableBool?<TableMini name={moveTableId.name} idTable={moveTableId.idTable}/>:null}
            </div>
                {renameDesk? 
                <div>
                    <Inp placeholder={deskInfo.name} value={newName} setValue={setNewName}/>
                    <div style={{display: 'flex', width: '500px', margin: '0 auto'}}>
                        <BtnCreate text={'Сохранить'} handle={()=>rename()}/>
                        <BtnCreate text={'Отмена'} handle={()=>setRenameDesk(false)}/>
                    </div>
                </div>
                : 
                <div onDoubleClick={()=>setRenameDesk(true)} className={styles.nameDesk}>{deskInfo.name} </div> 
                }
                <DeskInfo idDesk={idDesk} setIdDesk={setIdDesk} />
                <div className={styles.table}>
                    {
                        allTable.map(table =>{
                            return(
                                <Table key={table.idTable} item={table}/>
                            )
                        })
                    }
                </div>
                <Dump />
                <BigNote/>
            </div>
        )   
    }
}
