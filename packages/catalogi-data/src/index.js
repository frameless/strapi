const { create } = require('xmlbuilder2');
const path = require('path');
const fs = require('fs');
const dir = './dist';

(function generateGemeenetJson() {
  fs.readFile(require.resolve(path.resolve(process.cwd(), 'src/gemeente.xml')), (err, data) => {
    if (err) {
      console.log(err);
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }

    const doc = create(data.toString());
    const gemeenteJson = doc.toObject();
    fs.writeFileSync(`${dir}/gemeente.json`, JSON.stringify(gemeenteJson));
  });
})();
