---
title: "Laser Cut Topographical Map"
date: 2021-01-13T00:51:29-06:00
draft: false
---
{{< image src="/img/topo/close_up.jpg" alt="Close up" position="center" style="border-radius: 8px;" >}}

My family has a long and illustrious history of going backpacking in Big Bend National Park. For my sister's birthday last year, I laser cut her a 3D topographical map of The Chisos Basin, one of our favorite locations in the park. This is a precise scale model, modeled by interpreting real world data with python. 

{{< image src="/img/topo/wide_shot.jpg" alt="Wide shot up" position="center" style="border-radius: 8px;" >}}

The most challenging part of the project was locating a usable heightmap image. I dug through mapping sites and United States Geological Survey data, but what I ultimately used was [terrain.party](http://terrain.party "terrain.party"), a website for exporting real world data for cities skylines maps. I calculated the scale of the image by comparing the distances between cliff faces to the scale on google maps. From this I wrote a [python script](https://github.com/GarettMorrison/HeightMapSplicer "github.com/GarettMorrison/HeightMapSplicer") using Pillow and some geometry to generate an image of each layer side by side, which I fed into a DXF [converter](https://cloudconvert.com/dxf-to-svg "cloudconvert.com"), which produced a cuttable file. The final product is a little under 2 feet square, cut from hardboard. 

{{< image src="/img/topo/side_shot.jpg" alt="Side shot up" position="middle" style="border-radius: 8px;" >}}

I was later asked to reproduce the project for a map of Texas for an installation in the Zachry Engineering Building. While testing my script I generated files for one of my favorite ridiculous creations: Tall Texas.

{{< image src="/img/topo/Tall_Texas.jpg" alt="Tall Texas" position="middle" style="border-radius: 8px;" >}}