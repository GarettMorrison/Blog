# publishSite.py
#
# I want to not include google analytics for local test site so I have 2 different config files
# config.toml, the default, has no analytics code
# publishConfig.toml had analytics, and the netlify publish command is set to use it
#
#It also automatically runs the commands to push the site, except I still enter my credentials by hand for obvious reasons

import os
import sys
import subprocess as sp

#Make publishConfig.toml
#Open Files
configIn = open("config.toml", "r")
configOut = open("publishConfig.toml", "w")

#Add google analytics code where flag is
for line in configIn.readlines():
	if line == "#Insert Google Analytics Here\n":
		configOut.write("[services.googleAnalytics]" + "\n"  )
		configOut.write("	id = \"UA-196724901-1\"" + "\n")
	else:
		configOut.write(line)

#Save files
configIn.close()
configOut.close()
#Done making second config file

#Run publishing scripts
sp.run(["git", "add", "."])
sp.run(["git", "status"])
message = input("input git commit message:")
sp.run(["git", "commit", "-m", message])
sp.run(["git", "push", "garettmorrison"])