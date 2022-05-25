import test from './test';
console.log(test);

const vNode = (...args) => args;

class testing {
    #hei = 1;
    constructor() {
        console.log(this.gen(), this.#hei);
        this.#hei = 2;

        console.log(this.gen(), this.#hei);
    }
    
    gen() {
        return <p>hei</p>
    }
}

const h = new testing();
console.log(h);

console.log('hei');
