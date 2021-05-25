# "Only Connect" Connecting Wall

A web implementation of the connecting wall from the BBC quiz show "Only Connect."
Solve the wall by finding the four links connecting four items each among 16 seemingly unrelated clues.
Try some of the walls from the show, or create your own wall to share with others.

## Changelog

- `0.1.3`: Wall editor for users to create their own connecting walls. Custom walls are shared as base64 encoded strings.
- `0.1.2`: Strikes now come into effect once two groups have been found. Wall automatically resolves after three strikes or if time runs out. Added sound effects from the show.
- `0.1.1`: There is now a time limit visually indicated by a progress bar. Modal pop-ups now explain the rules and game state.
- `0.1.0`: First functional release. Items can be selected and checked. Wall automatically updates with each correct selection. Connections are revealed at the end.

## Upcoming features

- ~~Sound effects~~
- ~~Optional elements from the show for extra pressure, such as:~~
  - ~~Timer with adjustable time limit~~
  - ~~Three strikes once two groups are identified~~
- ~~Editor for users to create their own walls~~
- Adjustable difficulty
  - Enable/disable time limit and strikes
  - Configure time limit and number of strikes
- Saved/submitted wall repository
- Further explanation for connections
- "I give up"

## Setup

Install all dependencies then serve on a local host:

```bash
yarn install
yarn serve
```

Compile and minify for production:

```bash
yarn build
```

The built HTML can then be served from `dist` with [`serve`](https://www.npmjs.com/package/serve):

```bash
serve -s dist
```
