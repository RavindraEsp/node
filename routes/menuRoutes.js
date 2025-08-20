const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');


// router.post('/', async (req, res) => {
//   try {
//     const data = req.body //Assuming the req body contain he person data 
//     //create a new person documen using the mongodb  model
//     const newMenuItem = new MenuItem(data);
//     const response = await newMenuItem.save();
//     console.log("Data saved successfully");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log("Error => --  ", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }
// )


router.post('/', menuController.createMenuItem);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.get('/', menuController.getAllMenuItems);
router.get('/:taste', menuController.getMenuByTaste);



module.exports = router; // export router to use it on server.jjs file 

