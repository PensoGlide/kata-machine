export default function two_crystal_balls(breaks: boolean[]): number {

    /* 
        The reason for a root is that it is the most obvious choice of jump
        that is faster than O(n) for a big n. Mathematically and theoretically, 
        the more you increase the root (1 / k with k -> + infinite), it's O will tend
        to constant time, O(1)
    */
    //const jump: number = Math.floor( Math.sqrt(breaks.length) );
    const jump: number = Math.floor( Math.pow(breaks.length, 1 / 3) );
    console.log('Jump: ', jump);

    let i = jump;
    for (; i < breaks.length; i += jump) {
        
        if (breaks[i]) {
            break;
        }
    }

    i -= jump;
    for (; i < breaks.length; ++i) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}