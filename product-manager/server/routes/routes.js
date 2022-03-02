const ProductController = require("../controllers/controller");

module.exports = app =>{
    app.get("/api/products", ProductController.getAllProducts);
    app.post("/api/products", ProductController.createNewProduct);
    app.get("/api/products/:id", ProductController.getOneProduct);
    app.put("/api/products/update/:id", ProductController.updateExistingProduct);
    app.delete("/api/products/delete/:id", ProductController.deleteExistingProduct);
}