/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(
  chalk.blue(
    'Generating minified bundle for production. This will take a moment....'
  )
);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // Fatal error can be stopped here
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack genereated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // Build suceeded!
  console.log(
    chalk.green('Your app has been built for production and writen to /dist')
  );

  return 0;
});
