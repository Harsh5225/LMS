import multer from "multer"


// folder create karenge ja saari image uopload store hogi
const upload=multer({dest:"uploads/"});
export default upload;