type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class Queue<T> {
    public length: number;

    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    enqueue(item: T): void {
        const newNode: Node<T> = {
            value: item,
            prev: this.tail,
            next: undefined
        }

        this.length++;

        if (this.head === undefined || this.tail === undefined) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    deque(): T | undefined {
        if (this.head === undefined || this.tail === undefined) {
            return undefined;
        } else {
            const value: T = this.head.value;
            if (this.head.next !== undefined) {
                this.head = this.head.next;
                this.head.prev = undefined;
            } else {
                this.head = undefined;
                this.tail = undefined;
            }
            this.length--;
            return value;
        }
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}