export function isString(text?:string|null){
    if(!text) {
        return false
    }

    if(text.length < 1) {
        return false
    }
    return true
} 
