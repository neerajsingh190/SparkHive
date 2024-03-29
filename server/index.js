        // NEERAJ 1

const express = require('express');
const mysql = require('mysql2');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const app = express();
const cookieParser = require("cookie-parser")
const port = 3001;
const cors = require('cors')
const multer = require('multer')
app.use(express.json())
app.use(cors());
const path = require("path");
app.use(cookieParser())
const {promisify} = require('util')

// changed here
const storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    console.log(file);
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
// Replace these with your MySQL database connection details
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Ecommerce',
  port:8889
});
// const db2 = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'nodejs-login',
//   port:8889
// });
app.use('/images', express.static('images'));

// Connect to MySQL database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

app.post('/api/add',(req,res)=>{
  let product = req.body;
  let success = false;
  console.log(product)
  console.log("request coming")
  const query = "INSERT INTO product (name,image_url,category,price,offer_price,description,stock_quantity,manufacturer,weight) values(?,?,?,?,?,?,?,?)";
  db.query("INSERT INTO product set ?",{name :product.name,image_url: product.image ,category :product.category,price :product.price,offer_price :product.offer_price,description:product.description,stock_quantity:product.stock_quantity,manufacturer:product.manufacturer,weight:product.weight},(err,results)=>{
      if(!err){
        success = true;
          return res.status(200).json({success:success ,message:"Product Added Successfully!"});
      }
      return res.status(500).json({err});
  })
})
const upload = multer({storage: storage})
app.post("/upload",upload.single('product') ,(req,res)=>{
  res.json({
    success: 1,
    image_url: `http://localhost:3001/images/${req.file.filename}`
})
})
// Define a route to fetch products from the database
app.get('/api/products', (req, res) => {
  
  const query = 'SELECT * FROM product';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.get('/get', (req, res) => {
    
  var query = "select * from customer";
  db.query(query, (err, results) => {
      if (!err) {
          return res.status(200).json(results);
      }
      else {
          return res.status(500).json(err);
      }
  })
})
// router.post('/add',auth.authenticateToken,(req,res)=>{
//   let product = req.body;
//   var query = "INSERT INTO product (name,category_id,description,price) values(?,?,?,?)";
//   db.query(query,[product.name,product.category_id,product.description,product.price],(err,results)=>{
//       if(!err){
//           return res.status(200).json({message:"Product Added Successfully!"});
//       }
//       return res.status(500).json({err});
//   })
// })

// app.post('/login', async (req, res) => {
//   console.log("request coming");
//   let success = false;
//   console.log(req.body);

//   try {
//     const { email, password } = req.body;

//     if (!email) {
//       return res.status(400).json({ success, errors: "please enter the email" });
//     }
//     if (!password) {
//       return res.status(400).json({ success, errors: "please enter the password" });
//     }

//     const [results] = await db.query('select * from customer where email = ?', [email]); // Use await directly

//     if (!results || !(await bcrypt.compare(password, results[0].password))) {
//       res.status(401).json({
//         errors: 'email id or password is incorrect'
//       });
//     } else {
//       success = true;
//       const id = results[0].customer_id;
//       const token = jwt.sign({ id }, "mysupersecretpassword", {
//         expiresIn: "90d"
//       });
//       console.log("The token is " + token);

//       // Choose your preferred approach for sending the token (comment out the other):

//       // 1. Send token in response body:
//       res.json({ success, token });

//       // 2. Send token as a cookie (uncomment and adjust cookie options):
//       // const cookieOptions = {
//       //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//       //   httpOnly: true
//       // };
//       // res.cookie('jwt', token, cookieOptions);

//       console.log("login completed");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ errors: "Internal server error" }); // Handle errors gracefully
//   }
// });

app.post('/login',async  (req,res)=>{
  console.log("request coming")
  let success = false;
  console.log(req.body)
  try {
      const { email , password } = req.body;
      if(!email )
      {
          return res.status(400).json({success: success, errors: "please enter the email" })
      }
      if(!password)
      {
          return res.status(400).json({success: success, errors: "please enter the password"})
      }
       db.query('select * from customer where email = ?',[email],async( err , results)=>{
          console.log(results);
          if(!results || results.length==0) // to compare the hashed password with the password present in req.body
          {
             return res.status(401).json({
                  errors : 'email id or password is incorrect'
          })
          } 
          else if (!( await bcrypt.compare(password , results[0].password))) // to compare the hashed password with the password present in req.body
          {
             return res.status(401).json({
                  errors : 'email id or password is incorrect'
          })
          } 
          
          else
             { 
              success = true;
              const id = results[0].customer_id ; // {id : id } can be used but both are same thats why only id is used 
              const token = jwt.sign({id} , "mysupersecretpassword" ,{    // 1. making token using jasonWebToken 
                  expiresIn : "90d" 
              })
              console.log("The token is " + token); // token will be sent as a cookie , cookie and token will be same 

              // const cookieOptions = {       // setting cookies specifications 
              //     expiresIn : new Date(
              //         Date.now + 90 * 24 * 60 * 60 * 1000 
              //     ),
              //     httpOnly : true 
              // }
              res.json({ success, token }) ;

              // res.cookie('jwt',token , cookieOptions )  // using token to create and sending cookie 
                                                      // name of cookie is jwt and value of cookie is token 
              // res.status(200).redirect("/")       // redirect to the home page 

              console.log("login completed")
             }

      })
  } catch (err) {
      
  }
});  
app.post('/signup',async  (req,res)=>{
console.log("request coming")
  const { firstname , lastname, address ,zipcode ,phonenumber, email , password } = req.body
  const emptyFields = [];
if (!firstname) {
  emptyFields.push("First Name");
}
if (!lastname) {
  emptyFields.push("Last Name");
}
if (!address) {
  emptyFields.push("Address");
}
if (!zipcode) {
  emptyFields.push("Zip Code");
}
if (!phonenumber) {
  emptyFields.push("Phone Number");
}
if (!email) {
  emptyFields.push("Email");
}
if (!password) {
  emptyFields.push("Password");
}

// Handle empty fields
if (emptyFields.length > 0) {
  res.status(400).json({
    errors: `Please fill in the following required fields: ${emptyFields.join(', ')}`,
  });
  return; // Return early to prevent further execution
}
  db.query('select email from customer where email=?',[email], async (err, results) => {
    if (err) {
        console.log("error")
    } else {
        if (results && results.length > 0) {
            res.json({
                errors : 'That email is already in use '
            });
        } 
         else {
            // Hash the password only if the email is not in use and passwords match
            let hashPassword = await bcrypt.hash(password, 8); // encrypting the password using bcrypt 
            console.log(hashPassword);
                                                // it doesnt matter what is the order of keys just key should match with the column name
            db.query('insert into customer set ?',{ first_name : firstname , last_name: lastname,address : address, zip_code : zipcode,phone_number:phonenumber, password : hashPassword , email : email},(err,results)=>{
                if(err){
                    console.log(err)
                }
                else
                {
                    console.log(results)
                    res.json({
                        message: 'user registered'
                    });
                }
            })

            // Continue with the rest of your code...
        }
    }
});
})

// app.post('/addtocart', async (req, res) => {
//   // 1. Verify JWT token
//   console.log("request coming ")
//   const token = req.headers['auth-token'];
//   if (!token) return res.status(401).send({ message: 'Unauthorized: Missing auth token' });

//   try {
//     const decoded = jwt.verify(token, "mysupersecretpassword"); // Replace with your secret
//     const customerId = decoded.id;

//     // 2. Find cart ID for the customer
//     const [rows] = await db.query('SELECT cart_id FROM Cart WHERE customer_id = ?', [customerId]);
//     let cartId;
//     if (rows.length === 0) {
//       // Create a new cart if customer doesn't have one
//       const [newCartResult] = await db.query('INSERT INTO Cart (customer_id, cart_name) VALUES (?, ?)', [customerId, 'My Cart']);
//       cartId = newCartResult.cart_id;
//     } else {
//       cartId = rows[0].cart_id;
//     }

//     // 3. Extract item ID from request body
//     const { itemId } = req.body;
//     if (!itemId) return res.status(400).send({ message: 'Missing item ID in request body' });

//     // 4. Check if item exists (optional, depending on your logic)
//     const [itemExists] = await db.query('SELECT * FROM product WHERE product_id = ?', [itemId]);
//     if (itemExists.length === 0) return res.status(404).send({ message: 'Product not found' });

//     // 5. Add item to cart (assuming no existing entry for this product)
//      db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cartId, itemId, 1]); // Modify quantity if needed

//     res.status(200).send({ message: 'Item added to cart successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Internal server error' });
//   }
// });

app.post('/addtocart', async (req, res) => {
  // 1. Verify JWT token
  console.log("request coming aagain ")
  const token = req.headers['auth-token'];
  if (!token) return res.status(401).send({ message: 'Unauthorized: Missing auth token' });

  try {
    const decoded = jwt.verify(token, "mysupersecretpassword"); // Replace with your secret
    const customerId = decoded.id;

    // 2. Find cart ID for the customer
    const findCartId = (callback) => {
      db.query('SELECT cart_id FROM Cart WHERE customer_id = ?', [customerId], (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows.length === 0 ? null : rows[0].cart_id);
      });
    };

    let cartId;
    await new Promise((resolve, reject) => {
      findCartId((error, id) => {
        if (error) {
          return reject(error);
        }
        cartId = id;
        resolve();
      });
    });

    if (!cartId) {
      // Create a new cart if customer doesn't have one
      const createCart = (callback) => {
        db.query('INSERT INTO Cart (customer_id, cart_name) VALUES (?, ?)', [customerId, 'My Cart'], (err, result) => {
          if (err) {
            return callback(err);
          }
          callback(null, result.insertId);//return cart_id 
        });
      };

      await new Promise((resolve, reject) => {
        createCart((error, id) => {
          if (error) {
            return reject(error);
          }
          cartId = id;
          resolve();
        });
      });
    }

    // 3. Extract item ID from request body
    const { itemId , quantity} = req.body;
    if (!itemId) return res.status(400).send({ message: 'Missing item ID in request body' });

    // 4. Check if item exists (optional, depending on your logic)
    const checkItem = (callback) => {
      db.query('SELECT * FROM product WHERE product_id = ?', [itemId], (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows.length === 0 ? null : rows);
      });
    };

    let itemExists;
    await new Promise((resolve, reject) => {
      checkItem((error, data) => {
        if (error) {
          return reject(error);
        }
        itemExists = data;
        resolve();
      });
    });

    if (!itemExists) return res.status(404).send({ message: 'Product not found' });
    const checkCartItem = (callback) => {
      db.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',[cartId, itemId], (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows.length === 0 ? null : rows);
      });
    };
    let cartItemExists;
    await new Promise((resolve, reject) => {
      checkCartItem((error, data) => {
        if (error) {
          return reject(error);
        }
        cartItemExists = data;
        resolve();
      });
    });
    if(cartItemExists){
      db.query('UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?', [quantity , cartItemExists[0].cart_item_id], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: 'Internal server error' });
        }
        res.status(200).send({ message: 'Item added to cart successfully' });
      });
    }
    else{
    // 5. Add item to cart (assuming no existing entry for this product)
    db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cartId, itemId, quantity], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error' });
      }
      res.status(200).send({ message: 'Item added to cart successfully' });
    });}
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/getcart',async (req, res)=>{
  console.log("request coming ")
  const token = req.headers['auth-token'];
  if (!token) return res.status(401).send({ message: 'Unauthorized: Missing auth token' });

  try {
    const decoded = jwt.verify(token, "mysupersecretpassword"); // Replace with your secret
    const customerId = decoded.id;
    const findCartId = (callback) => {
      db.query('SELECT cart_id FROM Cart WHERE customer_id = ?', [customerId], (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows.length === 0 ? null : rows[0].cart_id);
      });
    };
    let cartId;
    await new Promise((resolve, reject) => {
      findCartId((error, id) => {
        if (error) {
          return reject(error);
        }
        cartId = id;
        resolve();
      });
    });
    if (!cartId) {
      // Create a new cart if customer doesn't have one
      const createCart = (callback) => {
        db.query('INSERT INTO Cart (customer_id, cart_name) VALUES (?, ?)', [customerId, 'My Cart'], (err, result) => {
          if (err) {
            return callback(err);
          }
          callback(null, result.cart_id);
        });
      };

      await new Promise((resolve, reject) => {
        createCart((error, id) => {
          if (error) {
            return reject(error);
          }
          cartId = id;
          resolve();
        });
      });
    }

    db.query('select * from  cart_items where cart_id = ?', [cartId], (err,results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})

app.post('/removefromcart',async (req, res)=>{
  console.log("request coming for removal  ")
  const token = req.headers['auth-token'];
  if (!token) return res.status(401).send({ message: 'Unauthorized: Missing auth token' });

  try {
    const decoded = jwt.verify(token, "mysupersecretpassword"); // Replace with your secret
    const customerId = decoded.id;
    const findCartId = (callback) => {
      db.query('SELECT cart_id FROM Cart WHERE customer_id = ?', [customerId], (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows.length === 0 ? null : rows[0].cart_id);
      });
    };
    let cartId;
    await new Promise((resolve, reject) => {
      findCartId((error, id) => {
        if (error) {
          return reject(error);
        }
        cartId = id;
        resolve();
      });
    });
    const { itemId } = req.body;
    if (!itemId) return res.status(400).send({ message: 'Missing item ID in request body' });

    db.query('delete from  cart_items where product_id = ? and cart_id = ?', [itemId , cartId], (err,results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
