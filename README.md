# astro-parallel-build-check

Run astro check and astro build in parallel.

## Motivation

By default astro runs check and build steps separately, one after the other. This
isn't a problem if the checks fail, since we probably don't want to proceed with
the build anyway. However if the checks are successful this can be much slower
than running them in parallel with the build, especially on machines with multiple
CPU cores and projects that spend a lot of time on I/O during builds.

## Getting Started

### Installation

```shell
pnpm add astro-parallel-build-check
```
```shell
yarn add astro-parallel-build-check
```
```shell
npm install astro-parallel-build-check
```

### Usage

Add the `astro-parallel-build-check` command to the `scripts` field of your `package.json`:

```json
{
  "scripts": {
    "build": "astro-parallel-build-check"
  }
}
```

## Limitations

Passing flags to build and check commands is not supported at the moment. I'm
holding off on this because I don't need it and there is a chance I'll never do.
The best option would probably be to have the same flags as `astro build` command
and pass the `astro check` configuration through environment variables.

## Contact
- [Personal website](https://aleksac.me)
- <a target="_blank" href="http://twitter.com/aleksa_c_"><img alt='Twitter followers' src="https://img.shields.io/twitter/follow/aleksa_c_.svg?style=social"></a>
- hello@aleksac.me
