const express = require('express');

const getIndex = (req,res)=>{
    res.render('index');
};

module.exports = getIndex;