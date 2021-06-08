let fs = require('fs');
let path = require('path');
let minimist = require('minimist');
let argv = minimist(process.argv.slice(2));

function configureENV(args) {
    let code;

    switch (args.branch) {
        // 开发环境(分支)
        case 'dev':
            code = `export default {

            };`;
            break;
        // 测试环境(分支)
        case 'test': 
            code = `export default {
                
            };`;
            break;
        // 生产环境(分支)
        case 'master': 
            code = `export default {
                
            };`;
            break;
    }
    
    code && fs.writeFileSync(path.resolve(__dirname, '../environment.js'), code);
}

configureENV(argv);