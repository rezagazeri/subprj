/**
 * 
 */
class LimitedParallels {

    /**
     * 
     * @param {number} maxParallel 
     */
    constructor(maxParallel = 100) {
        this.maxParallel = maxParallel
        this.resolves = new Array()
        this.current = 0
    }

    /**
     * 
     * @returns {Promise<void>}
     */
    async next() {
        await new Promise(resolve => {
            if (this.current < this.maxParallel) {
                this.current++
                resolve()
            } else {
                this.resolves.push(resolve)
            }
        })
    }

    /**
     * 
     * @return {void}
     */
    done() {
        if (this.resolves.length != 0) {
            this.resolves.shift()()
        } else {
            this.current--
        }
    }
}

module.exports = {
    LimitedParallels
}
