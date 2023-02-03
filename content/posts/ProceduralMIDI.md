---
title: "Procedural MIDI"
date: 2023-02-02
draft: false
tags:
- Music
- Procedural Generation
- Python
- Artsy
---

I've always wanted to experiment with procedurally generating music. There's a ton of interesting methods to algorithmically compose music, using parameters and randomization to generate melodies. I've been tinkering with the synthesizer sim VCV Rack, and was recently messing around with sending MIDI to it from Python. The second I realized that I could use this to generate melodies, I dropped everything and obsessively worked on it for several days. Eventually, it stopped feeling like noise and started feeling like a weird modern composition. 

<!-- Embedded demo vid -->
{{<youtube tAtjBQ3fOFA>}}

It's honestly much more musical than I expected for not having any pre-programmed melodies. As every note is selected by weighted randomization, the entire system is entirely probabilistic. It's not AI, there's no training data or feedback. The only input data are the chords and scales I wrote. I just kept adding a new weight or algorithm, listening to it play, and tinkering until I was happy with it. 

The chord progression is pre-programmed, as I was mostly interested in melody generation. Each beat, the lead melody has a chance to start playing any note in the current scale. There's a ton of math for the odds of playing each note, as technically every note has some chance of playing. The weighting primarily makes the melody more likely to move on downbeats, play notes which don't clash, and follow a similar motion and structure to the last measure.

{{<image src="/img/ProceduralMIDI/ExamplePlot.png" alt="Example Plot" position="center" style="border-radius: 8px; width:60%" >}}

Info about recent notes is displayed in real time. The right plot displays recent MIDI notes and durations for each voice. The left plot displays the weighted distribution used to select the note most recently played on Lead. In this screenshot, we can see a clear spike at the selected position, indicating that it was the most likely selection, although any note in the current scale could have been played. 

Every 8 measures, a number of configuration variables are modified. This creates a more comprehensible structure, as different patterns can be observed within each configuration. First, the beat pattern is tweaked. Each chord is split into beats, which are grouped into notes. This creates a similar pattern to tuplets in traditional music.

The bass and alto voices also randomly cycle through several different settings . These specify the algorithm for note pitch and timing, reading the beat division, chord position, and lead voice to select notes. Finally, two threshold values are tweaked for the lead and alto voices. These change the threshold required for a note to play, varying how frequently notes play and move.

{{<image src="/img/ProceduralMIDI/ExampleSequence.png" alt="Example Sequence" position="center" style="border-radius: 8px; width:75%" >}}

On this example sequence, each measure is divided into 15 individual beats. These are then split into groups of 3. In traditional music theory, this is identical to triplets in 5/4. These do not have to be evenly divided, and can create some really interesting patterns.

The code is all available on Github. When I started working on this I was not expecting it to get quite this out of hand, so the code is a messy pile of patches and loop. I'd eventually like to circle back and make it more usable, but I figured I'd share what I have rather than not at all. 

#### [GitHub Repo](https://github.com/GarettMorrison/Procedural_MIDI)