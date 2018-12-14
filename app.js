var publisher = require('./predix/publisher');

publisher.mqttIP = '192.168.1.200';
publisher.topic = 'predix-timeseries';

var attributes = {"address":"opcua-//3.39.83.154-48010/opc.tcp/2/Demo.Dynamic.Scalar.Int32","datatype":"INTEGER","category":"REAL"};
var firstConnect = true;
var sampleRate = 5000;
var counter = 0;
try
{
  PushData = () =>
  {
    counter++;

    var timenow = Date.now();
    var output = [];
    for (var i=0;i<10;i++)
    {
      var row = {};
      row.name = 'tag_' + i;
      row.datapoints = [];
      for(var j=0;j<1000;j++)
      {
        var datapoint = []
        datapoint[0] = timenow - 1000 + j;
        datapoint[1] = counter;
        datapoint[2] = 3;
        row.datapoints.push(datapoint);
      }
      row.attributes = attributes;
      output.push(row);
    }
    //output = [{"name":"Test_Int32","datapoints":[[timenow,54321,3]],"attributes":{"address":"opcua-//3.39.83.154-48010/opc.tcp/2/Demo.Dynamic.Scalar.Int32","datatype":"INTEGER","category":"REAL"}}]

    return publisher.publish(output,null);
  }

  var Initialize = function()
  {
    publisher.init();
  };
  Initialize();

  var looper = function()
  {
    PushData();
    setTimeout(looper, sampleRate);
  }

  looper();
}
catch (e)
{
  console.log('SYSTEM ERROR');
  console.log(e);
}
finally
{

}
