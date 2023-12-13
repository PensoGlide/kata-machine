export default function bubble_sort(arr: number[]): void {

    const len = arr.length;
    let tmp;

    for (let i = len; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}