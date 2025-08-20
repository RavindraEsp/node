const mongoose = require('mongoose');// add for id validation
const MenuItem = require('../models/MenuItem');// export person file from modules directory 

// Create new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const data = req.body //Assuming the req body contain he person data 
    //create a new person documen using the mongodb  model
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {

  try {
    const menuId = req.params.id; // Extract the person id 
    const updatedMenuData = req.body // update data for person 

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ error: "Invalid person ID format" });
    }

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // return the updated document
      runValidators: true, // run mongoes validation
    });
    console.log("Response is ");
    console.log(response);

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Data updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {

  try {

    const menuId = req.params.id; // Extract the person id 
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ error: "Invalid menu ID format" });
    }
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "menu not found" });
    }
    console.log("Data updated successfully");
    res.status(200).json(response);

  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get menu items by taste
exports.getMenuByTaste = async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spices" || taste == "sauce") {
      const response = await MenuItem.find({ taste: taste });
      console.log("Data Fetched successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid taste type' });

    }
  } catch (err) {
    console.log("Error => --  ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
