// .svgrrc.js
// Required to fix artifacts in the svgs because the ids are not unique

let count = 0;

module.exports = {
    svgo: true,
    svgoConfig: {
        plugins: [{
            name: "prefixIds",
            params: {
                prefix() {
                    return count++;
                }
            }
        }],
    }
};
