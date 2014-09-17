var tessel = require('tessel');
var fs = require('fs');
var tessel = require('tessel');
var PIR = require('./node_modules/pir/index');

var audio = require('audio-vs1053b').use(tessel.port['A']); // Replace '../' with 'audio-vs1053b' in your own code

var pir = PIR.use(tessel.port['GPIO'].pin['G3']);

var audioFile = 'master.mp3';


pir.on('ready', function (pir) {
  console.log('Ready and waiting...');
  pir.on('movement', function (time) {
    console.log('Something moved! Time ' + time);
  	// Wait for the module to connect
	setImmediate(playSound());
	
  });
  pir.on('stillness', function (time) {
    console.log('All is still. Time ' + time);
  });
});

pir.on('error', function (err) {
  console.log(err);
});

audio.on('ready', function() {
  console.log("Audio module connected! Setting volume...");
  // Set the volume in decibels. Around 20 is good; smaller is louder.
  audio.setVolume(10, function(err) {
    if (err) {
      return console.log(err);
    }
    
  });
});

function playSound() {
	// Get the song
    console.log('Retrieving file...');
    var song = fs.readFileSync(audioFile);
    // Play the song
    console.log('Playing ' + audioFile + '...');
    audio.play(song, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Done playing', audioFile);
      }
    });
}



// If there is an error, report it
audio.on('error', function(err) {
  console.log(err);
});