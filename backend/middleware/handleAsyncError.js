export default (myErrorFun) => (req, res, next) => {
  Promise.resolve(myErrorFun(req, res, next)).catch(next);
};
// export default (myErrorFun) => (req, res, next) => {
//   Promise.resolve(myErrorFun(req, res, next)).catch((err) => {
//     console.log("ERROR CAUGHT:", err); // ← yeh lagao
//     console.log("ERROR NAME:", err.name);
//     console.log("ERROR MESSAGE:", err.message);
//     console.log("STACK:", err.stack);
//     next(err);
//   });
// };
