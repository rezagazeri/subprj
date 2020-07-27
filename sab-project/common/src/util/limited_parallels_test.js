// const assert = require("assert")
// const common = require("../../index")

// describe("LimitedParallels", () => {
//     it("Logic", async() => {
//         let size = 10
//         let pendingTime = 1000
//         let limiter = new common.LimitedParallels(size)
//         for (let i = 0; i <= size; i++) {
//             let now = new Date()
//             await limiter.next()
//             if (i != size) {
//                 setTimeout(() => {
//                     limiter.done()
//                 }, pendingTime)
//                 assert.ok((new Date().getTime() - now.getTime()) < 10, "OK")
//             } else {
//                 assert.ok((new Date().getTime() - now.getTime()) >= pendingTime, "OK")
//             }
//         }
//     })
// })
