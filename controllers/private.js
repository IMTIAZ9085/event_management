exports.getPrivateData = (req, res, next) => {
      res.status(200).json({
            success: true,
            user: req.user
      });
      // console.log(`private route this is User mail is ${req.user.email}`);
};