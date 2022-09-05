export let desks= [{}]
export let tables= [{}]
export let notes = [{}]

export function saveAll(){
    var d = JSON.stringify(desks)
    var t = JSON.stringify(tables)
    var n = JSON.stringify(notes)
    localStorage.setItem('desks' ,  d);
    localStorage.setItem('tables',  t);
    localStorage.setItem('notes' ,  n);
}
export function notesUpdate(newObject){
    notes=newObject
    saveAll()
}
export function tablesUpdate(newObject){
    tables=newObject
    saveAll()
}
export function desksUpdate(newObject){
    desks=newObject
    saveAll()
}
export function localData(){
    if(localStorage.desks)  desks  =  JSON.parse(localStorage.desks)
    if(localStorage.tables) tables =  JSON.parse(localStorage.tables)
    if(localStorage.notes)  notes  =  JSON.parse(localStorage.notes)
}