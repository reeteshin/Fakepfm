const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();
dotenv.config()
app.use(express.json());
var port = process.env.PORT || 3000;
const connect = () => {
    return mongoose.connect(process.env.MONGO_URL);
};

const TransactionSchema = new mongoose.Schema({
    AccountTransactionID: { type: Number},
    TransactionID: { type: String },
    TransactionAmount: { type: Number},
    LinkedAccountID: { type: Number},
    MCCCodeID:{ type: Number} ,
    ActiveFlag: { type: Number},
    TransactionCurrencyCodeID: { type: Number},
    TransactionModeID: {type:Boolean},    
    CategoryID: { type: Number},
    MerchantID: { type: Number},
    TransactionType: { type: String},
    NotAExpense: { type: Number},
    BalanceAmount: { type: Number},
    Destination_Currency: { type: Number},
    CurrencyCodeID: { type: Number},
    AccountNumber: { type: Number},
    BankID: { type: Number},
    Narration: { type: String},
    TransactionReferenceNumber: { type: String},
    CategorizedFlag: { type: Boolean},
}, {
    versionKey: false,
    timestamps: true
});
const Transction = mongoose.model("synthetic_data", TransactionSchema);


const CategorySchema = new mongoose.Schema({
    
        EXPENSE_CATEGORY_ID: Number,
        ACTIVE_FLAG: Boolean,
        EXPENSE_CATEGORY: String,
        ICON: String,
        IMAGE: String,
        MEMORY_ENABLE: Number,
        KEYWORDS: String
       
}, {
    versionKey: false,
    timestamps: true
});
const Category = mongoose.model("catexp", CategorySchema);
//63 - 101 EXPENSE_CATEGORY_ID RANGE
app.get('/categ', async(req,res)=>{
    const categ = await Category.find()
    return res.send(categ)
})
app.get('/categss', async(req,res)=>{
    const categ = await Category.find({ "EXPENSE_CATEGORY": "Hotel"})
    return res.send(categ)
})

app.post('/transcation', async (req, res) => {
    const transc = await Transction.create(req.body);
    return res.send(transc);
});

app.post('/catexp', async (req, res) => {
    const transc = await Category.create(req.body);
    return res.send(transc);
});

app.get('/transcation', async (req, res) => {
    const transc = await Transction.find()
    return res.send(transc);
});
app.listen(port, async () => {
    await connect().then((ans) => {

        console.log("Connected Successful");
    })
        .catch((err) => {
            console.log("Error in the Connection");
        })

    console.log("Port",port);
});
