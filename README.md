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

## Benchmark

I used [`hyperfine`](https://github.com/sharkdp/hyperfine) to run a quick benchmark
of this package versus `astro check && astro build`

I used an app in `testing` directory of this repo to run the benchmark. It's the
astro blog template that I used to make sure the package works correctly. While
this isn't a good example of a real-world app it still demonstrates the
performance benefits pretty well.

To get consistent results accross benchmark runs, I used `--prepare` argument to
remove the `dist` folder and flush disk caches. If you are not on MacOS `sync && sudo purge`
will not do the job, so you'll need to look up how to flush the caches on your system.

Since dropping caches likely requires superuser privileges, you can use `sudo -v`
to temporarily gain the permissions before running the benchmark commands.

```console
$ hyperfine --prepare "rm -rf dist && sync && sudo purge" 'pnpm run build'
Benchmark 1: pnpm run build
  Time (mean ± σ):      4.548 s ±  0.061 s    [User: 7.990 s, System: 0.689 s]
  Range (min … max):    4.459 s …  4.619 s    10 runs
```

```console
$ hyperfine --prepare "rm -rf dist && sync && sudo purge" 'pnpm run build-parallel'
Benchmark 1: pnpm run build-parallel
  Time (mean ± σ):      3.195 s ±  0.063 s    [User: 8.337 s, System: 0.668 s]
  Range (min … max):    3.149 s …  3.342 s    10 runs
```

We can see that using `astro-parallel-build-check` results in almost 1.5s faster build.

## Limitations

Passing flags to build and check commands is not supported at the moment. I'm
holding off on this because I don't need it and there is a chance I'll never do.
The best option would probably be to have the same flags as `astro build` command
and pass the `astro check` configuration as environment variables.

## Contact
- [Personal website](https://aleksac.me)
- <a target="_blank" href="http://twitter.com/aleksa_c_"><img alt='Twitter followers' src="https://img.shields.io/twitter/follow/aleksa_c_.svg?style=social"></a>
- hello@aleksac.me
