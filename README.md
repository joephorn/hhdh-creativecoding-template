$${\color{red}CODING \space KNOWLEDGE \space IS \space REQUIRED \space FOR \space USING \space THIS \space TOOL}$$

# Creative Coding Template
Template project for future creative coding projects for HeyHeydeHaas.

## Getting started

```bash
git clone https://github.com/joephorn/hhdh-creativecoding-template
npx serve .
```

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
The value will update each frame.

## Credits
Developed by Joep Horn  
In collaboration with HeyHeydeHaas
