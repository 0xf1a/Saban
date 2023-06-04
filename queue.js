class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        this.queue.push(element);
    }

    dequeue() {
        return this.queue.shift();
    }

    first() {
        return this.queue[0];
    }

    last() {
        return this.queue[this.queue.length - 1];
    }

    length() {
        return this.queue.length;
    }

    empty() {
        return this.length() === 0;
    }

    clear() {
        this.queue = [];
    }

    serialize() {
        return this.queue.join("\n");
    }
}

module.exports = {
    Queue
};