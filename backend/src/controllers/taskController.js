const Task = require('../models/Task');

// Admin: create/assign task
exports.createTask = async (req, res, next) => {
  try {
    //fetch data from req.body for task creation
    const { title, description, assignedTo, dueDate } = req.body;

    //validation
    if (!title || !assignedTo) 
      return res.status(400).json({ 
    success: false, 
    message: 'Missing fields' 
  });

  //create task
    const task = new Task({ title, description, assignedTo, assignedBy: req.user.id, dueDate });

    //save task
    await task.save();

    //return response
    res.status(201).json({ 
      success: true, 
      data: task 
    });
  } catch(err){
    next(err); 
  }
};

// Admin: get all tasks (optional filter by employee)
exports.getAllTasks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.employee) filter.assignedTo = req.query.employee;
    const tasks = await Task.find(filter).populate('assignedTo', 'name email').populate('assignedBy', 'name');
    res.status(200).json({ 
      success: true, 
      data: tasks 
    });
  } catch (err) { 
    next(err); 
  }
};

// Employee: get my tasks
exports.getMyTasks = async (req, res, next) => {
  try {
    //employee can see only their tasks
    const tasks = await Task.find({ assignedTo: req.user.id }).populate('assignedBy', 'name');
    res.status(200).json({ 
      success: true, 
      data: tasks 
    });
  } catch (err) { 
    next(err); 
  }
};

// Employee: update status
exports.updateStatus = async (req, res, next) => {
  try {
    //validate status
    const { status } = req.body;
    if (!['pending', 'completed', 'failed'].includes(status)) 
      return res.status(400).json({ 
      success: false, 
      message: 'Invalid status' });

    //employee find task
    const task = await Task.findById(req.params.id);
    if (!task) 
      return res.status(404).json({ 
      success: false, 
      message: 'Task not found' 
    });
    if (task.assignedTo.toString() !== req.user.id) 
      return res.status(403).json({
      success: false, 
      message: 'Not your task' 
    });

    //update status
    task.status = status;
    await task.save();
    return res.status(200).json({ 
      success: true, 
      data: task 
    });
  } catch (err) { 
    next(err); 
  }
};

// Admin: update or delete task
exports.updateTask = async (req, res, next) => {
  try {
    //update task by id
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) 
      return res.status(404).json({ 
    success: false, 
    message: 'Task not found' 
  });
    res.status(200).json({ 
      success: true, 
      data: task 
    });
  } catch (err) { 
    next(err); 
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    //delete task by id
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) 
      return res.status(404).json({ 
      success: false, 
      message: 'Task not found' 
    });
    return res.status(200).json({ 
      success: true, 
      message: 'Deleted' 
    });
  } catch (err) { 
    next(err); 
  }
};



