import dns from 'node:dns';
import { test, expect } from 'vitest';

const testTimeout = /*minutes*/ 60 * 60 * 1000;
test('single fetch', async () => {
  const url = 'https://web.archive.org/web/20221029173029/https://en.wikipedia.org/wiki/Firefox';
  const response = await fetch(url, { method: 'HEAD'});
  // assert
  expect(response.status).to.equal(200);
}, testTimeout);

test('multiple fetch in order', async () => {
  const urls = [
    'https://web.archive.org/web/20221029145712/https://kb.mozillazine.org/Downloads.rdf',
    'https://web.archive.org/web/20240120213614/https://techcommunity.microsoft.com/t5/windows-it-pro-blog/group-configuration-search-highlights-in-windows/ba-p/3263989',
    'https://web.archive.org/web/20230929132845/https://support.microsoft.com/en-us/topic/compatibility-update-for-keeping-windows-up-to-date-in-windows-server-2012-r2-and-windows-server-2008-r2-sp1-c62197fb-d711-f7d3-f135-172844b9f322',
    'https://web.archive.org/web/20231004100105/https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=microsoft+store&queryType=phrase&search_type=all&isCpeNameSearch=false',
    'https://web.archive.org/web/20240219205516/https://wiki.archlinux.org/title/spotify',
    'https://web.archive.org/web/20240119160347/https://github.com/undergroundwires/privacy.sexy/issues/247',
    'https://web.archive.org/web/20231206171559/https://bestgamingtips.com/fix-xbox-identity-provider-not-working/',
    'https://web.archive.org/web/20230806192800/https://www.hexacorn.com/blog/2018/09/02/beyond-good-ol-run-key-part-86/',
    'https://web.archive.org/web/20231020012236/https://answers.microsoft.com/es-es/windows/forum/all/windows-10-carpeta-y-archivos-sih/4d318121-fed6-4202-8b92-d4dc236b468e',
    'https://web.archive.org/web/20221029141626/https://kb.mozillazine.org/Places.sqlite'
  ];
  for (const url of urls) {
    console.log('Fetching: ', url);
    const response = await fetch(url, { method: 'HEAD'});
    await sleep(10000);
    expect(response.status).to.equal(200);
  }
}, testTimeout);


test('multiple fetch in order (no IPv6)', async () => {
  dns.setDefaultResultOrder('ipv4first');
  const urls = [
    'https://web.archive.org/web/20221029145712/https://kb.mozillazine.org/Downloads.rdf',
    'https://web.archive.org/web/20240120213614/https://techcommunity.microsoft.com/t5/windows-it-pro-blog/group-configuration-search-highlights-in-windows/ba-p/3263989',
    'https://web.archive.org/web/20230929132845/https://support.microsoft.com/en-us/topic/compatibility-update-for-keeping-windows-up-to-date-in-windows-server-2012-r2-and-windows-server-2008-r2-sp1-c62197fb-d711-f7d3-f135-172844b9f322',
    'https://web.archive.org/web/20231004100105/https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=microsoft+store&queryType=phrase&search_type=all&isCpeNameSearch=false',
    'https://web.archive.org/web/20240219205516/https://wiki.archlinux.org/title/spotify',
    'https://web.archive.org/web/20240119160347/https://github.com/undergroundwires/privacy.sexy/issues/247',
    'https://web.archive.org/web/20231206171559/https://bestgamingtips.com/fix-xbox-identity-provider-not-working/',
    'https://web.archive.org/web/20230806192800/https://www.hexacorn.com/blog/2018/09/02/beyond-good-ol-run-key-part-86/',
    'https://web.archive.org/web/20231020012236/https://answers.microsoft.com/es-es/windows/forum/all/windows-10-carpeta-y-archivos-sih/4d318121-fed6-4202-8b92-d4dc236b468e',
    'https://web.archive.org/web/20221029141626/https://kb.mozillazine.org/Places.sqlite'
  ];
  for (const url of urls) {
    console.log('Fetching: ', url);
    const response = await fetch(url, { method: 'HEAD'});
    await sleep(10000);
    expect(response.status).to.equal(200);
  }
}, testTimeout);

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
