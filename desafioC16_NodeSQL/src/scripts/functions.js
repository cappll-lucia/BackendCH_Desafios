

export function nextID(prod, array){
    //orden de array segun id
    array.sort((a,b)=>{return a-b})
    //return de proximo id
    let nextID = number(array[array.length-1].id)+1;
    return nextID;
}