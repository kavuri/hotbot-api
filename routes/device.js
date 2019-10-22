/* Copyright (C) Kamamishu Pvt. Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

/*
 * This handler will be used while onboarding a device into Kamamishu
 * When the device is registered, the hotel/Kamamishu can ask for the device
 * to setup, during which time this handler will be invoked and the device
 * will be registered in the database
 */

 'use strict';
 var express = require('express');
 var router = express.Router();

 const DeviceModel = require('../../src/db').DeviceModel,
       _ = require('lodash'),
       { check, validationResult } = require('express-validator');

router.get('/', function(req, res) {
    console.log('get /device');
    res.send('get /device');
});

router.post('/', [
    check('device_id').exists(),
    check('hotel_id').exists(),
    check('user_id').exists(),
    check('room').exists(),
    check('coordinates').exists(),
    check('address').exists(),
    check('status').exists()
], async function(req, res, next) {
    
    try {
        validationResult(req).throw();
    } catch (error) {
        return res.status(422).send(error);
    }
console.log(req.body.device_id);
    try {
        let device = new DeviceModel({
            device_id: req.body.device_id,
            hotel_id: req.body.hotel_id,
            user_id: req.body.user_id,
            room: req.body.room,
            address: req.body.address,
            coordinates: req.body.coordinates,
            status: req.body.status
        });

        console.log('==device=',device)
        let result = await device.save();
        console.log('@@@',result)
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;