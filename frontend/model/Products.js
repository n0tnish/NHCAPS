import {connection as db} from "../config/index.js"
class Products{
       fetchProducts(req,res){
       const qry = `
       select prodID,prodName,description, productAmount,prodCategory, prodUrl
       FROM products;`
        db.query(qry, (err, results)=>{
           if(err) throw err
           res.json({
               status : res.statusCode,
               results
           })
        })
   }
   fetchProduct(req,res){
       const qry = `
       select prodID,prodName,description, productAmount,prodCategory, prodUrl
       FROM products WHERE prodID=${req.params.id};`
        db.query(qry, (err, result)=>{
           if(err) throw err
           res.json({
               status : res.statusCode,
               result : result[0]
           })
        })
   }
   addProduct(req, res) {
    const qry = `INSERT INTO products SET ?;`;
    const data = req.body; // Assuming req.body contains the data to be inserted
    db.query(qry, data, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Failed to add product' });
      }
      res.json({
        status: res.statusCode,
        msg: 'New product was added'
      });
    });
  }  
   deleteProducts(req,res){
     const qry=`DELETE FROM products ;`

     db.query(qry, (err)=>{
       if(err) throw err
       
       res.json({
         status: res.statusCode,
         msg:'Product was delete!'
       })

     })
 }
deleteProduct(req, res) {
 const qry = `DELETE FROM products WHERE prodID=${db.escape(req.params.id)};`;

 db.query(qry, (err) => {
   if (err) {
     throw err;
   } else {
     res.json({
       status: res.statusCode,
       msg: 'Product is deleted!',
     });
   }
 });
}

updateProduct(req, res) {
  // Assuming req.body contains the data to update and all fields are correctly named as in the database
  const qry = `UPDATE products SET ? WHERE prodID = ?;`;
  const dataToUpdate = req.body;
  const prodId = req.params.id;

  db.query(qry, [dataToUpdate, prodId], (err) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Failed to update product' });
      }
      res.json({
          status: res.statusCode,
          msg: 'Product is updated!'
      });
  });
}



}
export{
   Products
   
}