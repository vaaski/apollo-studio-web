---
date: 1576291440
---

# Apollo Studio Progress Report: November 2019

November was an exciting month for the development of Apollo Studio. After spending the majority of the last couple months optimizing Apollo and adding small features, we thought it's about time Apollo can pack a larger punch, so today we're going to mostly be discussing brand new features, some of which are new to Launchpad light effects as a whole. But before we get into that, we've got more Launchpad X regressions and illogicalities to uncover...

Since the last progress report, we've updated from version [1.2.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.2.0) to version [1.3.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.3.0) with no bugfix releases in between, as we've learned from the 1.1.x disaster and now take much more care into testing our minor releases. Let's check out some of the most important changes we've had this month!

## Launchpad X Color Shenanigans

While a much more detailed opinion on the new Launchpad X is available in the previous Progress Report entry, this month we've come to a realization which unfortunately forced us to revert some of the changes we made to Apollo in version 1.2.0 in order to accommodate the X.

This month has finally seen the official release of the [Launchpad X Programmer's Reference Manual](https://customer.novationmusic.com/sites/customer/files/downloads/Launchpad%20X%20-%20Programmers%20Reference%20Manual.pdf). This is essentially a very detailed description of the inner workings and communication systems of the Launchpad X. Having a look at the RGB SysEx message necessary to run Apollo's lightshows, we can see we had correctly determined the message which we were initially very happy about.

![](https://cdn.discordapp.com/attachments/653392306291998721/654138476090097674/unknown.png)

What's important to note here is how the official documentation mentions that the values for each color channel range between 0 and 127, which would mean we have true 7-bit per channel color resolution as we had originally assumed. However upon further inspection, rpg.aleksy noticed it seems the Launchpad X actually discards the least significant bit, [only actually using 6 of the 7 bits in our color](https://youtu.be/LbJ-BtBSbVM?t=3445), reducing it back to the old 6-bit resolution of the Launchpad Pro! This behavior is not documented anywhere.

This was now suddenly a problem because we explicitly expanded Apollo's color system just to accommodate for the naively assumed full color resolution of the Launchpad X! The issue could even be reproduced in Apollo itself, simply by sending #010101 out to the Launchpad. Version 1.2.0 of Apollo Studio now exclusively supports a much larger color space, which ended up being useless anyways...

Again and again Novation are pulling dumb design decisions like this expansion of the color argument for no reason, only to effectively cut it in half on the Launchpad itself. They seem to be doing this as a general design pattern for the Launchpad X SysEx API (as evidenced by other messages like the LED brightness value which in reality would fit a 3-bit argument ranging from 0 to 7), which makes no sense to me. Either Novation has changed up their API style, or completely different people are in charge for developing the X than were assigned to the Pro earlier.

The "fix" is simple, we just revert Apollo's color system back to 6-bit color. 1.2.0 projects will stay backwards compatible, they'll simply have their colors converted to the equivalent color in the current system. I feel like we should never have gotten to the point of having to do this, but I guess we got jebaited by Novation and *hadn't tested the colors thoroughly enough*.

Having my curiosity sparked by this problem, I've had a quick glance into the X's firmware, and it seems to actually use 8-bit values per color channel for describing the internal color palette used to resolve velocities. We're yet to confirm that this is actual 8-bit resolution, the Launchpad might still be discarding bits when forming the final output, and in any case none of this makes any sense whatsoever.

Just in case it is seriously using 8 bits though... (╯°□°）╯︵ ┻━┻

## A Helping Hand

This month saw a crazy amount of new features added to Apollo Studio. This would not nearly have been a possibility without some help from [Brendonovich](https://github.com/Brendonovich)! Brendonovich started contributing to Apollo Studio earlier in the month, and is almost single-handedly responsible for many of the new features everyone can now use as part of Apollo Studio. With that said let's have a look at some of the features Brendonovich helped bring into Apollo Studio!

### Fade Smoothing Options

The Fade device has been updated to support a number of smoothing options (Linear, Smooth, Sharp, Slow, Fast, Hold) accessible by right clicking color points. These will allow you to adjust how the interpolation between any two given colors will be handled. The idea is that you can now bias towards one of the two colors, or perhaps towards or away from the middle point of the interpolation, bringing you slightly better artistic expression options to your colors.

![](https://cdn.discordapp.com/attachments/653392306291998721/655236756005847040/tujk.png)

Apart from that, Fade's gotten an additional quality of life improvement: new color points no longer default to white, but rather to the color that was under the pointer on the interpolated gradient when it was created.

### Macro System

Let's face it: the old Page system was very limiting for high-level Launchpadders. Most people these days will prefer to have some sort of sub-page or other reactive system instead of classic *multisampling* because it gives a lot more control over the global state of the project. Apollo Studio really offered no easy way to do this, with just one global variable - the Page parameter, it used to be very hard to create matching light effects for this kind of performance.

![](https://cdn.discordapp.com/attachments/653392306291998721/655236828273573898/unknown.png)

Now we've expanded this system to include 3 additional variables, and renamed everything to Macro for consistency. Apollo Studio now supports 4 unique Macros which function in much the same way to the previously used Page dial, and existing projects will  update to accommodate for that by assigning what used to be Page to Macro 1. The Macro Filter and Switch devices were also updated to feature a Target dial, letting you pick which Macro to check against or modify.

## The Copy Revolution

Oh boy. Where do we even get started with the Copy device? It's easily the most updated device in this update. Let's start from the largest and most obvious improvement: each Offset now additionally has an Angle assigned to it! This means when using Interpolate mode, the interpolated curve can now travel across an arc instead of a straight line.

![](https://cdn.discordapp.com/attachments/653392306291998721/655237648067198976/unknown.png)

Additionally each Offset can be right-clicked to switch it into absolute mode, letting you pick a position regardless of the input (this works with the Move device too). We expect this to help you create all new reactive shapes for your projects!

![](https://cdn.discordapp.com/attachments/653392306291998721/655238948569743381/unknown.png)

We've also implemented Pinch, Reverse and Infinite functionality for Copy in Animate and Interpolate modes in a similar fashion to the Pattern device. Oh and fixed some bugs with Random Loop, oops.

## Other Improvements

We've got a bunch of improvements in other areas as well. The Pattern editor was made much easier to use, with a new "Play here" option for previewing an effect from an arbitrary point in time. It's also received more navigation shortcuts, and more accurate previewing which now takes stuff like Pinch into account.

Windows were made larger by default, and context menus and scroll bars redesigned. Devices can now be choked directly from their context menu. Virtual Launchpads can now be locked and remembered, recreating them on the next session. The Apollo Connector got a Mute option and more consistent connecting/disconnecting with Apollo.

Aaaand of course, we fixed even more dumb inconsistencies, crashes, and weirdly broken actions. Whoops.

## Cover Showcase

Massive props to R.G.PReal for organizing Apollo Studio's first mega collab, with over 10 people participating in the project, some of which are first time Apollo users! Watch it right below. Here are some of the best covers created by Apollo Studio users throughout the month:

[![Jason Ross - IOU (Crystal Skies Remix)](http://img.youtube.com/vi/T4-qurdZ6yE/mqdefault.jpg)](http://www.youtube.com/watch?v=T4-qurdZ6yE "Jason Ross - IOU (Crystal Skies Remix)") [![Gareth Emery - Sanctuary (feat. Lucy Saunders) [William Black Remix]](http://img.youtube.com/vi/10Y41LpDaKo/mqdefault.jpg)](http://www.youtube.com/watch?v=10Y41LpDaKo "Gareth Emery - Sanctuary (feat. Lucy Saunders) [William Black Remix]")

## Special thanks to...

AlexayForest, Ezra Selga, Tuchan and Xiao Meng for supporting Apollo Studio on Patreon throughout the months of November. If you like Apollo Studio and want to support our work, [become a patron today](https://www.patreon.com/mat1jaczyyy)!

Got any questions or comments? Direct them to the official [Apollo Studio Discord server](https://discord.gg/2ZSHYHA).
