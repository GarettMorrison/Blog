---
title: "In Progress"
date: 2021-05-11
draft: false
tags:
- LaserCut
- Python
- Artsy
---


There are a number of projects I am either still working on or have not yet written a full post about. This page is a way for me to track progress and have an online record of things that I am currently working on. 

{{<NiceLine>}}

### PlantSim
I am fascinated by emergent behavior in systems, and frequently program simulations to experiment with these properties. This particular sim is a cell placement evolution sim. The program "grows" the plant based on an input set of instructions. There are 3 types of cells the sim can place. Leaves, the green X cells, generate a set amount of food every tick. Stores, the blue + cells, take food from all adjacent cells and add it to the plant's total. Veins, the yellow line cells, take food from 3 adjacent cells and give it to the cell they are pointing towards. The plant can use this food to place additional cells, and thus grows exponentially. The program repeatedly runs the simulation, each time varying the instruction set and saving changes which improved the total food collected. This allows it to evolve over time, which results in some interesting patterns. 



{{< rawhtml >}}
<div class="row">
	<div class="column" style = "width: 50%">
		<img src="https://i.imgur.com/OiftWXu.gif" alt="BigGuy"  style="position:center; width:95%; border-radius:8px">
	</div>
	<div class="column" style = "width: 50%">
		This is the final product of hundreds of generations of evolution. As stores are much more expensive than the other cells, the sim evolves extensive vein networks to gather food and funnel it into the limited number of stores.
	</div>
</div>
</br>

<div class="row">
	<div class="column" style = "width: 50%">
		<img src="https://i.imgur.com/3BJKRcr.gif" alt="PassOff"  style="position:center; width:95%; border-radius:8px">
	</div>
	<div class="column" style = "width: 50%">
		This is an interestingly bugged version of the sim. Early in development, rather than place the pricy stores early on and feed into them, the sim would stack a ton of food onto a leaf cell using veins and then place an adjacent store later. To prevent this I set a cap on how much food a leaf can store, hoping that the sim would generate more organic patterns. Instead, it discovered that it could place pairs of veins facing each other, constantly moving the food so my storage cap didn't delete it. It then does the same last minute store placement, completely avoiding the restriction. 
	</div>
</div>
</br>
{{< /rawhtml >}}




{{<NiceLine>}}
### AutoLisp_Tools
UCP, the software I use to run the laser cutter, has a weird quirk where if you send it polylines, a type of AutoCAD object, it cuts at a small but unpredictable fraction of the speed it is set to. This is especially fun when handling student requests, as most image conversion software outputs exclusively polylines. I eventually got so frustrated with this that I spent a week teaching myself Lisp and AutoCADs command API, and then wrote a suite of tools to convert various linetypes into line segments. This culminated in a single command reducing the cut time of polylines parts by 75%, saving hours. [Github](https://github.com/GarettMorrison/AutoCode/tree/main/AutoLisp_Tools)




{{<NiceLine>}}

### ImageConv

{{< rawhtml >}}
<div class="row">
	<div class="column" style = "width: 40%">
		<img src="/img/inProgress/Portrait.jpg" alt="Self Portait" style="width:95%; border-radius:8px">
	</div>
	<div class="column" style = "width: 60%">
		Procedural generation and emergence is one of my favorite areas in computer science. This is a set of programs which convert images to DXF files, attempting to recreate the original by drawing perfect lines or points. I've experimented with a handful of techniques, including drawing lines across the image and pointillism, the practice of drawing large numbers of dots with varied density to imitate shading. 
	</div>
</div>


<div class="row">
	<div class="column" style = "width: 40%">
		<img src="/img/inProgress/StarryNight_Dense.jpg" alt="Starry Night" style="width:95%; padding-top:8px; border-radius:16px">
	</div>
	<div class="column" style = "width: 60%">
		What I ultimately settled on was a script which takes the pointillism output and procedurally places connecting lines between the dots, resulting in an interesting combination between line art and pointilism. This allows the laser to engrave more visibly, as the engraver struggles to make clear dots. That is the code which I used to generate the output on the left.
	</div>
</div>

{{< /rawhtml >}}

[Github](https://github.com/GarettMorrison/AutoCode/tree/main/ImageConv)  
[Gallery](https://imgur.com/gallery/nY0wTjr)


{{<NiceLine>}}

### DrawBot
I have been experimenting with progressively more complicated attempts to make a CNC plotter. This started as me wanting to better understand CNC machines by designing one from scratch, and has since gotten progressively more out of hand. I am hoping to apply my ImageConv project to generate patterns to draw.

{{< rawhtml >}}
<h4>Version 1</h4>
<div class="row">
	<div class="column" style = "width: 50%">
		<img src="/img/inProgress/Drawbot_V1.png" alt="Version 1" style="width:95%; border-radius:8px">
	</div>
	<div class="column" style = "width: 50%">
		Version one was the definition of a learning experience. My objective was to implement 2 axis motion with as few precision parts as possible. I chose to run a two pulley system, where a pair of steppers precisely control two cord lengths running to the head. I also added a servo to raise and lower the pen on the head.
		<br> 
		<br>
		There were a handful of fundamental flaws that resulted in the need for a V2. The head would swing away from the surface, limiting printing to angled backplates. The cords were wrapped around the pulley once and then weighted, to prevent spooling from impacting the radius of the pulley. It ultimately just allowed slipping which resulting in a loss of accuracy over time. 
	</div>
</div>

<h4>Version 2</h4>
<div class="row">
	<div class="column" style = "width: 50%">
		<img src="/img/inProgress/DrawBot_UnderConstruction.jpg" alt="Under Construction" style="width:95%; border-radius:30px">
	</div>
	<div class="column" style = "width: 50%">
		As any good engineer does when the time comes to make a second version with minor improvements, I had a cooler idea and immediately started again from scratch. I decided to design an affordable, easy to setup, feedback driven 2 axis robotic arm, which is a huge shift from the previous design. The entire mechanism is tension based, driven by pulleys in the base of the machine. 
	</div>
</div>
<br>
{{< /rawhtml >}}

I am using cheap dc motors to control the angle of the two middle joints of the arm using a cord and reading their positions with potentiometers. There is also a servo in the base controlling a pulley which pulls the pen onto the paper. It should be able to draw in a ~3' by ~3' square. I intend to print color images by running multiple passes with different markers. I also intend to implement bluetooth control and a SD card reader to more easily run long term print jobs. 