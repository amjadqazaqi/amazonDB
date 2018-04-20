
var mysql = require('mysql');
var prompt = require('prompt');

var inputString = process.argv;
var rquested = 0;
var globaltotal = 0;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '079978285_Amjd',
    database: 'bamazon'

});


choice = process.argv[2];
search_item = process.argv[3];
quantity = process.argv[4];

salepoint();




function salepoint() {

    if (choice === 'view.all') {
        connection.connect((error) => {
            if (error) throw error
            console.log('connected as ', connection.threadId)
            var sqlquery = "select * from products"
            connection.query(sqlquery, (error, response) => {
                if (error) throw error
                console.log("NAME" + "\t" + "\t" + "PRICE" + "\t" + "\t" + "QUANTITY")
                for (var key in response) {
                    console.log(response[key].product_name + "\t" + "\t" + response[key].price + " $" + "\t" + "\t" + response[key].stock_quantity);
                }

            })
            connection.end()
        })
    }

    if (choice === 'order') {
        var availableq = 0;
        var unitprice = 0;
        prompt.start();
        prompt.get(['ItemName', 'Quantity'], function (err, result) {
            if (err) { return onErr(err); }

            var frmuseritm = result.ItemName
            var frmuserqu = parseInt(result.Quantity)



            connection.connect((error) => {
                if (error) throw error
                // console.log('connected as ', connection.threadId)
                var sqlquery = "select * from products where product_name = " + "'" + frmuseritm + "'";
                connection.query(sqlquery, (error, response) => {
                    if (error) throw error

                    availableq = response[0].stock_quantity;
                    unitprice = response[0].price;
                    // console.log(availableq,unitprice)
                    if (frmuserqu <= availableq) {
                        var orderquery = " update products set stock_quantity =" + (availableq - frmuserqu) + " where product_name = '" + frmuseritm + "';"
                        connection.query(orderquery, (error, response) => {
                            if (error) throw error
                            console.log("Your Order Submeted")
                            console.log("The Total Price is: " + unitprice * frmuserqu + " $")

                        })
                        connection.end()

                    } else {
                        console.log("The available stock is :" + availableq)
                        console.log("The available stock is not enough for your order")
                        connection.end()
                    }

                })
            })
        })
    }
    if (choice === 'search') {
        var availableq = 0;
        var unitprice = 0;
        prompt.start();
        prompt.get(['ItemName'], function (err, result) {
            if (err) { return onErr(err); }

            var frmuseritm = result.ItemName
            connection.connect((error) => {
                if (error) throw error
                //  console.log('connected as ', connection.threadId)
                var sqlquery = "select * from products where product_name = " + "'" + frmuseritm + "'";
                connection.query(sqlquery, (error, response) => {
                    if (error) throw error
                    //  console.log(response[0].price)
                    console.log("NAME" + "\t" + "\t" + "PRICE" + "\t" + "\t" + "QUANTITY")
                    for (var key in response) {
                        console.log(response[key].product_name + "\t" + "\t" + response[key].price + " $" + "\t" + "\t" + response[key].stock_quantity);
                    }

                })
                connection.end()
            })
        })
    }


    if (choice === 'manage') {

        var sqlquery1 = "";
        prompt.start();
        console.log("please enter your choice :")
        prompt.get(['choice'], function (err, result) {

            var managchioce = result.choice;
            if (managchioce === 'update') {
                var availableq = 0;

                prompt.start();
                prompt.get(['ItemName', 'Quantity'], function (err, result) {
                    if (err) { return onErr(err); }

                    var frmuseritm = result.ItemName
                    var frmuserqu = parseInt(result.Quantity)



                    connection.connect((error) => {
                        if (error) throw error
                        // console.log('connected as ', connection.threadId)
                        var sqlquery = "select * from products where product_name = " + "'" + frmuseritm + "'";
                        connection.query(sqlquery, (error, response) => {
                            if (error) throw error

                            availableq = response[0].stock_quantity;
                            unitprice = response[0].price;

                           
                                var orderquery = " update products set stock_quantity =" + (availableq + frmuserqu) + " where product_name = '" + frmuseritm + "';"
                                connection.query(orderquery, (error, response) => {
                                    if (error) throw error
                                    
                                    console.log("the quantity of product :" + frmuseritm  +" updated ")

                                })
                                connection.end()

                            

                        })
                    })
                })



            }
            if (managchioce === 'low') {
                sqlquery1 = "select * from products where stock_quantity <= 5"
                doit(1, sqlquery1, 0)

            }
            if (managchioce === 'high') {
                sqlquery1 = "select * from products where stock_quantity >= 50"
                doit(1, sqlquery1, 0)

            }
            if (managchioce === 'new') {
                prompt.start();
                console.log("enter new product :")
                prompt.get(['Name', 'price', 'quantity', 'departmentID'], function (err, result) {

                    sqlquery1 = "INSERT INTO products (product_name,price,stock_quantity,department_id) VALUES ('" + result.Name + "'," + result.price + " ," + result.quantity + " ," + result.departmentID + ");"
                    doit(3, sqlquery1, 0)

                })

            }

        })

    }
   


    function doit(choice1, querty0, added) {
        if (choice1 === 1) {

            connection.connect((error) => {
                if (error) throw error
                //  console.log('connected as ', connection.threadId)

                connection.query(querty0, (error, response) => {
                    if (error) throw error

                    console.log("NAME" + "\t" + "\t" + "PRICE" + "\t" + "\t" + "QUANTITY")
                    for (var key in response) {
                        console.log(response[key].product_name + "\t" + "\t" + response[key].price + " $" + "\t" + "\t" + response[key].stock_quantity);
                    }

                })
                connection.end()
            })


        }
       
        if (choice1 === 3) {


            connection.connect((error) => {
                if (error) throw error

                connection.query(querty0, (error, response) => {
                    if (error) throw error


                })

                connection.end()

            })

        }
    }

}



