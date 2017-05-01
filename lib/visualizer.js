'use strict';
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const R = require('ramda');

const utils = require('./utils');

class Visualizer {
  constructor(options) {
    options = R.defaultTo({}, options);
    this.screen = blessed.screen();
    // eslint-disable-next-line new-cap
    this.grid = new contrib.grid({rows: 1, cols: 1, screen: this.screen});
    this.mode = utils.setDefaultIfNotInSet('table', options.mode, ['table', 'bar']);
    this.order = utils.setDefaultIfNotInSet(null, options.order, ['desc', 'asc']);

    this.displayOptions = {
      label: `${utils.repeatString('\u2605', 3)} Dependencies stargazers count  ${utils.repeatString('\u2605', 3)}${utils.repeatSpace(3)}`
    };

    // eslint-disable-next-line no-unused-vars
    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => {
      return process.exit(0); // eslint-disable-line unicorn/no-process-exit
    });
  }

  renderTable(items) {
    const table = this.grid.set(0, 0, 1, 1, contrib.table, R.merge({
      keys: true,
      fg: 'white',
      selectedFg: 'orange',
      interactive: true,
      columnSpacing: 15,
      columnWidth: [25, 20]
    }, this.displayOptions));
    table.focus();
    table.setData({
      headers: [`${utils.repeatSpace(5)} Dependency`, 'Stargazers count'],
      data: items
    });
    this.screen.render();
  }

  renderBarChart(items) {
    if (items.length > 8) {
      this.showFrames(utils.groupsOf(8, items));
    } else {
      this.refreshBarChart(items);
    }
  }

  renderGauge(percent) {
    this.grid.set(0, 0, 1, 1, contrib.gauge, {percent, label: 'Preparing data...'});
    this.screen.render();
  }

  refreshBarChart(items) {
    const bar = this.grid.set(0, 0, 1, 1, contrib.bar, R.merge({
      barWidth: 14,
      barSpacing: 10,
      xOffset: 4,
      maxHeight: 30
    }, this.displayOptions));

    bar.setData({
      titles: R.map(
        R.compose(R.when(
          R.propSatisfies(R.gt(R.__, 15), 'length'),
          R.pipe(R.take(14), R.append('…'), R.join(''))
        ), R.head), items),
      data: R.map(R.last, items)
    });
    this.screen.render();
  }

  render(items) {
    if (items.length > 0) {
      let preparedItems;

      if (this.order) {
        switch (this.order) {
          case 'desc': {
            preparedItems = R.sort(R.descend(R.prop(1)), items);
            break;
          }
          default: {
            preparedItems = R.sortBy(R.prop(1), items);
            break;
          }
        }
      } else {
        preparedItems = R.clone(items);
      }

      switch (this.mode) {
        case 'bar': {
          this.renderBarChart(preparedItems);
          break;
        }
        default: {
          this.renderTable(preparedItems);
          break;
        }
      }
    } else {
      this.renderInfo();
    }
  }

  showFrames(nestedItems) {
    this.refreshBarChart(nestedItems[0]);
    const that = this;
    let currentIndex = 0;

    setTimeout(function updateTick() {
      currentIndex = (currentIndex + 1) % nestedItems.length;
      that.refreshBarChart(nestedItems[currentIndex]);

      setTimeout(updateTick, 3000);
    }, 3000);
  }

  renderInfo() {
    const mkd = this.grid.set(0, 0, 1, 1, contrib.markdown, this.displayOptions);

    mkd.setMarkdown(`
      ### Info


      Packages not hosted in github or is not available at the current time.


      Please try later.
    `);
    this.screen.render();
  }
}

module.exports = Visualizer;
