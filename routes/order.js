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
var graphqlHttp = require('express-graphql');
var {buildSchema} = require('graphql');

class GuestOrderOutput {
    constructor(o_id, hotel_id, user_id, room_no, o_items, o_time, o_status, o_priority) {
        this.o_id = o_id;
        this.hotel_id = hotel_id;
        this.user_id = user_id;
        this.room_no = room_no;
        this.o_items = o_items;
        this.o_time = o_time;
        this.o_status = o_status;
        this.o_priority = o_priority;
    }
}

var resolvers = {
    orders: (hotel_id) => {
        return [{"o_id":1,"o_time":"abc", "o_status":"new", "o_priority":"asap"}];
    },

    createOrder: (hotel_id, user_id, room_no, o_items, o_time, o_status, o_priority) => {
        // return {hotel_id: hotel_id, user_id: user_id, o_id: o_id, room_no: room_no, o_items: o_items, o_time: o_time, o_status: o_status, o_priority: o_priority};
        var o_id = require('crypto').randomBytes(10).toString('hex');
        // return new GuestOrderOutput(o_id, hotel_id, user_id, room_no, o_items, o_time, o_status, o_priority);
        return o_id;
    }
}

var schema = buildSchema(require('fs').readFileSync('./schema.graphql', 'utf8'));

module.exports = graphqlHttp(
    {
        schema: schema, 
        rootValue: resolvers,
        graphiql: true
    }
);