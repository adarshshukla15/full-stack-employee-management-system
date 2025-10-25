const Announcement = require('../models/Announcement');

exports.getAll = async (req, res, next) => {
  try {
    const ann = await Announcement.find().sort({ createdAt: -1 }).populate('createdBy', 'name');
    res.status(200).json({ 
      success: true, 
      data: ann 
    });
  } catch (err) { 
    next(err); 
  }
};

exports.create = async (req, res, next) => {
  try {
    //fetch data from req.body for announcement
    const { title, message } = req.body;

    //validation
    if (!title || !message) 
      return res.status(400).json({ 
      success: false, 
      message: 'Missing fields' 
    });

    //create announcement
    const ann = new Announcement({ title, message, createdBy: req.user.id });

    //save announcement
    await ann.save();

    //return response
    res.status(201).json({ 
      success: true, 
      data: ann 
    });
  } catch (err) { 
    next(err); 
  }
};

exports.remove = async (req, res, next) => {
  try {
    //delete announcement by id
    const ann = await Announcement.findByIdAndDelete(req.params.id);

    //if announcement not found return response
    if (!ann) 
      return res.status(404).json({ 
      success: false, 
      message: 'Not found' 
    });
    res.status(200).json({ 
      success: true, 
      message: 'Deleted' 
    });
  } catch (err) { 
    next(err); 
  }
};
