# Evenin' [![npm version](https://badge.fury.io/js/evenin.svg)](https://badge.fury.io/js/evenin)
> Detect, search and list general greetings for a large amount of languages.

## Install

```
$ npm install --save evenin
```

## Usage

```js
const greetings = require("evenin");

// Check if a string contains a greeting:
greetings.hasGreeting("Hello, world!");
//=> true
greetings.hasGreeting("Goodbye, world!");
//=> false

// Check if a string _is_ a greeting:
greetings.isGreeting("hello");
//=> true
greetings.isGreeting("goodbye");
//=> false

// Look up a specific greeting across all languages:
greetings.findGreetings("hello");
//=> [ { phrase: 'Hello',
//     explanation: 'formal greeting',
//     language:
//      { name: 'English',
//        url: 'http://www-01.sil.org/iso639-3/documentation.asp?id=eng',
//        location: 'United Kingdom, United States of America, Canada, Australia, various other countries.',
//        greetings: [Array] } },
//   { phrase: 'Hello',
//     explanation: 'general greeting',
//     language:
//      { name: 'Guyanese Creole',
//        url: 'http://www-01.sil.org/iso639-3/documentation.asp?id=gyn',
//        location: 'Guyana.',
//        greetings: [Array] } },
//   { phrase: 'Hello',
//     explanation: 'general greeting',
//     language:
//      { name: 'Malay, Central',
//        url: 'http://www-01.sil.org/iso639-3/documentation.asp?id=pse',
//        location: 'Indonesia: Sumatra.',
//        greetings: [Array] } } ]

// Look up all greetings starting with the specified prefix:
greetings.findGreetings("g'");
//=> [ { phrase: 'G\'day',
//     explanation: 'general greeting used in some parts of Australia [eng-aus]',
//     language:
//      { name: 'English',
//        url: 'http://www-01.sil.org/iso639-3/documentation.asp?id=eng',
//        location: 'United Kingdom, United States of America, Canada, Australia, various other countries.',
//        greetings: [Array] } } ]

// Find information on a language and all greetings logged for that language:
greetings.getLanguage("english");
//=> { name: 'English',
//   url: 'http://www-01.sil.org/iso639-3/documentation.asp?id=eng',
//   location: 'United Kingdom, United States of America, Canada, Australia, various other countries.',
//   greetings:
//    [ { phrase: 'Hello', explanation: 'formal greeting' },
//      { phrase: 'Hi', explanation: 'informal greeting' },
//      ...
//    ] }
```

## Disclaimer

This project is largely a joke and hasn't really been tested. If you run into a problem, feel free to make an issue though. I'd be interested to see if people have an actual use for this. All the greetings are from [Jennifer's Language Page](http://users.elite.net/runner/jennifers/index.htm#International) which is honestly an amazing resource.

## License

MIT © [Thijs Molendijk (molenzwiebel)](http://github.com/molenzwiebel)