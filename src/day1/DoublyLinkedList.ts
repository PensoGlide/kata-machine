type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const newNode: Node<T> = {
            value: item,
            prev: undefined,
            next: undefined
        }

        if (this.head !== undefined) {
            newNode.next = this.head;
            this.head.prev = newNode;
        } else {
            this.tail = newNode;
        }

        this.head = newNode;
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx === this.length + 1) {
            this.append(item);
        } else if (idx > this.length + 1) {
            console.log('idx is greater than the length of the list.');
            return;
        } else if (idx === 0) {
            this.prepend(item);
        } else if (this.head === undefined || this.tail === undefined) {
            return undefined;
        } else {
            let current: Node<T> = this.head;
            let previous: Node<T> = this.head;
            
            for (let i = 0; i < idx && current.next !== undefined; i++) {
                previous = current;
                current = current.next;
            }

            const newNode: Node<T> = {
                value: item,
                prev: previous,
                next: current,
            };
    
            previous.next = newNode;
            current.prev = newNode;    

            this.length++;
        }
    }
    append(item: T): void {
        if (this.head === undefined || this.tail === undefined) {
            this.head = {
                value: item
            }
            this.tail = this.head;
        } else {
            const newNode: Node<T> = {
                value: item,
                prev: this.tail,
                next: undefined,
            };
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }
    remove(item: T): T | undefined {
        if (this.head === undefined || this.tail === undefined) {
            return undefined;
        }

        this.length--;
        
        if (item === this.head.value) { 
            this.head = this.head.next!;
            this.head.prev = undefined;
            return item;
        } else if (item === this.tail.value) { 
            this.tail = this.tail.prev!;
            this.tail.next = undefined;
            return item;
        }

        let current: Node<T> = this.head;
        for (let i = 0; i < this.length && current.next !== undefined; i++) {
            if (current.value != item) {
                current = current.next;
            } else {
                let previous: Node<T> = current.prev!;
                let next: Node<T> = current.next;

                previous.next = current.next;
                next.prev = current.prev;
                
                return current.value;
            }
        }

        this.length++;
        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx === this.length) {
            return this.tail?.value;
        } else if (idx > this.length + 1) {
            console.log('idx is greater than the length of the list.');
            return undefined;
        } else if (idx === 0) {
            return this.head?.value;
        } else if (this.head === undefined || this.tail === undefined) {
            return undefined;
        } else {
            let current: Node<T> = this.head;
            for (let i = 0; i < idx && current.next !== undefined; i++) {
                current = current.next;
            }
            return current.value;
        }
    }
    removeAt(idx: number): T | undefined {
        if (idx > this.length + 1) {
            console.log('idx is greater than the length of the list.');
            return undefined;
        } else if (this.head === undefined || this.tail === undefined) {
            return undefined;
        } 
        
        this.length--;
        
        if (this.length === 0) {
            const value = this.head.value;
            this.head = undefined;
            this.tail = undefined;
            return value;
        } else if (idx === 0) {
            const value = this.head.value;
            this.head = this.head.next!;
            this.head.prev = undefined;
            return value;
        } else if (idx === this.length) { // no -1 because I deduct this.length beforehand
            const value = this.tail.value;
            this.tail = this.tail.prev!;
            this.tail.next = undefined;
            return value;
        } else {
            let current: Node<T> = this.head;
            let previous: Node<T> = this.head;
            let next: Node<T> = this.head;
            for (let i = 0; i < idx && current.next !== undefined; i++) {
                previous = current;
                current = current.next;
            }
            
            const value = current.value;

            next = current.next!;
            previous.next = next;
            next.prev = previous;

            return value;
        }
    }
}