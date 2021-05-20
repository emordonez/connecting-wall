# "Only Connect" Connecting Wall

A web implementation of the connecting wall from the BBC quiz show "Only Connect."
Find the four links connecting four items each among 16 seemingly unrelated clues to solve the wall.

## Upcoming features

- Sound effects
- Optional elements from the show for extra pressure, such as:
  - ~~Timer with adjustable time limit~~
  - Three strikes once two groups are identified
- Editor for users to create their own walls
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

The built HTML can then be served from `dist`.
