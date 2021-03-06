'use strict';

import HeadlessChrome from 'simple-headless-chrome';
import SW from '../lib/main';
import assert from 'power-assert';

describe('Player', () => {
  let player;

  beforeEach(async () => {
    player = new SW.Player({
      accessToken: '0000000a-LPwFZzr'
    });
  });

  it('instantiates', () => {
    assert(player);
    assert(player instanceof SW.Player);
  });

  describe('Songle Sync', function() {
    this.timeout(1000 * 60);

    let browser;
    let tab;

    beforeEach(async () => {
      player.addPlugin(new SW.Plugin.SongleSync());

      browser = new HeadlessChrome({
        headless: true
      });

      await browser.init();

      tab = await browser.newTab({ privateTab: false });

      await tab.goTo('https://jsfiddle.net/ow6bwxnk/2/');

      await tab.wait(5000)
    });

    afterEach(async () => {
      await browser.close();
    });

    describe('#isPlaying', () => {
      it('', () => {
        assert(player.isPlaying);
      });
    });

    describe('#position', () => {
      it('return current position', () => {
        assert(player.position > 0);
      });
    });
  });
});
