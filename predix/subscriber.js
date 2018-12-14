'use strict';
var mqtt = require('mqtt');
const EventEmitter = require('events');

let subscriber = {};
subscriber.mqttIP = null;
subscriber.topic = 'data/#';

class SubEmitter extends EventEmitter {}
subscriber.subEmitter = new SubEmitter();

subscriber.init = function()
{
  console.log('MQTT broker ip [sub] : ' + subscriber.mqttIP);

  const mqttClient = mqtt.connect('mqtt://' + subscriber.mqttIP);
  console.log('subscriber initialized');

  mqttClient.on('connect', () =>
  {
    mqttClient.subscribe(subscriber.topic);
    console.log('MQTT Connected - subscriber - ' + subscriber.topic);
  });

  mqttClient.on('message', (topic, message) =>
  {
    //console.log(message);
    subscriber.subEmitter.emit('log', message);
  });
}

module.exports = subscriber;
