module.exports = {
    apps: [{
        name: 'api-nodejs',
        script: './src/index.js',
        env: {
            NODE_ENV: 'production'
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true
    }]
};