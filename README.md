# show-dependencies-stargazers-count [![Build Status](https://travis-ci.org/akgondber/show-dependencies-stargazers-count.svg?branch=master)](https://travis-ci.org/akgondber/show-dependencies-stargazers-count)

> A command-line utility for showing dependencies stargazers count

![depstaco](https://github.com/akgondber/show-dependensies-stargazers-count/blob/master/images/logo.png)


## Install

```
$ npm install -g show-dependencies-stargazers-count
```

## CLI

Get dependencies from packages file and display stargazers count in specified mode (default mode: `table`) in terminal. When dependencies count greater than 8 items are displayed using chunks with 3s delay in bar mode. Press `q`, `escape` or `Ctrl+C` to exit.

```
$ show-dependencies-stargazers-count
```
or using shorter version
```
$ depstaco
```

There is possibility to pass some keys for command:
`--dir`: source dir where is located source json file
`--file`: json file to be used for extracting dependencies, default: `package.json`
`--keys`: keys to be used when extracting dependencies
`--mode`: display mode, values: `table`, `bar`
`--order`: sort by stargazers count in specified direction (`desc`, `asc`)

## Examples of usage

```
$ depstaco --keys dependencies,peerDependencies --order desc
```
```
$ depstaco --file bower.json --order asc
```

```
$ depstaco --dir node_modules/xo --keys devDependencies --mode bar
```

## Output Examples

An example for showing dependencies stargazers count for [ava](https://github.com/avajs/ava) with `keys` set to `devDependencies` (from current directory)

```
$ depstaco --dir node_modules/ava --keys devDependencies
```

![table_mode](https://github.com/akgondber/show-dependensies-stargazers-count/blob/master/images/table_mode.png)


This example for [express](https://github.com/expressjs/express) with bar mode and sort direction to descending

 ```
$ depstaco --dir node_modules/express --sort desc --mode bar
```

![bar_mode](https://github.com/akgondber/show-dependensies-stargazers-count/blob/master/images/bar_mode_desc.png)

## API

### showDependenciesStargazersCount([opts])

#### options

Type: `Object`

##### dir
Type: `string`
Default: current working directory

location for packages file

##### file
Type: `string`
Default: `package.json`

json file which extract dependencies from

##### keys
Type: `array`
Default: ['dependencies', 'devDependencies']

Keys which extract dependencies for

##### mode
Type: `string`
Default: `table`
Values: `bar` `table`

Mode to be displayed in the terminal

##### order
Type: `string`
Default: `null`
Values: `asc` `desc`

Sort data by stargazers count sorted in specified direction.

## LICENSE
MIT
