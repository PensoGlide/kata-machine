export default function bs_list(haystack: number[], needle: number): boolean {

    /*
        Needle: 69420
        Haystack: [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]

        Length = 11

        REMEBER:
            High is exclusive;
            Low is inclusive.
    */

    let low: number = 0;
    let high: number = haystack.length;
    let m: number = 0;
    let v: number = 0;

    do {
        m = low + Math.floor((high - low) / 2);
        v = haystack[m];

        // console.log('High: ', high);
        // console.log('Low: ', low);
        // console.log('M: ', m);
        // console.log('Value: ', v);

        if (needle === v) {
            // console.log('Certo');
            return true;
        } else if (needle > v) {
            low = m + 1;
        } else {
            high = m;
        }

    } while (high > low)

    return false;

}