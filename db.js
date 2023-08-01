const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.DATABASE;
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err);
        else {
            console.log('Connected to the database!');
            const fetchData = await mongoose.connection.db.collection("food_items");
            fetchData.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_category = catData;
                        global.food_items = data;
                    }
                })
                // if (err) console.log(err);
                // else{
                //     global.food_items = data;
                //     // console.log(global.food_items);
                // }
            })
        }
    });
}

module.exports = mongoDB;