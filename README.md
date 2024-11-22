# ts-latent-number
Simple number container which smoothly transitions between assigned numbers

```ts
// Create the number container
// All options are optional, the values below are the default values
const latentNumber = new LatentNumber(0, {
  delayMs: 0, // How long to wait with the transition after the value changes
  transitionDurationMs: 1000, // Change how long the transition takes
  easingFunction: (progress: number) => easeInoutQuad(progress, 0, 1, 1) // Set a custom easing function
});

// Assign a value
latentNumber.value = 5;

// Read the latent value
const latentValue = latentNumber.latentValue;
```