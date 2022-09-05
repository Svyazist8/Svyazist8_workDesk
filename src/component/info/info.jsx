import React from 'react'
import styles from './info.module.scss'
import cn from 'classnames'
import moveNote from './../../media/video/moveNote1.mp4'
// import moveTable from './../../media/video/moveTable.mp4'
import moveTable2 from './../../media/video/moveTable2.mp4'
import moveNote2 from './../../media/video/moveNote2.mp4'
import deleteV from './../../media/video/delete.mp4'
import renameD from './../../media/video/renameDesk.mp4'
import renameT from './../../media/video/renameTable.mp4'
import renameN from './../../media/video/renameNote.mp4'


export const Info = ({active, setActive}) => {
    if(active){
    return (
        <div className={styles.info} onClick={()=>setActive(false)}>
            <div className={cn(styles.content, styles.boxDark)} onClick={e => e.stopPropagation()}>
                <div>
                    <p>Над проектом постепенно работаю и добавляю новый функционал</p>
                    <p>Все внесенные данные хранятся в localStorage</p>
                    <p>Можно менять записи в таблице местами</p>
                    <video className={styles.vid} src={moveNote} width='350px' height='350px' type='video/mp4' autoPlay loop></video>
                    <p>Можно  перемещать "таблицы" между досками, указывать порядок размещения</p>
                    <video className={styles.vid} src={moveTable2} width='850px' height='350px' type='video/mp4' autoPlay loop></video>
                    <p>Можно перекидывать записи в другие таблицы находящиеся в других досках</p>
                    <video className={styles.vid} src={moveNote2} width='850px' height='350px' type='video/mp4' autoPlay loop></video>
                    <p>Удаление записей и таблиц</p>
                    <video className={styles.vid} src={deleteV} width='850px' height='550px' type='video/mp4' autoPlay loop></video>
                    <p>Изменить название доски можно двойным кликом по названию доски</p>
                    <video className={styles.vid} src={renameD} width='850px' height='250px' type='video/mp4' autoPlay loop></video>
                    <p>Изменить название таблицы можно так:</p>
                    <video className={styles.vid} src={renameT} width='850px' height='550px' type='video/mp4' autoPlay loop></video>
                    <p>Редактировать запись можно кликнув по самой записи:</p>
                    <video className={styles.vid} src={renameN} width='850px' height='550px' type='video/mp4' autoPlay loop></video>
                </div>
            </div>
        </div>  
    )}
}
