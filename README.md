[Web Toolkit](http://skyglobal.github.io/web-toolkit/) [![Build Status](https://circleci.com/gh/skyglobal/web-toolkit.png?circle-token=24eeba25d7352dec038ea9fa25b22671ba28be5e)](https://circleci.com/gh/skyglobal/web-toolkit) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
========================

> Sky branded CSS, JavaScript utilities, and UI components

The project contains the code to generate the toolkit itself and the [demo site](http://skyglobal.github.io/web-toolkit/).

## Getting started

### Prerequisites

To build the toolkit locally, you'll need to install:
 * [ruby](https://www.ruby-lang.org/) (version 1.9.3 or later),
 * [node.js](http://nodejs.org),
 * [npm](https://www.npmjs.org),
 * [grunt cli](http://gruntjs.com/getting-started),
 * [Bundler](http://bundler.io)

### Setup

Clone the repository and install the dependencies

```bash
git clone https://github.com/skyglobal/web-toolkit.git
cd web-toolkit
git add remote upstream https://github.com/skyglobal/web-toolkit.git
npm install
bundle install
```

### Building/Running the Toolkit

 * `grunt server` : Grunt will spin up the Jekyll server, watch for code changes and rebuild on the fly.
 * `grunt server --beautify` : To help when debugging.
 * `grunt test` : Runs the unit tests
 * `grunt fonts` : Only needed to rebuild the Icon Fonts (skycons).

For more details about the available commands please see [grunt/README.md](./grunt#web-toolkit-grunt)

## Code overview

The repository contains two main components; the Web Toolkit and the demo site.

*  Sass files are in `grunt/sass` and compiled output is saved into `dist/stylesheets`
*  JavaScript code is in `grunt/js` and contains four modules which are output to `dist/scripts`
  *  `toolkit` contains the JS utilities and toolkit UI components code
  *  `demo` provides demo support for the website
  *  `changes` provides support for the changes page of the website
  *  `testIframe` provides support for running unit tests online on the website
 * HTML files are in `_includes`
*  Skycons are in the `static/font-svgs` and minified into `grunt/fronts/min`.

### Complete file structure

    $ tree
    .
    ├── _includes       => Source code for the toolkit documentation. Your demo html goes here
    │   └── allIncludes.html => a single file referencing all includes. used for demo and test page
    ├── _layouts        => layout for the index and test html pages
    ├── _site           => content generated by Jekyll
    ├── dist            => content generated by Grunt
    ├── grunt           => dev area for source code. get stuck in
    │   ├── fonts       => templates used to generate the font icons (skycons)
    │   ├── icons       => icons that are multi coloured and used within scss for spriting (not yet converted to svg's)
    │   ├── js          => place for source JS files
    │   ├── sass        => place for source SCSS files
    │   └── svgs        => retina ready multi-coloured icons.
    ├── node_modules    => npm plugins
    ├── static          => home of the unchanging and non-generated code
    │   ├── deprecated  => code moved from the masthead project
    │   ├── font-svgs   => src svg files used to generate font icons (skycons)
    │   ├── fonts       => Sky Text Fonts
    │   ├── images      => images not for spriting
    │   ├── lib         => untouched third-party files
    |   └── wiki-images => images used for demos in the wiki
    ├── test
    │   ├── libararies  => Third-party src files for testing
    │   ├── specs       => place for *-spec.js files
    │   ├── screenshots
    │   ├── config.js   => RequireJS and Mocha config file
    │   └── runner.js   => explitly call each spec file for `grunt test` to run
    ├── config.yml      => Jekyll config file
    ├── changes.html    => Page for users to see changes between toolkit version
    ├── circle.yml      => CircleCI config file
    ├── gemfile
    ├── gruntfile.js    => grunt config file
    ├── index.html      => Main demo page
    ├── package.json    => NodeJS config file, includes version number for toolkit
    ├── rakefile        => build script
    ├── test.html       => used by `grunt test` to run all tests at once
    └── README.md


## Versioning and Releases

See [RELEASING.md](RELEASING.md)

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
