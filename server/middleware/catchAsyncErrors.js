module.exports = thefunc => (req,res,next) =>{
    Promise.resolve(thefunc(req,res,next)).catch(next); // Promise.resolve is like the try block and we have a catch... which we are applying to thefunc
};