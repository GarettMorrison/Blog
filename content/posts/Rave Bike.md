---
title: "Rave Bike"
date: 2021-08-08
# postDate: 2022-08-08T18:40:55-06:00 
draft: false
tags:
- Arduino
- LEDs
- C++
- Python
- Artsy
---

A random conversation on my train commute last summer introduced me to bike parties: massive improvised parades that meander through San Francisco full of speakers, LED strips, and crazy bike builds. Immediately sold on the concept, I was determined to over engineer a project to participate with. I ultimately decided to cover my bike with music-synced LEDs and after many nights soldering, coding, and tinkering, created this: 

{{<youtube Thel8r8gu6w >}}

The first major design challenge in becoming the worlds most visible cyclist was syncing the LEDs to music. I opted to go with an input click, simply tapping a limit switch in time with the beat. The Arduino reads these inputs and, over time, calculates the tempo of the music and when the downbeat is. I also wired up a grid of six other buttons and a potentiometer, to allow you to select a light pattern and color scheme on the fly, and mounted the whole controller on my handlebars.

{{<image src="/img/RaveBike/ControlPanel.png" alt="Control panel" position="center" style="border-radius: 8px; width:75%" >}}

The next challenge was actually implementing the LED patterns. Because LED strips are programmed linearly there isn't an easy way for the LED controller to know where the lights are placed, and most displays just play a repeating pattern which runs down the length of the strip. I really wanted to have two-dimensional patterns that used the side of the bike as a 2D display, but this was going to require some creative processing. 

{{< rawhtml >}}
<style>
.row::after{
  content: "";
  clear: both;
  display: table;
}

.columnLeft {
	float: left;
	width: 50%;

	position: relative;
	overflow: hidden;
	/*padding-right: 0.5;*/
}


.columnRight {
	float: left;
	width: 50%;
	
	position: relative;
	overflow: hidden;
	/*padding-left: 0.5;*/
	/*padding-top: 94.11765%;*/
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
	<div class="columnLeft">
		<img src="/img/RaveBike/BikeImagePrep.gif" alt="Prepping image for processing" style="width:100%; border-radius:8px">
	</div>
	<div class="columnRight">
		<img src="/img/RaveBike/BikeImageProcess.gif" alt="Iterating through leds in python script" style="width:100%; border-radius:8px">
	</div>
</div>

{{< /rawhtml >}}

I started by taking a picture of my bike from several yards away to get an approximate 2D scan of where the LEDs are placed on the bike. I edited over this (pictured left), placing an orange dot on the first LED group and red dots on all the others. I then connected them, using blue lines to indicate which leds were wired together and green lines for visually adjacent LEDs, and set the background to black. I wrote a python script (pictured right) to iterate over the set of points, calculating the center of each dot and outputting a list of all the LEDs, their X-Y coordinates, and their adjacent LEDs. Lastly a second Python script generates a .h file using this data, allowing a C++ compiler to import the coordinates as a library. The final animations take a randomized color and sweep it across the LEDs in several different 2D patterns, which I finished implementing right before I left for the event. 

{{< rawhtml >}}
<div class="row">
	<div class="columnLeft">
		<img src="/img/RaveBike/SelfieOnBike.png" alt="Picture from event" position="center" style="border-radius: 8px; width:97%">
	</div>
	<div class="columnRight">
		</br>
		</br>
		Overall, this wound up being a super interesting and fun project, as much of a pain as some of the implementation was. All the code is available on <a href="https://github.com/GarettMorrison/LED_Mapping">Github</a>. The Python portion includes an example and should be usable out of the box for anyone looking to solve the same problem. Please let me know if you do; I wasn't able to find an existing project doing this and would love to see what other people can make. I may return to this project and improve the animations, particulary the color selection, but for now I'm quite proud of how cohesive and clean it came out.
	</div>
</div>
{{< /rawhtml >}}


{{<image >}}