type Node<T> = {
    value: T,
    prev?: Node<T>,
}

export default class Stack<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node: Node<T> = {value: item} as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
        } else {
            node.prev = this.head;
            this.head = node;
        }
    }
    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        } else {
            const value = this.head.value;
            this.head = this.head.prev;

            this.length--;
            return value;
        }
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}