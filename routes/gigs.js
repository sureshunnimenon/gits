const express = require('express')

const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

const sequelize = require('sequelize')

const Op = sequelize.Op;
// get end point (SHOW) 

router.get('/', (req,res) => Gig.findAll()
    .then(gigs => {//console.log(gigs)
                //    res.sendStatus(200)
                    res.render('gigs', {gigs: gigs})})
    .catch(err => console.log(err))
);

// display add gig form

router.get('/add', (req,res) => res.render('add'));

// Add a Gig
router.post('/add', (req,res) => {
    // const data = {
    //     title: "Simple wordpress website",
    //     technology: 'PHP,HTML,CSS,Javascript',
    //     budget: "$500",
    //     description: "blah blah blah.. should be initiative.. should be leader. should have good HRNL skills",
    //     contactemail: "user1@gmail.com"
    // }

    let {title, technology, budget, description,contactemail } = req.body;
    let errors = [];

    // contactemail = contactemail.toLowerCase();
    console.log(title)

    if (!title){
        errors.push({text: "Please add a title"})
    }

    if (!technology){
        errors.push({text: "Please add one or more technology stacks required for the gig"})
    }

    if (!description){
        errors.push({text: "Please add brief description of the work"})
    }

    if (!contactemail){
        errors.push({text: "Please add email to contact the user"})
    }

    technology = technology.toLowerCase();

    // check errors

    if(errors.length>0){
        res.render('add', (req,res)=> {
            errors,
            title,
            technology,
            budget,
            description,
            contactemail
        });
        console.log(errors);
    }
    else
    {
        if (!budget){
            budget = 'unknown';
        }
        else {
            budget = `${budget}`;
        }
    }   


    //insert into table
    {    
    Gig.create({
            title: title,
            technology: technology, 
            budget: budget,
            description: description,
            contactemail: contactemail
        }).then(gig => res.redirect('/gigs')).catch(err => console.log(err))
    }    
 })

//  search for gigs

router.get('/search', (req,res) => {
    const {term} = req.query;
    Gig.findAll({ where : { technology: { [Op.like]: '%' + term + '%'}}})
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err))
})

module.exports = router