import React, { useState } from 'react'
import { notes, saveAll, tables } from '../data/info';
import { Note } from '../note/note'
import styles from './table.module.scss'
import imgMore from './../../media/edit.png'
import { CreateNote } from '../createNote/createNote';
import cn from 'classnames'
import { Inp } from '../inp/inp'
import { useDispatch, useSelector } from 'react-redux'
import { booleanMove } from '../../store/moveReducer';
import { refreshData } from '../../store/refreshReducer';
import { moveTable } from '../../store/moveTableReducer';


export const Table = ({item}) => {
    const [createNote, setCreateNote]=useState(false)
    let allNote = notes.filter(note => note.idTable === item.idTable && note.idDesk===item.idDesk);
    allNote = allNote.sort((a, b) => a.posId > b.posId ? 1 : -1);
    const [renameTable, setRenameTable]=useState(false)
    const [newName, setNewName]=useState('')
    
    const dispatch = useDispatch()
    const moveTableBool = useSelector(state => state.moveReducer.moveReducer)
    const moveIt = useSelector(state => state.moveTableReducer.moveTableReducer)
    // console.log(moveIt)
  function moveEnd(a)
  {
    console.log(111)
    if(localStorage.getItem('curNote')){
        allNote = notes.filter(note => note.idTable === item.idTable && note.idDesk===item.idDesk);
        allNote = allNote.sort((a, b) => a.posId > b.posId ? 1 : -1);
        var note = localStorage.getItem('curNote')
        var table = localStorage.getItem('curTable')
        var pos = allNote.length
        if(pos===0){
            pos=1
        }else{
            pos+=1
        }
        notes.forEach(element => {
        if(element.idTable === table && element.idNote === note){
            element.idTable=item.idTable;
            element.idDesk=item.idDesk;
            element.posId = pos
        }})
        localStorage.setItem('curNote', null);
        localStorage.setItem('curTable', null);
    }
    localStorage.setItem('moveTableIdTable', null)
    localStorage.setItem('moveTableIdDesk', null)
    dispatch(refreshData(1)) 
    saveAll()
  }
  const startMoveTable = () =>{
    localStorage.setItem('moveTableId', item.idTable);
    localStorage.setItem('moveTablePos', item.posId);
    dispatch(booleanMove(true))
    dispatch(moveTable(item))
  }
  function endMoveTable(a){
    console.log(1111)
    if(item.idTable!==localStorage.getItem('moveTableId')){
        var newPos = item.posId
        var oldPos = localStorage.getItem('moveTablePos')
        // console.log(a)
        if(a===1){
           if(newPos>oldPos){
                tables.forEach(table => {
                    if(table.posId <= newPos && table.posId > oldPos){
                        table.posId = Number(table.posId)-1
                    }
                    return null
                })
                
                tables.forEach(element => {
                    if(element.idTable === localStorage.getItem('moveTableId')){
                        element.posId = newPos
                        element.idDesk=item.idDesk
                    }
                })
                // console.log(tables)
           }else{
                tables.forEach(table => {
                    if(table.posId > newPos && table.posId < oldPos){
                    table.posId = Number(table.posId)+1
                    }
                })
                
                tables.forEach(element => {
                    if(element.idTable === localStorage.getItem('moveTableId')){
                        element.posId = newPos+1
                        element.idDesk=item.idDesk
                    }
                })
           }
        }else{
            
            if(newPos>oldPos){
                tables.forEach(table => {
                    if( table.posId < newPos && table.posId > oldPos){
                    table.posId = Number(table.posId)-1
                    }
                })
                
                tables.forEach(element => {
                    if(element.idTable === localStorage.getItem('moveTableId')){
                        element.posId = newPos-1
                        element.idDesk=item.idDesk
                    }
                })
            }else{
                tables.forEach(table => {
                    if(table.posId >= newPos && table.posId < oldPos){
                        table.posId = Number(table.posId)+1
                    }
                })
                
                tables.forEach(element => {
                    if(element.idTable === localStorage.getItem('moveTableId')){
                        element.posId = newPos
                        element.idDesk=item.idDesk
                    }
                })
            }
        }
        notes.forEach(note=>{
            if(note.idTable===localStorage.getItem('moveTableId')){
                note.idDesk=item.idDesk
            }
        })
    }
    saveAll()
    dispatch(refreshData(1))
    dispatch(booleanMove(false))
    dispatch(moveTable(null))
    
    localStorage.setItem('moveTableId', null);
    localStorage.setItem('moveTablePos', null);
  }
  function rename(){
      if(newName!=='')
      {
          tables.map(table => {
              if(table.idTable===item.idTable){
                  table.name=newName;
              }
              return null
          })

          setNewName('')
          saveAll()
      }
      setRenameTable(false)
  }
  return (
    <div style={moveIt!==null&& moveIt.idTable===item.idTable?{position: 'relative', opacity: '0.1'}:{position: 'relative',opacity: '1'}} className={cn(styles.table,styles.boxDark)} >
        <div className={styles.left} style={moveTableBool?{display: 'block'}:{display: 'none'}} onMouseUp={()=>endMoveTable(0)} ></div>
        <div className={styles.right} style={moveTableBool?{display: 'block'}:{display: 'none'}}  onMouseUp={()=>endMoveTable(1)} ></div>
        {renameTable?
            <div>
                <Inp placeholder={item.name} value={newName} setValue={setNewName}/>
                <div style={{display: 'flex', margin: '0 auto'}}>
                    <div  onClick={()=>rename()} style={{padding: '10px', width: '40%', textAlign: 'center', border: '1px solid whitesmoke', borderRadius: '15px'}}>Сохранить</div>
                    <div  onClick={()=>setRenameTable(false)} style={{padding: '10px', width: '40%', textAlign: 'center', border: '1px solid whitesmoke', borderRadius: '15px'}}>Отмена</div>
                </div>
            </div>
            :
            <div   className={styles.flex} onMouseUp={()=>moveEnd()} >
                <div className={styles.name} onMouseDown={()=>startMoveTable()} >{item.name} </div>
                <div className={styles.newNote} onClick={()=>setCreateNote(true)}>+</div>
                <div className={styles.more} onClick={()=>setRenameTable(true)}  >
                    <img width='80%' src={imgMore} alt='' />
                </div>
            </div>
        }
        <div onMouseDown={e => e.stopPropagation()}>
        {
            allNote.map(note=>{
                return(
                    <Note key={note.idNote} item={note}/>
                )
            })
        }
        </div>
        <CreateNote active={createNote} idDesk={item.idDesk} setActive={setCreateNote} idTable={item.idTable} />
    </div>
  )
}
