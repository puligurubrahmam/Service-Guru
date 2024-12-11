const express = require('express');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3')
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dBpath = path.join(__dirname,'argon.db');
const app = express();
app.use(express.json());
app.use(cors());
let db = null;
const PORT = process.env.PORT || 5000;
const InitializeServerAndDatabase = async ()=>
{
    try
    {
        db = await open({
            filename:dBpath,
            driver:sqlite3.Database,
        })
        
        app.listen(PORT,()=>
        {
            console.log("Server is running at http://localhost:5000......")
        })
    }
    catch(e)
    {
        console.log(`Database error : ${e}`)
        process.exit(1)
    }
}
InitializeServerAndDatabase();

//User Registration API
app.post("/register",async (req,res)=>
{
    const {email,password} = req.body;
    const isValidEmail = (email) => {
        if (!email.includes('@') || !email.includes('.')) return false;

        const parts = email.split('@');
        if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) return false;

        const domainParts = parts[1].split('.');
        if (domainParts.length < 2 || domainParts.some(part => part.length === 0)) return false;

        return true;
    };
    const hasUppercase = [...password].some(char => char >= 'A' && char <= 'Z');
    const hasLowercase = [...password].some(char => char >= 'a' && char <= 'z');
    const hasDigit = [...password].some(char => char >= '0' && char <= '9');
    const hasSpecialChar = [...password].some(char => ['@', '$', '!', '%', '*', '?', '&'].includes(char));
    const isLongEnough = password.length >= 8;

    if (!isValidEmail(email)) {
        return res.status(400).send({
            error: 'Invalid email format. Please enter a valid email address.',
        });
    }

    if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar || !isLongEnough) {
        return res.status(400).send({
            error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        });
    }
    try{
    const hashedPassword = await bcrypt.hash(password,10);
    const selectUserQuery = `
        SELECT * FROM users WHERE email='${email}';
    ` ;
    const dbuser = await db.get(selectUserQuery);
    if(dbuser=== undefined)
    {
        const insertUserQuery = `
            INSERT INTO users(email,password_hash) VALUES(
            '${email}',
            '${hashedPassword}'
            );
        `;
        await db.run(insertUserQuery);
        res.status(200).send({success:"User Added Succesfully"});
    }
    else{
        res.status(400).send({error:"Bad Request"});
    }
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ error: "Internal server error" });
    }
})

//User Login API

app.post("/login",async (req,res)=>
{
    try{
    const {email,password} = req.body;
    const selectUserQuery = `
        SELECT * FROM users WHERE email = '${email}';
    `;
    const dbuser = await db.get(selectUserQuery);
    if(dbuser===undefined)
    {
        res.status(400);
        res.send({error:"Invalid User"});
    }
    else
    {
        if (!password || !dbuser.password_hash) {
            return res.status(400).send('Invalid input');
        }
        const isPasswordCorrect = await bcrypt.compare(password,dbuser.password_hash);
        if(isPasswordCorrect===true)
        {
            const payload = {email:email};
            const jwtToken = jwt.sign(payload,"secret_user");
            res.send({jwtToken});
        }
        else
        {
            res.status(400);
            res.send({error:"Incorrect Password"});
        }
    }
    }
    catch (error) {
        console.error("Error during Login:", error);
        res.status(500).send({ error: "Internal server error" });
    }
})

//Worker Registration API

app.post("/bizregister",async (req,res)=>
    {
        const {email,password,name,specialization,description,mobile,location} = req.body;
        const isValidEmail = (email) => {
        if (!email.includes('@') || !email.includes('.')) return false;

        const parts = email.split('@');
        if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) return false;

        const domainParts = parts[1].split('.');
        if (domainParts.length < 2 || domainParts.some(part => part.length === 0)) return false;

        return true;
    };
    const hasUppercase = [...password].some(char => char >= 'A' && char <= 'Z');
    const hasLowercase = [...password].some(char => char >= 'a' && char <= 'z');
    const hasDigit = [...password].some(char => char >= '0' && char <= '9');
    const hasSpecialChar = [...password].some(char => ['@', '$', '!', '%', '*', '?', '&'].includes(char));
    const isLongEnough = password.length >= 8;

    if (!isValidEmail(email)) {
        return res.status(400).send({
            error: 'Invalid email format. Please enter a valid email address.',
        });
    }

    if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar || !isLongEnough) {
        return res.status(400).send({
            error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        });
    }
        try{
        const hashedPassword = await bcrypt.hash(password,10);
        const selectUserQuery = `
            SELECT * FROM workers WHERE email='${email}';
        ` ;
        const dbuser = await db.get(selectUserQuery);
        if(dbuser=== undefined)
        {
            const insertUserQuery = `
                INSERT INTO workers (email,password_hash,name,specialization,description,mobile,location) VALUES(
                '${email}',
                '${hashedPassword}',
                '${name}',
                '${specialization}',
                '${description}',
                '${mobile}',
                '${location}'
                );
            `;
            await db.run(insertUserQuery);
            res.status(200).send({success:"User Added Successfully"})
        }
        else{
            res.status(400).send({error:"Bad Request"});
        }
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ error: "Internal server error" });
    }
    })

    //Workers Login API

    app.post("/bizlogin",async (req,res)=>
        {
            try{
            const {email,password} = req.body;
            const selectUserQuery = `
                SELECT * FROM workers WHERE email = '${email}';
            `;
            const dbuser = await db.get(selectUserQuery);
            if(dbuser===undefined)
            {
                res.status(400);
                res.send("Invalid User");
            }
            else
            {
                if (!password || !dbuser.password_hash) {
                    return res.status(400).send('Invalid input');
                }
                const isPasswordCorrect = await bcrypt.compare(password,dbuser.password_hash);
                if(isPasswordCorrect===true)
                {
                    const payload = {email:email};
                    const jwtToken = jwt.sign(payload,"secret_user");
                    res.send({jwtToken});
                }
                else
                {
                    res.status(400);
                    res.send({error:"Incorrect Password"});
                }
            }
            }
            catch (error) {
                console.error("Error during Login:", error);
                res.status(500).send({ error: "Internal server error" });
            }
        })

//Fetching Technician By Location

app.get("/location/:place",async (req,res)=>
{
    try{
    const {place} = req.params;
    const selectQuery = `
        SELECT name,specialization,description,mobile,location FROM workers WHERE location = '${place}';
    `;
    const employersList = await db.all(selectQuery);
    res.send(employersList);
    }
    catch (error) {
        console.error("Error during fetching details:", error);
        res.status(500).send({ error: "Internal server error" });
    }
})