module.exports = {
/*
pm2 deploy ecosystem.config.js dev setup
pm2 deploy ecosystem.config.js dev
*/

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "bareserver",
      script    : "app.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    
    dev : {
      user : "nodeuser",
      host : "192.168.135.213",
      ref  : "origin/master",
      repo2 : "git@github.com:mdnmdn/bareserver.git",
      repo : "https://github.com/mdnmdn/bareserver.git",
      path : "/var/www/node_apps/home/",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}
