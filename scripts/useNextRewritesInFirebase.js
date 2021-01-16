// Map the exported map of .html files generated by next.js in Firebase Hosting Rewrites.
// this secret thing can't be found anywhere, maybe this is a good candidate to be a NPM Module.
// The next.js generate that map when you run `yarn next export`
// I think that vercel use that's map internally...
const fs = require('fs');

const firebaseConfigFile = require('../firebase.json');
const nextRoutesManifest = require('../packages/front/.next/routes-manifest.json');
const customRewrites = require('../firebaseHostingRewrites');

const convertedRewrites = nextRoutesManifest.dynamicRoutes.map(item => ({
    regex: item.regex,
    destination: item.page + '.html',
}));

firebaseConfigFile.hosting.rewrites = [...convertedRewrites, ...customRewrites];

fs.writeFileSync(__dirname + '/../firebase.json', JSON.stringify(firebaseConfigFile, null, 2), { encoding: 'utf-8' });
