export const getAllStringContent = (arr: Array<{"text":string}>) => {  
    
    let total = ""; 
    arr.forEach((obj: {"text": string}) => {
        total += obj.text; 
    });

    return total;
}