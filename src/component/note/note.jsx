import React, {useRef} from 'react'
import styles from './note.module.scss'
import imgMore from './../../media/more.png'
import cn from 'classnames'
import { notes, saveAll } from '../data/info'
import { useDispatch, useSelector } from 'react-redux'
import { openNoteBig } from '../../store/noteReducer';
import { refreshData } from '../../store/refreshReducer'
import { moveNote} from '../../store/moveNoteReducer'
// import { refreshData } from '../../store/refreshReducer'

export const Note = ({item}) => {
  const dispatch = useDispatch()
  const divRef = useRef(null);
  const moveIt = useSelector(state => state.moveNoteReducer.moveNoteReducer)
  function moveEnd(type)
  {
    var note = localStorage.getItem('curNote')
    var table = localStorage.getItem('curTable')
    var pos = item.posId
    if(item.idNote!==note){
      if(type){
            pos = Number(pos)+1
            
            notes.forEach(element => {
              
              if(element.idTable === item.idTable && element.posId >= pos){
                element.posId = Number(element.posId)+1
              }
            })
            notes.forEach(element => {
              if(element.idTable === table && element.idNote === note){
                  element.idTable=item.idTable;
                  element.idDesk=item.idDesk;
                  element.posId = pos
              }
            })
              
      }else{
        // pos = item.posId
        notes.forEach(element => {
          
          if(element.idTable === item.idTable && element.posId >= pos){
            element.posId = Number(element.posId)+1
          }
        })
        notes.forEach(element => {
          if(element.idTable === table && element.idNote === note){
              element.idTable=item.idTable;
              element.idDesk=item.idDesk;
              element.posId = pos
          }
        })
      }
    }
    localStorage.setItem('curNote', null);
    localStorage.setItem('curTable', null);
    saveAll()
    dispatch(refreshData(1))
  }

  const move=()=>
  {
    localStorage.setItem('curNote', item.idNote);
    localStorage.setItem('curTable', item.idTable);
    dispatch(moveNote(item))
  }
  function bigNoteOpen(){
    dispatch(openNoteBig(item))
  }
  return (
    <div style={moveIt!==null&& moveIt.idNote===item.idNote?{position: 'relative', opacity: '0.1'}:{position: 'relative',opacity: '1'}} onClick={()=>bigNoteOpen()}>
      <div className={styles.red1}  onMouseDown={()=>move()} onMouseUp={()=>moveEnd(0)}></div>
      <div ref={divRef}  className={cn(styles.note, styles.boxDark)} >
          <div className={styles.name}>{item.name}</div>     
          <div className={styles.more}>
            <img width='100%' src={imgMore} alt='' />
          </div>  
      </div>
      <div className={styles.red2} onMouseDown={()=>move()} onMouseUp={()=>moveEnd(1)}></div>
    </div>
  )
}
