'use strict';
var mqtt = require('mqtt');

let publisher = {};
let baseTopic = "data";

publisher.mqttIP = null;
publisher.topic = 'data';

var mqttClient;

publisher.init = function()
{
  console.log('MQTT broker ip [pub] : ' + publisher.mqttIP);

  mqttClient = mqtt.connect('mqtt://' + publisher.mqttIP);
  console.log('publisher initialized');

  mqttClient.on('connect', () =>
  {
    //console.log('MQTT Connected - publisher - ' + publisher.topic + '/' + publisher.subtopic);
    console.log('MQTT Connected - publisher - ' + publisher.topic);
  });

  mqttClient.on('error', (err) => {
    console.log('MQTT connect error - publisher -' + err);
  });
}

publisher.publish = (dataArray, subtopic) => {
  var topic = publisher.topic;
  if (subtopic)
  {
      topic = topic + '/' + subtopic;
  }
  mqttClient.publish(topic, JSON.stringify(dataArray));
};

module.exports = publisher;
