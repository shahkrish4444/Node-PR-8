const express = require('express');
const db = require('./Config/database');
const catRouter = require('./Routers/Category.Router');
const subCatRouter = require('./Routers/subCategory.router');
const extraCatRouter = require('./Routers/extracategory.router');
const P_router = require('./Routers/product.router');
const product = require('./Models/product.schema');

const port = 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use('/category', catRouter);
app.use('/subcategory', subCatRouter);
app.use('/extracategory', extraCatRouter);
app.use('/product', P_router);

app.get('/showproduct', async (req, res) => {
    
    const products = await product.find().populate({
        path:"extraCategoryId",
        populate:{
            path:"subCategoryId",
            populate:{
                path:"categoryId"
            }
        }
    })
  
    res.render('Pages/showproduct' ,{data:products})
  });

app.get('/', (req, res) => {
    res.render('Pages/index');
})

app.listen(port, (err) => {
    db();
    if (err) {
        console.log("server not start.");
        return false;
    }
    console.log("server start in http://localhost:" + port);
});