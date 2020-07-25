module.exports = function (mongoose) {
  return mongoose.model('monitorLog', {
    content: {
      type: Object
    },
    flag: {
      type: Number,
      default: 0
    }
  })
}
