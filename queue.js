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
        return this.queue[this.length() - 1];
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
        let queue = '';
        this.queue.forEach(element => {
            queue += element.url + "\n";
        });
        return queue;
    }
}

module.exports = {
    Queue
};