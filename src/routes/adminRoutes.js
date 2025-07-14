const express = require('express');
const router = express.Router();

const {getAllUser, getAllSeller, updateSeller,deleteSeller,updateUser,deleteUser} = require('../controllers/adminController');
const protect = require('../middleware/protect');
const isAdmin = require('../middleware/isAdmin');

router.get('/getUser',getAllUser);
router.get('/getseller',protect,isAdmin,getAllSeller);
router.put('/updateUser/:username',protect,isAdmin,updateUser);
router.delete('/deleteUser/:username',protect,isAdmin,deleteUser);
router.put('/updateSeller/:username',protect,isAdmin,updateSeller);
router.delete('/deleteSeller/:username',protect,isAdmin,deleteSeller);
module.exports = router;
