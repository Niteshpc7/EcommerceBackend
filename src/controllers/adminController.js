const User = require('../model/user');
// get all Seller
exports.getAllSeller = async (req, res) => {
    try {
        const getSeller = await User.find({ role: 'seller' });
        res.status(200).json(getSeller);
    } catch (e) {
        res.status(500).json({ msg: `Server Error !`,error:e.message });
    }
}
// get all useerrrr

exports.getAllUser = async (req, res) => {
    try {
        const getUser = await User.find({ role: 'user' });
        res.status(200).json(getUser);
    } catch(e) {
        res.status(500).json({ msg: 'Server Error ! while fetching Users' ,error:e.message});
    }
}
// update Seller
exports.updateSeller = async (req, res) => {

    try {
        const username = req.params.username;
        const seller =  await User.findOne({username});
        if(!seller){ 
        return res.status(404).json({msg:'Seller does not Exist!'})
        }
        if(seller.role == "seller"){
        const UpdatedSeller = await User.findOneAndUpdate({ username },{$set:req.body},{new:true});
        if(!UpdatedSeller){
          return  res.status(404).json({ msg: 'Seller Not Found ! ' });
        }
    
        res.status(200).json({ msg: 'Seller Update Succesfully !', UpdatedSeller });
    } else {
            return res.status(400).json({ msg: 'This user is not a seller!' });
        }
    
  } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// delete   seller
exports.deleteSeller = async (req, res) => {
    try {
        const username = req.params.username;
        const seller = await User.findOne({username});
        if(!seller){
            return res.status(404).json({msg:"Seller doesn't exist "})
        }
        if(seller.role !== "seller"){
            return res.status(404).json({msg:"This user is not a seller"});
               }else{
        const deleteSeller = await User.findOneAndDelete({ username });
        if (!deleteSeller) {
           return  res.status(404).json({ msg: 'Seller Not Found ! ' });
        }
        res.status(200).json({ msg: 'UserDeleted Succesfully ', deleteSeller })
    }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}
// update User
exports.updateUser = async (req, res) => {

    try {
        const username = req.params.username;
        const uuser = await User.findOne({username});
        if(uuser.role == "user"){
  const UpdatedUser= await User.findOneAndUpdate({ username }, req.body, { new: true });
        if(!UpdatedUser){
          return  res.status(404).json({ msg: 'User Not Found ! ' });
        }

        res.status(200).json({ msg: 'User Update Succesfully !', UpdatedUser });
        }else{
            return res.status(404).json({msg:`the user of this (${username})  username doesnt exist  `});
        }
      
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// delete User
exports.deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        const uuser = await User.findOne({username});
        if(uuser.role == 'user'){

       
        const deleteUser = await User.findOneAndDelete({ username });
        if (!deleteUser) {
           return  res.status(404).json({ msg: 'User Not Found ! ' });
        }
        res.status(200).json({ msg: 'UserDeleted Succesfully ', deleteUser })
    }else{
         return  res.status(404).json({ msg: `the user of this (${username})  username doesnt exist  ` });
    }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}
