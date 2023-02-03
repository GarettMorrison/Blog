---
title: "Simulating Evolution"
date: 2023-01-20
draft: true
---

When I was a kid, the Boston Museum of Science launched a simulated aquarium exhibit. Visitors could design a custom fish using a handful of sliders and release it into the tank. They would float around, eat, and eventually die or leave. Despite the simplicity, I was immediately obsessed. 

My parents would leave me there for hours, visiting other parts of the museum while I generated dozens of fish. I would experiment with the variables, attempting to find optimal setups and cause interesting behavior, such as schooling. This turned out to be an incredibly formative experience, as years later I am fascinated by evolution simulations, and have built several myself. 

#### 2017
### LifeSim 
My first real programming project was a simple cell-life simulation. I started with a [tutorial](https://youtu.be/FWSR_7kZuYg) for Conway's Game of Life, which is still in use as the background on this website's home page. Over time, this evolved into a proper ecosystem simulation. 

The map is randomly generated. Land masses are placed on a large ocean and surrounding with shallow water, and the eastern edge of the map is covered in tundra. Algae is randomly scattered across the map,  Individuals can inherit a variety of traits from their parents, with occasional mutation. Traits include different types of mobility (land & sea) and consumption (algae or predation)


[LifeSim Link](http://localhost:1313/js/LifeSim/simulation.html) 



#### 2021
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


#### 2022
### EvoSim


