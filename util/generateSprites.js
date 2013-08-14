var animations = {};

// Directions encoded order
var directions = [
  'n',  // 0
  'ne', // 1
  'e',  // 2
  'se', // 3 
  's',  // 4
  'sw', // 5 
  'w',  // 6
  'nw'  // 7
];

// Directions in alphabetical order
var directionsAlpha = [
  'e',
  'n',
  'ne',
  'nw',
  's',
  'se',
  'sw',
  'w'
];

var characters = {
  chicken: {
    size: 64,
    animations: {
      stopped: {
        frames: 1,
        start: 136
      },
      attacking: {
        start: 0,
        frames: 9
      },
      running: {
        start: 72,
        frames: 8
      },
      falling: {
        start: 144,
        frames: 7,
        repeat: false
      }
    }
  },
  dino: {
    size: 128,
    animations: {
      stopped: {
        frames: 1,
        start: 544
      },  
      running: {
        frames: 8,
        start: 480
      },
      attacking: {
        start: 0,
        frames: 13
      },
      hit: {
        start: 104,
        frames: 9
      },
      looking: {
        start: 176,
        frames: 13
      },
      paused: {
        start: 280,
        frames: 12
      },
      roaring: {
        start: 376,
        frames: 13
      },
      falling: {
        start: 552,
        frames: 11,
        repeat: false
      },
      walking: {
        start: 640,
        frames: 8
      }
    }
  }
};

var cssString = '';

// For each character animation
for (var character in characters) {
  var characterInfo = characters[character];

  // For each defined animation
  for (var animBaseName in characterInfo.animations) {
    var animInfo = characterInfo.animations[animBaseName];

    // In each of possible directions
    for (var i = 0; i < 8; i++) {
      // Get the direction string from the directions array in alpha order
      var direction = directionsAlpha[i];

      // Get the animation name
      var animNameShort = animBaseName+'-'+direction;
      var animName = character+'-'+animNameShort;

      if (animInfo.frames > 1) {
        // Create an array to hold sprite positions
        // Store it in the animations object
        var animArray = animations[animName] = [];

        // Build a string for the CSS keyframe
        var keyFrameString = '@-webkit-keyframes '+animName+' {\n';

        // Calculate the offset in the sprite based on the direction
        var directionOffset = i*animInfo.frames*characterInfo.size;

        // Calculate the offset for the first frame
        var xOffsetStart = (animInfo.start*characterInfo.size + directionOffset) * -1;
       
        // Calculate the offset in the sprite for the last frame
        var xOffsetEnd = xOffsetStart - (animInfo.frames-1)*characterInfo.size;

        keyFrameString += ' from { background-position: '+xOffsetStart+'px 0px; }\n';
        keyFrameString += ' to { background-position: '+xOffsetEnd+'px 0px; }\n';

        keyFrameString += '}\n';

        var repeatStr = '';
        if (animInfo.repeat !== false)
          repeatStr = 'infinite';
        
        // Indicate the number of steps() so CSS will step through the sprite correctly
        keyFrameString += '.'+character+'.'+animNameShort+' { -webkit-animation: '+animName+' '+repeatStr+' '+animInfo.frames*1/24+'s steps('+(animInfo.frames-1)+',end); }\n\n';

        cssString += keyFrameString;
      }
      else {
        var directionOffset = i*animInfo.frames*characterInfo.size;
        var xOffset = (animInfo.start*characterInfo.size + directionOffset) * -1;
        var classString = '.'+character+'.'+animNameShort+' { background-position: '+xOffset+'px 0px; }\n\n';

        cssString += classString;
      }
    }
  }
}

console.log(cssString);
