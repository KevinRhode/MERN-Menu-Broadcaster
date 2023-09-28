const mongoose = require('mongoose');

const { Schema } = mongoose;


const endpointSchema = new Schema({
  slideshows: {
    type: [Schema.Types.ObjectId],
    ref: "Slideshow",
  },
  index: {
    type: Number,
    required: true,
    unique: true,
  },

});

const Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
