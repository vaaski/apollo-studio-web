---
date: 1597691618
---

# Apollo Studio Progress Report: Spring and Summer 2020

Oh look, it's been a while since the last progress report. Hello again everyone, it's been a while! After taking some time off and finding balance in my world, we're proud to finally talk about some of the changes we've managed to squeeze into Apollo Studio over the last couple months. These are mostly system rewrites which make Apollo cleaner and better to use.

Since the last progress report, we've updated from version [1.4.1](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.4.1) to version [1.7.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.7.0).

## Undo/Redo Rewrite

Definitely the messiest system that was sprinkled all over Apollo's code was the Undo/Redo system. Originally it functioned entirely by passing around anonymous code, making it really hard to store it more permanently in any way. A full rewrite which turns each Undo/Redo action into explicitly named classes was more than enough to enable us to store the Undo History inside of the project file, meaning you're now able to revert to previous states even after you've saved your project and reloaded your session!

![Undo History is stored in the pf](https://cdn.discordapp.com/attachments/636554452727496736/745043091785777162/unknown.png)

## Heaven renderer

Let's address the elephant in the room. Apollo's existing rendering code is written in a really bad way - completely asynchronously. This means each device has its own timers, and those timers can be early or late and aren't synced with each other. Not only does this hurt performance and accuracy, but it can also cause them to fire out of order, creating problems like the dreaded "Fade before Copy" scenario.

![Before](https://cdn.discordapp.com/attachments/653392306291998721/745042380322897980/a.gif)

Starting with version 1.7.0, Apollo now features the all new Heaven rendering engine. The new engine is a complete rewrite of Apollo's processing and rendering logic from scratch, bringing you huge performance improvements and bug fixes. With it, timing is implemented synchronously in a much more accurate global manager which ensures everything stays in order, fixing glitchy light effects. At the same time, it allows for much more efficient and cleaner code to be written per-device, improving performance.

![Heaven renderer - After](https://cdn.discordapp.com/attachments/653392306291998721/745042368041975929/b.gif)

Most importantly, because everything is now very deterministic, we're able to group signals that come out of the Track at the same time, and send them all at once in a single update message rather than having each signal as its own. This uses a lot less bytes of MIDI per update, allowing for much faster lights on all supported Launchpads. In addition to that, the [custom firmware's received a special new RGB LED API](https://github.com/mat1jaczyyy/lpp-performance-cfw/blob/ddfa47268b21cafcf41edfbae4bb05a78d6eb2ec/src/sysex/sysex.c#L46-L64), where it's possible to significantly compress the grouped RGB data coming to the Launchpad from Apollo, making for the fastest and smoothest light effect solution to exist as of right now!

![We now take advantage of this](https://cdn.discordapp.com/attachments/636554452727496736/745047478075916451/unknown.png)

This also puts an end to the argument that Apollo Studio performs very badly with multiple Launchpads, as the Heaven renderer improves performance to the point where running 10+ Launchpads at once should be comfortable for most users. It even does away with the dreaded Fade Smoothness, whose meaning was very confusing, and much of its range unused as Apollo wasn't nearly equipped to handle values above 30% most of the time. It's been replaced with a much more intuitive FPS limiter, where you can purposely limit the smoothness of your light effects if CPU or USB throughput is becoming a problem. And finally, the new renderer is fully backward compatible with any old Apollo project file!

[![Apollo Studio - 1.7.0 Heaven Showcase](http://img.youtube.com/vi/XaXokCcuAFk/mqdefault.jpg)](http://www.youtube.com/watch?v=XaXokCcuAFk "Apollo Studio - 1.7.0 Heaven Showcase")

Heaven is easily the most important update Apollo Studio will ever receive, and if you previously disliked Apollo due to some of these quirks we urge you to give it another go now that it's considerably improved!

## Other improvements

An all-new Refresh device is now part of Apollo. Signals keep the macro values of the project at the time of entering the chain, so they could be filtered properly even after a macro change (such as with a Switch device) has been triggered. The Refresh value allows for refreshing these macro values, allowing for dynamic light effects that can respond live to the macro values changing. This is probably the closest to any form of automation Apollo will receive. Thanks to [rpg.aleksy](https://github.com/rpgaleksy) for contributing this device!

![Refresh device](https://cdn.discordapp.com/attachments/339228623271886848/706682019601711156/eafhau.png)

The Fade device has received tons of improvements meant to ease its use. Fades can now easily be reversed or equally distributed, as well as cut at any arbitrary point. The Pattern's performance, along with all other on-screen Launchpads, has been improved further. Support for Linux-based operating systems has been added. Support for the Launchpad Pro MK3 has been added, where both halves of the bottom row display the same light effects. Copying and pasting now use a compressed format (thanks [Brendonovich](https://github.com/Brendonovich)) which makes it easier to share quickly across messaging services. Many crashes were fixed and year+ old bugs stomped.

## Cover Showcase

Here are some of the best covers created by Apollo Studio users throughout 2020 so far:

[![Sickrate & Rentz - Ready For Ya](http://img.youtube.com/vi/tDu-OkYSyeU/mqdefault.jpg)](http://www.youtube.com/watch?v=tDu-OkYSyeU "Sickrate & Rentz - Ready For Ya") [![Domastic - Wait For Me (MOTi edit)](http://img.youtube.com/vi/WYl1MFArZ04/mqdefault.jpg)](http://www.youtube.com/watch?v=bS5EyN2-OmE "Domastic - Wait For Me (MOTi edit)") [![Mike Williams x Mesto - Wait Another Day](http://img.youtube.com/vi/6JroZZstg_s/mqdefault.jpg)](http://www.youtube.com/watch?v=6JroZZstg_s "Mike Williams x Mesto - Wait Another Day") [![Teminite - Uprising](http://img.youtube.com/vi/jnBIvhGSLgA/mqdefault.jpg)](http://www.youtube.com/watch?v=jnBIvhGSLgA "Teminite - Uprising") [![K-391, Alan Walker & Ahrix - End of Time](http://img.youtube.com/vi/-Q7A0GK_S98/mqdefault.jpg)](http://www.youtube.com/watch?v=-Q7A0GK_S98 "K-391, Alan Walker & Ahrix - End of Time")

## Special thanks to...

AlexayForest, Gabe Walls, Tuchan and Xiao Meng for supporting Apollo Studio on Patreon throughout Spring and Summer of 2020. If you like Apollo Studio and want to support our work, [become a patron today](https://www.patreon.com/mat1jaczyyy)!

Got any questions or comments? Direct them to the official [Apollo Studio Discord server](https://discord.gg/2ZSHYHA).
