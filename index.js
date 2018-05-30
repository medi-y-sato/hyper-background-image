const parse = require('parse-color');
const DEFAULT_COLOR = 'rgba(0, 0, 0, .6)';
const DEFAULT_OPACITY = .6;

function getCSS(config) {
  var file = getRandomFile(config.backgroundImage.folder);
  var color = DEFAULT_COLOR;
  var color = getBackgroundColor(
    config.backgroundColor,
    config.backgroundImage.colorOpacity
  );

  var position = config.backgroundImage.position ? config.backgroundImage.position : "center";
  var size = config.backgroundImage.size ? config.backgroundImage.size : "contain";
  var repeat = config.backgroundImage.repeat ? config.backgroundImage.repeat : "no-repeat";
  
  return `
    ${config.css || ''}
    .terms_terms {
      background-image: url("file://${file}");
      background-position: ${position};
      background-size: ${size};
      background-repeat: ${repeat};
    }
    .terms_termGroup {
      background: ${color} !important
    }
  `;
}

function getRandomFile(dir) {
  var files = require('fs')
    .readdirSync(dir)
    .filter(name => name.match(/[.jpg|.png|.gif]$/i));

  var i = Math.floor(Math.random() * files.length);
  return dir + '/' + files[i];
}


function getBackgroundColor(color, opacity = DEFAULT_OPACITY) {
  if (!color) return DEFAULT_COLOR;
  var { rgb } = parse(color);
  return rgb ? `rgba(${rgb.join(', ')}, ${opacity})` : color;
}

module.exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    css: getCSS(config)
  });
}
