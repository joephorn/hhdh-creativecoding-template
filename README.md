$${\color{red}CODING \space KNOWLEDGE \space IS \space REQUIRED \space FOR \space USING \space THIS \space TOOL}$$

# Creative Coding Template
Template project for future creative coding projects for HeyHeydeHaas.

## Getting started

```bash
git clone https://github.com/joephorn/hhdh-creativecoding-template
npx serve .
```

The project should look like this:
<img width="1211" height="674" alt="Project template" src="https://github.com/user-attachments/assets/ee9cf1e4-72f7-4ce0-b762-68fa6976fd5d" />


- The canvas size (on which the visuals are displayed) can be changed in sketch.js line 2: `createCanvas([width], [height])`.
- Add new sources (e.g. images) in /src/images to keep files organised.
- To add a slider, copy-paste the div under *SLIDERS* and change:

`for` and `id` (these two are the same) to the desired parameter name (e.g. 'size')

`min` to the desired minimum value (e.g. '1')

`max` to the desired maximum value (e.g. '100')

`step` to the desired minimum amount the value can change (e.g. '1')

`value` to the desired starting value (e.g. '10')

Now the value name (same name as `for` and `id`) can be used in sketch.js. For example:
```bash
ellipse(0, 0, size, size);
```
This parameter is now connected to the slider.

## Randomize & transitions

- `window.PARAMS.randomize()` randomizes numeric sliders and color inputs (like `fg` and `bg`).
- Exclude params from randomize:
```bash
window.PARAMS.randomize({ excludedParams: ['fg', 'bg'] });
```
- Set default excludes for randomize:
```bash
window.PARAMS.config.randomizeExcludedParams = ['fg', 'bg'];
```
- Exclude params from transitions:
```bash
window.TRANSITIONS.tweenTo(nextParams, { excludedParams: ['fg', 'bg'] });
```
- Set default excludes for transitions:
```bash
window.TRANSITIONS.config.excludedParams = ['fg', 'bg'];
```

## Credits
Developed by Joep Horn  
In collaboration with HeyHeydeHaas
