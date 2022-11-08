"use strict";
const express = require("express");
const productRouter = express.Router();
const { products } = require("../models/index");
const bearerAuth = require("../middleware/bearer.js");


productRouter.post("/addProduct", bearerAuth ,async  (req, res, next) => {
    console.log(req.user.id)
    req.body.userId =req.user.id
    try {
      let productRecord = await products.create(req.body);
      console.log(productRecord);
      
      res.status(201).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  productRouter.get("/products",async  (req, res, next) => {
    try {
      let productRecord = await products.get();
      console.log(productRecord);
      
      res.status(201).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  productRouter.get("/products/:id",async  (req, res, next) => {
    let id =req.params.id;
    try {
      let productRecord = await products.getById(id);
      console.log(productRecord);
      
      res.status(201).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  productRouter.delete("/oneProduct/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
    let id = req.params.id
    
    try {
      let productRecord = await products.delete(userId,realId,id);
        
      res.status(204).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  productRouter.put("/oneProduct/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = parseInt(req.params.userId)
    let realId =req.user.id
    let id = req.params.id
    let obj=req.body;
    console.log('realId: ',typeof realId);
    console.log('userId: ',typeof userId);
    if(userId===realId){

      try {
        let productRecord = await products.update(realId,id,obj);
        if(productRecord) {
          res.status(201).json(productRecord);
  
        }else{
          res.status(203).json({msg:"error in updateing recored"});
  
        }
      } catch (e) {
        next(e.message);
      }
    }else{
      res.status(404)
    }
  });
  productRouter.get("/oneProduct/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
    let id = req.params.id
    
    try {
      let productRecord = await products.getMyProducts(realId,userId,id);
        
      res.status(200).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  productRouter.get("/oneProduct/:userId", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
   
    
    try {
      let productRecord = await products.getMyProducts(realId,userId);
        
      res.status(200).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  module.exports =productRouter ;