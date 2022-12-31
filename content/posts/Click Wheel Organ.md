---
title: "Click-Wheel Organ "
date: 2022-07-30
LastMod: 2022-08-30
draft: false
tags:
- LaserCut
- Musical Instrument
---


{{<image src="/img/ClickOrgan/OnDesk_3.jpg" alt="Freshly glued click wheel organ" position="center" style="border-radius: 8px; width:75%" >}}


In high school I took a pile of rubber bands and foam board and built something vaguely resembling a guitar. It was impossible to tune, broke if you looked at it wrong, and launched a years-long obsession with instrument design that continues to date. Recently, I have been experimenting with different sound mechanisms, trying to tune anything that makes noise. 

The range of sound mechanisms used in instruments is immense and much wider than I realized when I started, but a surprisingly large number of them can be made using PVC, wood, plastic bags, or tin-can reeds. Unfortunately, the gap between noise maker and musical instrument is wide, and my pile of out tune prototypes continued to grow. Nothing would stay in tune, until I started experimenting with click-wheels.  


{{<image src="/img/ClickOrgan/DownLength.png" alt="Python-generated wheels" position="center" style="border-radius: 8px; width:50%" >}}


<!-- The largest challenge stemmed from the inconsistency in the mechanisms. I could play at least one note with most of my prototypes, but getting that to change precisely and reliably proved extremely difficult. Wind instruments are extremely finicky and require extensive practice even with a professionally made instrument, and although strings are much easier to work with every build kept looking and sounding like a messed up guitar.  -->

Instead of vibrating a delicate reed using air power, I could mechanically shove a reed up and down by pressing it against a toothed wheel. By cutting wheels with different numbers of teeth, different frequencies are able to be played. Despite being reliant on wheel speed for absolute tuning, the constant mechanical ratios between the notes guarantee that each note will stay in tune with each other, and thus be able to play music.

After my third prototype worked, playing a 6-note pentatonic scale, I knew I had to make one with a wide range. One weekend of laser cutting and gluing later, I had a working 3 octave instrument. Despite sounding like a swarm of musical bees, I was immensely excited to finally be able to play some real music. 


{{<youtube PuulRBH9yVw>}}


As I have little patience working on anything remotely automatable, I wrote a Python script to automatically generate the wheels, converting a list of tooth counts and note names to a set of labeled, laser-ready polygons. As higher pitches are perceived as louder with the same amplitude, the larger wheels are cut with smaller teeth, equalizing the volume and allowing each wheel to have the same radius. 

{{<image src="/img/ClickOrgan/GenCAD.png" alt="Python-generated wheels" position="center" style="border-radius: 8px; width:90%" >}}

Another interesting problem was selecting a starting spike count. Each of the twelve notes in an octave has a specific ratio relating its frequency to the base frequency, but these are fractions. The spike counts must be whole numbers, as you can't make a symmetrical wheel with an extra half spike. I decided to tune it to C, as just intonation has cleaner ratios, and started spreadsheeting. I wrote an error function for a given starting count, summing the difference between each ratio and it's closest approximation, and got the following graph:

{{<image src="/img/ClickOrgan/ErrorPlot.png" alt="Python-generated wheels" position="center" style="border-radius: 8px; width:80%" >}}

As you can see, 120 is a clear outlier. There are technically better approximations with much larger wheels, but 120 spikes strikes a lovely balance between size and accuracy. If anyone else is considering making a click-wheel organ, I would recommend using equal intervals instead to play in multiple keys. The following are my calculated spike counts for each note. 

{{< rawhtml >}}

<style>
.row::after{
  content: "";
  clear: both;
  display: table;
}

.column {
	float: center;
    text-align: center;
	width: 33.333%;
    white-space: pre;
    font-size: small;

	position: relative;
	overflow: hidden;
	/*padding-right: 0.5;*/
}

.resp-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

</style>

<div class="row">
	<div class="column">
        <b>Interval</b>
        Unison
        Minor Second
        Major Second
        Minor Third
        Major Third
        Fourth
        Diminished Fifth
        Fifth
        Minor Sixth
        Major Sixth
        Minor Seventh
        Major Seventh
        Octave
	</div>
	<div class="column">
        <b>Equal Intonation</b>
        116
        123
        130
        138
        146
        155
        164
        174
        184
        195
        207
        219
        232
	</div>
	<div class="column">
        <b>Just Intonation</b>
        120
        128
        135
        144
        150
        160
        170
        180
        192
        200
        213
        225
        240
	</div>
</div>
{{< /rawhtml >}}


I'm unreasonably excited to complete my first original instrument. If anyone wants to build their own or take a close look, I've uploaded the CAD and code to [Thingiverse](https://www.thingiverse.com/thing:5500023). Feel free to shoot me an email if you have any questions or are building one for yourself!


#### EDIT:

This post was featured on the Hackaday [Blog](https://hackaday.com/2022/09/25/this-found-sound-organ-was-made-with-python-and-a-laser-cutter/) and [Podcast](https://hackaday.com/2022/09/30/hackaday-podcast-187-the-sound-of-gleeful-gerbils-the-song-of-the-hard-drive-and-a-lipstick-pickup-lullaby/)! 