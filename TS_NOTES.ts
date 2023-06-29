// ENUMS
//
// enums written like this compile as a weird object
enum LOG_LEVEL_1  {
  DEBUG,
  WARNING,
  ERROR,
}

// it's better to write it with explicit assignment, but you cannot use
// the string as a parameter in a function.
enum LOG_LEVEL_2  {
  DEBUG = 'Debug',
  WARNING = 'Warning',
  ERROR = 'Error',
}

// best way to do it is this...
// as per YT videoh ttps://www.youtube.com/watch?v=jjMbPt_H3RQ

const LOG_LEVEL_3 = {
  DEBUG: 'Debug',
  WARNING: 'Warning',
  ERROR: 'Error',
} as const;

type LogLevel = keyof typeof LOG_LEVEL_3;

// and can be used thus

function log(message: string, level: LogLevel) {
  console.log(message, level);
}

log('the message', 'ERROR');
