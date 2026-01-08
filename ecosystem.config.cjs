module.exports = {
  apps: [
    {
      name: 'elgasmi-eu',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env',
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_file: './logs/combined.log',
      time: true,
      merge_logs: true,
    },
  ],
};
