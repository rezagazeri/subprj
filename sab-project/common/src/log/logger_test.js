// const { initLogger, getLogger } = require("../src/log/logger")
// const { LogLevel, Log } = require("../src/log/log")

// async function test() {
//     await initLogger()
//     for (let i = 0; i < 10000; i++) {
//         getLogger().handle(new Log(LogLevel.Info, "Tag2", {hi: "Hello"}))
//     }
//     setTimeout(() => {
//         for (let i = 0; i < 1100; i++) {
//             getLogger().handle(new Log(LogLevel.Info, "Tag", {hi: "Hello"}))
//         }
//     }, 1200);
// }

// test()
