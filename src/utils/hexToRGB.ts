export const hexToRgb = (hex: string)=>{
    let c:any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length === 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');

        // tslint:disable-next-line:no-bitwise
        return {
            a: 1,
            // tslint:disable-next-line:no-bitwise
            b: c&255,
            // tslint:disable-next-line:no-bitwise
            g: (c>>8)&255,
            // tslint:disable-next-line:no-bitwise
            r: (c>>16)&255
        }
    }
    throw new Error('Bad Hex');
}