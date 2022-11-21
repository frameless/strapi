const { create } = require('xmlbuilder2');
const { formatJsonata } = require("@stedi/prettier-plugin-jsonata/dist/lib");
const path = require("path")
const fs = require('fs');
const dir = './dist';

(function generateGemeenetJson() {
    fs.readFile(require.resolve(path.resolve(process.cwd(), 'src/gemeente.xml')), (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }

        const doc = create(data.toString());
        const gemeenteJson = doc.toObject()
        fs.writeFileSync(`${dir}/gemeente.json`, prettierFormateJson(gemeenteJson));
    })
})()

function prettierFormateJson(json) {
    return formatJsonata(JSON.stringify(json), { printWidth: 120, tabWidth: 2, useTabs: false });
}