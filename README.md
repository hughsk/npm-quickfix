# npm-quickfix

**No longer useful**

Super quick fix for NPM registry, without having to actually mirror anything. Thanks to @framp for pointing out the workaround.

``` bash
git clone git@github.com:hughsk/npm-quickfix.git
cd npm-quickfix
npm set registry http://localhost:8080/
node index.js
```

Now you should be able to `npm install` as normal :)

To change back to the original registry:

``` bash
npm set registry https://registry.npmjs.org/
```
