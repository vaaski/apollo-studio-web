---
date: 1583041251
---

# Apollo Studio Progress Report: December 2019, January & February 2020

The bridge towards the new year marks a stale period for the development of Apollo Studio. Most improvements were either quality of life features or performance optimizations, but there were some new highly requested devices sprinkled in as well! Today we won't be putting much focus on that though, we're going to be talking more about the situation with modern Launchpads as well as the future of Apollo Studio.

Since the last progress report, we've updated from version [1.3.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.3.0) to version [1.4.1](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.4.1).

## Launchpad X Layout problem

Continuing the Launchpad X saga, last blog post we talked about some questionable decisions regarding the SysEx API and color format found on the Launchpad X. Since the initial first look, we've learned a lot about how the Launchpads work internally and how to better understand them, leading to a lot of realizations. One of those being that, the color on the LEDs is in fact of 6-bit resolution (the 8-bit palette gets crushed down to 6 bits per color channel when drawing on the LEDs). A bummer, but means we've gotten it right and don't need to change Apollo's color system yet again.

About the elephant in the room (that we've been mostly ignoring thus far, primarily because it's not of Apollo Studio's concern), we briefly mentioned in an earlier report that the Launchpad X can only be used in Ableton Live and other DAWs in Programmer mode when considering a "cover"-like set. The largest disadvantage there is being forced to either use the XY Layout (which Apollo has supported since the beginning, even before the new Launchpads were released) or use a bunch of Max for Live devices in each project to maintain backwards compatibility with the decade-old standard Drum Rack layout.

Personally for us it was sad to see this being the only workaround to the problem, as in part the patches can cause issues with the Apollo Connector. We set out on a mission to solve this problem at its core, by changing the layout of the pads on the Launchpad firmware itself. We knew it was not going to be an easy task, but seeing as Novation wasn't showing much enthusiasm towards fixing the problem, we felt it was our duty as the Apollo Studio team to resolve the matter.

![Workarounds](https://media.discordapp.net/attachments/653392306291998721/683545237028995182/unnamed.png)

The entire project was managed by a team of three people: Brendonovich, mat1jaczyyy and vaaski. You've heard of Brendonovich from the last entry in the series, but you might not be keen on vaaski's backstory. vaaski is a retired launchpadder who used to practice it as a minor hobby multiple years ago, who I've kept in touch with throughout the years. They specialize in web development, and we've built lots of things together already. My [personal homepage](https://mat1jaczyyy.com) and the Apollo Studio website you're reading this on were both built mostly by vaaski! A lesser known fact is that Apollo's user interface was originally going to be built in Electron by vaaski, but this ultimately didn't work out and I went for implementing an Avalonia user interface myself instead.

The process consisted of three different stages:
* First, we need to understand how the Launchpad handles firmware updates as we need to dump, modify, and then flash modified firmware onto it.
* Next, we need to reverse engineer the firmware and actually patch the button layout to match the traditional Drum Rack layout instead of using the XY Layout.
* Finally, we want to make the patching process as simple and smooth as possible for end users.

### Hacking the firmware

The first stage involved writing a command-line packer and unpacker for `.syx` firmware update files. While they do contain actual code, it's not possible to analyze it until it's unpacked into a raw hex dump. After the firmware file is modified, we'll need to later repack it in order to send our modifications to the Launchpad.

A part of the official packing process for the Launchpad Pro is actually open-sourced in [dvhdr's launchpad-pro repository](https://github.com/dvhdr/launchpad-pro/blob/master/tools/hextosyx.cpp). Comparing Launchpad Pro update files to Launchpad X update files, we could notice a lot of similarities! Understanding this code helped speed up the process of creating an unpacker significantly, and subsequently the packer as well as it's simply the reverse process that's happening.

The largest difference between the Pro and X though is that the Launchpad X additionally employs a checksum on the firmware data. It's most likely used to prevent errors and garbage firmware getting uploaded, but in our case it means the Launchpad will disregard any modifications we made. Brendonovich was the one to take a dive into the unpacked firmware and find the updating code itself, as the Launchpads can also be updated when booted to firmware in addition to the bootloader. Turns out the algorithm used is a simple [CRC32](https://github.com/mat1jaczyyy/LP-Firmware-Utility/blob/f90754c4e3179af842c7db35f3a95ceda3e25290/tools/common/common.cpp#L39) which we compute at packing time to ensure any firmware update we generate can be accepted by the Launchpad X.

![Packed firmware](https://cdn.discordapp.com/attachments/653392306291998721/683545598233673728/unknown.png)

### Patching the button layout

The most essential three patches that needed to happen were the following: convert button presses from XY to DR before sending them to the computer, convert side button presses from CCs to notes before sending them to the computer, and convert LED messages from DR to XY before rendering them on the LEDs. While I had lots of prior experience with x64 assembly, this was my first time fiddling with ARM instructions and I first had to spend some time adjusting and learning the language.

After writing and injecting the patches to the right place (which includes finding the places by understanding the symbol-less code by reverse engineering), we also opted for a few extra changes to help discern patched firmware from stock firmware: we changed the name of the Programmer mode to spell just "Cover" mode, and changed its color to Red mimicking the Performance mode found on my [Launchpad Pro custom firmware](https://github.com/mat1jaczyyy/lpp-performance-cfw#performance-mode). We also wrote separate patches for mapping the top row to the E0-B0 range utilized by the Pro or the C7-G#7 range utilized by the S and MK2 Launchpads.

![Your average nerd's Ghidra window](https://cdn.discordapp.com/attachments/653392306291998721/683545728756350976/Screenshot_4.png)

We did all of this for the Mini MK3 as well, and noticed the assembly looks suspiciously similar with very little being changed from what's in the X firmware - strongly suggesting they're built off a shared codebase internally.

### Simplifying the experience

Had we not decided to create our own interface for installing these patches, the process would look something like this: you'd download a pre-patched `.syx` update file and load it into a Max-based Flash Tool similar to the one used for installing Pro custom firmware.

We decided against this for a few reasons: this first assumes users will have Max installed and readily available. Back in 2018 when the Max Flash Tool was designed, this made sense: Ableton Live 9 Suite with Max for Live was the only viable software in use for light-production. Everyone had been using this at the time, and it was reasonable to assume users would be able to simply download the flasher and flash in a few moments. Today with Apollo Studio being actively used, some users might not have easy access to Max and will have to download the entirety of it before performing a simple flash action. Additionally, Live 10 users might have a harder time finding their Max installation, as it's now bundled with Live instead of requiring a standalone Max installation.

vaaski and Brendonovich thus designed and created the [Launchpad Firmware Utility](https://fw.mat1jaczyyy.com/) website, which we've filled with patching options for the Launchpad X and Mini MK3 as well as enabled for simply updating the Launchpad Pro and MK2. Inspired by Components' updater, all it takes to get a firmware installed is to open a webpage and select what you want - there's no external flasher application you need to download, the browser will send the SysEx messages with the update directly to the standard bootloader MIDI port for the desired Launchpad.

![Firmware Utility](https://cdn.discordapp.com/attachments/653392306291998721/683545940703182860/unknown.png)

### Publishing our work

For such a simple change, the work that's built up around it seems unreal and massive. Having finished everything including the promotional video on a Sunday night, we decided to let it rest until Monday in case some imperfection surfaces, and went to bed expecting a special release day. An analogy: for our dear guests, we decided to prepare a roast duck for dinner. Not only we picked the most premium quality and expensive meat, we spent multiple days carefully preparing it and perfecting it, serving it to the guests by chopping it to small pieces like you would for children to eat and enjoy carefree.

...instead, when we woke up, we've had quite a rough awakening. Immediately we've learned that Novation have released Legacy mode, which is an official update that does pretty much what we've done: enables carefree Drum Rack layout and backwards compatibility, while additionally retaining Programmer mode's default functionality. All the work we've built up during the last two months, culminated in it becoming utterly useless, as the new update was available similarly via Components. Another analogy: we not only got off on the wrong foot that morning, we got up on the wrong hand, fell on our head and had to be rushed to hospital. Keep in mind we've transitioned from the previous analogy to this one.

[![WE FIXED THE LAUNCHP-- wait novation fixed it?](http://img.youtube.com/vi/uAl4xSpHFRQ/mqdefault.jpg)](http://www.youtube.com/watch?v=uAl4xSpHFRQ "WE FIXED THE LAUNCHP-- wait novation fixed it?")

To say the least, while we're sorry to see our work become obsoleted without a chance to show how much effort and care went into it, we're happy an official solution exists, rather than people running hacked unofficial firmware on their brand new devices. It'll for sure be better in the long term as well, as further updates won't require recreating the patches, as well as better marketing the update to end users. We've still made it available as an easy firmware updater though, without the patches (as there's no need for them anymore).

## Launchpad Pro MK3

The release of the Launchpad Pro MK3 was expected with time. Announced in January, units didn't actually start shipping until early February. Putting Novation's horrible naming strategies aside, this Launchpad introduces even more production-based interfaces such as Chord mode and a full step sequencer intended both for use with Ableton Live and in standalone mode.

Hardware-wise, it ditches the mode light and splits the bottom side buttons in half, creating two bottom rows with half as much height. The Setup button was moved to the bottom left corner, Shift button moved to the top left corner, and the Novation LED from the X added into the top right corner. The biggest breaking change for Apollo is definitely the split bottom row, which we're unsure how to handle even as of right now. Additionally, the side buttons are now nearly fully coated and only display LED light through transparent text and use a mechanical switch for the first time rather than a membrane one that's been used thus far.

![Launchpad Pro MK3](https://cdn.discordapp.com/attachments/653392306291998721/683546399194742784/unknown.png)

Firmware-wise, upon first look it seems like the release of the Pro MK3 was either unintentionally premature or rushed. The factory firmware Pro MK3 units ship with what seems to be unfinished firmware, missing some crucial features like the Programmer mode entirely even though they're documented in the User Guide. While updated firmware does have all the features as described, both versions suffer from light lag issues which encouraged us to take a look inside.

The first obvious thing we notice is how the firmware is much larger: the `.syx` update file is a whopping 617kB compared to the Launchpad X's 92kB! Looking inside two facts are apparent, the first one being that the Pro MK3 runs [FreeRTOS](https://www.freertos.org/) as a base operating system rather than running as embedded firmware directly. We're interested to see whether Novation will use this to develop an app framework for pushing your apps to the operating system where they can execute without the need to create firmware from scratch.

The second and more interesting is that the firmware ships with debug assert calls and strings, strongly suggesting the firmware is unoptimized and perhaps even still unfinished as evidenced by units shipping with early firmware versions. This would explain why lights seem to oddly lag. It also helps with reverse engineering and understanding the hardware tremendously. On the contrary, the introduction of FreeRTOS and multithreading makes it harder to trace execution.

![Asserts](https://cdn.discordapp.com/attachments/653392306291998721/683547800511971343/unknown.png)

Considering it's currently been roughly a month and a half since the Pro MK3 has been announced and still the firmware seems unstable and unfinished, there's little documentation other than the User Guide, and this device seems like it'll be a pain to implement with breaking changes, we've decided not to support it at least until the situation stabilizes and we know for sure what we're dealing with here. While we do have experimental support based on guesswork already, we want to be extra safe and avoid a situation similar to what happened with the Launchpad X a few months back.

## Innovating Apollo Studio further

1.4.0 introduced a new device called Loop: its purpose being repeating incoming signals. The most important use case for this is  making a non-Pattern effect repeatable over time, or creating an echo. Multi's received a Key mode which enables powerful parallel processing, and Copy has received a Pinch feature similar to that found on the Pattern device. Speaking of Pattern, the Pattern Editor itself has received tremendous performance improvements thanks to Brendonovich rewriting a bunch of my code except he did it better. Window close memory leaks were fixed up in Avalonia, and Apollo Studio should no longer eat up multiple gigabytes of memory during prolonged sessions.

![Loop](https://media.discordapp.net/attachments/653392306291998721/679285317735546920/aerggeagaegea.png) ![Copy](https://cdn.discordapp.com/attachments/653392306291998721/679291311026733066/qaegfeagf.png)

For the future it looks like we'll mostly be refactoring and optimizing code to run better and smoother. 1.5.0's biggest change is simply a rewrite of the Undo/Redo system with the addition of a new Refresh device. For the far future, we are planning a renderer rewrite for 1.6.0 which would fix some long-standing timing issues, as well as open the door towards more optimization such as grouping LED set messages and potentially even moving parts of the renderer onto the Pro custom firmware to achieve feats such as true 100% Fade smoothness.

As of right now my life situation has changed (partially impacted by losing 2 months of work on the X firmware patches, but also due to failing some uni exams), and I've realized I personally spend too much time on developing personal pet projects like Apollo Studio and haven't truly enjoyed writing code for them for at least a few months already. I'm currently taking an indefinite break from any coding / development work, which means when or will these future ideas happen is currently undecided. I want to explore and find myself in the real world which is something I've been neglecting for a while, and I'm taking the time to do so uninterrupted.

## Cover Showcase

Here are some of the best covers created by Apollo Studio users throughout the month:

[![Hillsong Young & Free - Noël](http://img.youtube.com/vi/E2aEwtZ2YVw/mqdefault.jpg)](http://www.youtube.com/watch?v=E2aEwtZ2YVw "Hillsong Young & Free - Noël") [![Alan Walker - Alone Pt. 2](http://img.youtube.com/vi/WYl1MFArZ04/mqdefault.jpg)](http://www.youtube.com/watch?v=WYl1MFArZ04 "Alan Walker - Alone Pt. 2") [![Song of Healing - The Legend of Zelda: Majoras Mask](http://img.youtube.com/vi/DKYI4_I4d_k/mqdefault.jpg)](http://www.youtube.com/watch?v=DKYI4_I4d_k "Song of Healing - The Legend of Zelda: Majoras Mask")

## Special thanks to...

AlexayForest, Mikhail Trofimov, Ezra Selga, Gabe Walls, Tuchan and Xiao Meng for supporting Apollo Studio on Patreon throughout the months of December, January and February. If you like Apollo Studio and want to support our work, [become a patron today](https://www.patreon.com/mat1jaczyyy)!

Got any questions or comments? Direct them to the official [Apollo Studio Discord server](https://discord.gg/2ZSHYHA).
