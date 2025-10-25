const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title:{ 
    type: String, 
    required: true 
  },
  description:{ 
    type: String 
  },
  assignedTo:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedBy:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status:{ 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  dueDate:{ 
    type: Date 
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
