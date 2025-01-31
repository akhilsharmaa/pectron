export const getAllStringContent = (arr) => {  
    
    let total = ""; 
    arr.forEach((obj: string) => {
        total += obj.text; 
    });

    return total;
}