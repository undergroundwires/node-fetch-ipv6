import { exit } from 'node:process';

async function test() {
    const url = 'https://web.archive.org/web/20221029173029/https://en.wikipedia.org/wiki/Firefox';
    const response = await fetch(url, { method: 'HEAD'});
    console.log('Status:', response.status);
    if (response.status === 200) {
        exit(0);
    }
    exit(1);
}

await test();
