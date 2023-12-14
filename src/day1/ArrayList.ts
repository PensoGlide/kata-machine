export default class ArrayList<T> {
    public length: number;
    public capacity: number;
    public arr: Array<T>;

    constructor(_capacity: number) {
        this.length = 0;
        this.capacity = _capacity;
        this.arr = new Array(_capacity);
    }

    _increaseCapacity(): Array<T> {
        this.capacity *= 2;
        const currentArray = this.arr;
        this.arr = new Array(this.capacity);

        return currentArray;
    }

    prepend(item: T): void {
        if (this.length === 0) {
            // Because I am going to add in this.append(), otherwise I would be adding twice
            this.append(item);
            this.length--;
        } else if (this.length === this.capacity) {
            const currentArray = this._increaseCapacity();
            this.arr[0] = item;
            for (let i = 0; i < currentArray.length; i++) {
                this.arr[i + 1] = currentArray[i];
            }
        } else {
            for (let i = this.arr.length; i > 0; i--) {
                this.arr[i] = this.arr[i - 1];
            }
            this.arr[0] = item;
        }

        this.length++;
        // console.log('Prepend: ', this.arr, ' length: ', this.length)
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length - 1) {
            return;
        }

        this.length++;

        let currentArray: Array<T>;
        if (this.length > this.capacity) {
            currentArray = this._increaseCapacity();
        } else {
            currentArray = this.arr;
        }

        this.arr[idx] = item;
        const newArrayPart = currentArray.slice(idx);
        this.arr.splice(idx + 1, this.arr.length - idx, ...newArrayPart);
    }

    append(item: T): void {
        this.length++;

        if (this.length === this.capacity) {
            const currentArray = this._increaseCapacity();
            this.arr = currentArray;
        }

        this.arr[this.length - 1] = item;
        // console.log('Append: ', this.arr, ' length: ', this.length)
    }

    remove(item: T): T | undefined {
        let foundAt: number = -1;

        for (let i = 0; i < this.length; i++) {
            if (this.arr[i] === item) {
                foundAt = i;
            }

            if (foundAt > -1) {
                this.arr[i] = this.arr[i+1];
            }
        }
        // console.log('Remove: ', this.arr, ' length: ', this.length)

        if (foundAt > -1) {
            this.length--;
            return item;
        } else {
            return undefined;
        }
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined
        } else {
            /*
            let value: T = this.arr[0];
            for (let i = 1; i < idx; i++) {
                value = this.arr[i];
            }

            return value;
            */
           return this.arr[idx]
        }
    }

    removeAt(idx: number): T | undefined {
        let value: T;

        if (idx > this.length - 1) {
            return undefined;
        }

        for (let i = 0; i < this.length; i++) {
            if (i === idx) {
                value = this.arr[i];
            }

            if (i >= idx) {
                this.arr[i] = this.arr[i+1];
            }
        }

        this.length--;
        // console.log('RemoveAt: ', this.arr, ' length: ', this.length)

        return value!;
    }
}