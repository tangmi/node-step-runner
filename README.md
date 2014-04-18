# node-step-runner (`srun`)

define atomic steps, then build scripts with them. a global context object between steps is included for you!

mind you, this runner is pretty opinionated

### Why not grunt?

grunt is hella confusing

## Usage

### CLI usage

run scripts with:

```sh
srun --script=<scriptname> [--verbose]

# e.g. srun --script=postpublish # runs ./scripts/postpublish.js
```

### steps

steps are individual actions of a script and go in `./lib/steps`.

```js
module.exports = {
    // the pretty/formatted name of the step, only used for display
    name: 'Hello Step',

    // a description of your step, used to help clients understand
    // what it does and its sideeffects
    description: 'Says hello',
    
    options: {
        // define options here so people don't have to look through
        // your code to find them. `step-runner` will handle extracting
        // and validating the presence of all the options
        'name': 'Name to say hello to'
    },

    // the action function is given an options parameter and a callback
    action: function(opt, cb) {
        // use the options defined above (given a client has provided them)
        // form the `opt` parameter
        console.log('Hello %s!', opt.name);
        cb();
    }
}
```

### Scripts

scripts go in `./scripts` and call steps with `./lib/step-runner.js`.

```js
var StepRunner = require('../lib/step-runner');

module.exports = function(cb) {
    var stepRunner = new StepRunner({
        verbose: this.verbose
    });
    
    // you could alternately use promises to control flow
    stepRunner.runStep('increment-version', {
        packagePath: __dirname + '/../package.json'
    }, function() {
        stepRunner.runStep('git-add', {
            files: ['package.json']
        }, function() {
            stepRunner.runStep('git-commit', {
                commitMessage: 'Release ' + this['increment-version'].oldVersion,
            }, function() {
                cb();
            });
        });
    });
}
```

## Global context

when a step runs, it gets a context of `this[stepName]`, where `this` is the context of the `step-runner` callbacks and `stepName` is the name of the step based on the filename. thus, you can set values onto the context and access them in your script to configure later steps:

```js
// ./lib/steps/number-maker.js
module.exports = {
    name: 'Number Maker',
    description: 'Adds a random number to the context',
    options: {},
    action: function(opt, cb) {
        // setting `this[something]` in a step will make it available in your script later
        this.number = Math.random() * 1000;
    }
}
```

then:

```js
stepRunner.runStep('number-maker', {}, function() {
    // access the context values in your script:
    console.log('give me a number... %s', this['number-maker'].number);
    
    // say some other step needs a number to configure...
    stepRunner.runStep('something-else', {
        'number-input': this['number-maker'].number
    }, function() {
        // the context can be accessed later, as well
        console.log('i still have this number: %s!', this['number-maker'].number);
        // ... do something
    });
});
```

## Using with `npm postpublish`

i made this with the mindset of easily importing my `postpublish` script into my `package.json` file:

```
npm install srun --save-dev
```

add to `package.json`

```
...
"scripts": {
    "postpublish": "./node_modules/.bin/srun --script=postpublish"
}
...
```

every time your `npm publish` your module, the patch number will increment by one and you will get a git commit notifying of the release. neato!