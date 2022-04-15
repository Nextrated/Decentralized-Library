
export const timeConv = (t) => {
    let x = t.toString(16) * 1000
    x = new Date(+x);
    return x.toDateString();
}

export const sortFiles = (files) => {
    if(files){
        return files.sort(compare)
    } else{
        return files
    }
    
}

function compare(first, second) {
    try {    
        if (first.timestamp.gt(second.timestamp)){
            return -1;
        }
        if (first.timestamp.lt(second.timestamp)){
            return 1;
        }
        return 0;
    } catch(error) {
        console.log("Error: ", error)
    }
}