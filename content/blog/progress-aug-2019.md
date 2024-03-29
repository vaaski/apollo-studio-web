---
date: 1567381800
---

# Apollo Studio Progress Report: August 2019

The development cycle for Apollo Studio is mostly based on users' needs, rather than the developer's vision for the project. Most changes are relatively small compared to the size of the program, often being no more than bug fixes and minor features which improve the user experience. These small improvements are very important to providing a smoother experience for our users. The Apollo Studio Progress Report is a monthly update highlighting the most important improvements that keep Apollo Studio moving forward.

Since Apollo Studio was released in the beginning of August, we've updated from version [1.0.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.0.0) to version [1.1.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.1.0) with a handful of bugfix releases in between. Let's check out some of the most important changes we've added throughout this period of time!

## Addressing Launchpad Connectivity Issues

While the Launchpad is a wonderful piece of hardware, Novation's backing software isn't up to the same standards of quality. With lots of issues plaguing the USB Driver, it's a miracle we are able to withstand the constant crashes and [blue screens](https://cdn.discordapp.com/attachments/321730411854299137/617778113463582722/unknown.png) while unleashing our creativity. Apollo Studio was initially not designed with many of these inconsistencies in mind. Through rigorous usage and testing, we've isolated many different situations where Apollo could crash, stop responding, or simply lock up just due to an unexpected event occuring with the MIDI communication library we use called RtMidi.

![](https://cdn.discordapp.com/attachments/321730411854299137/617771696673259520/unknown.png)

Most commonly, freezes would take place when the Launchpad disconnects while a light effect is being played out. This happens a lot more often with the Launchpad MK2 due to the [extremely sensitive USB port](https://www.reddit.com/r/NovationLaunchpad/comments/5wq61w/launchpad_mk2_connection_issues/). Apollo Studio is now able to properly detect when a MIDI port has become unstable to use, and as such marks it as disconnected (unavailable) without freezing the program.

Another odd issue that came up was that all other Launchpads would cease functionality when an MK2 unit was disconnected, either because of the sensitive USB port or because it was actually unplugged. Reconnecting the MK2 would not 'unlock' other Launchpads, and reconnecting the rest would cause the MK2 to stop working! These are the issues that are toughest to deal with, because they could be influenced by a lot of different factors. Eventually, it turned out it's likely a bug in RtMidi due to how oddly the Launchpads can behave at times, which we're able to work around by forcing a software reconnect of all Launchpads when the device list changes. Phew!

Also, turns out we were sending data about left and bottom row lights to MK2 units, causing unnecessary additional overhead. We don't do that anymore, slightly increasing the light effect speed limit for MK2 users.

## macOS Stability Improvements

On launch, the macOS build of Apollo Studio was arguably a disaster compared to the Windows build. With Launchpads not always connecting properly if at all, seemingly random crashes and failure to start, it was extremely frustrating to use. On top of all that, Apollo's installer was mistakenly allowing installation on Macs running El Capitan, when really the lowest version Apollo would run on was Sierra! Additionally, closing Discord while Rich Presence was enabled would crash Apollo.

![](https://cdn.discordapp.com/attachments/321730411854299137/617773378518122496/unknown.png)

Although macOS generally supports Launchpads better, the majority of our users are running Windows, so all of these issues went under the radar during alpha and beta testing phases. All of the aforementioned issues have since been fixed, allowing for a much smoother experience for our macOS users. Part of this is logging the MIDI device list rescan event to the Console, which seemingly prevents some sort of race condition in RtMidi. These kinds of issues are always the toughest to understand and fix because they happen outside of our control, but sometimes just a workaround is good enough.

## Redesigned UI Components

Apollo's User Interface hasn't changed much since release, however we'd still like to point out a few important makeovers Apollo has received. First and foremost, the Preferences window is no longer the huge clunky panel with loads of checkboxes, but is now a rather elegant scrollable powerhouse:

![](https://cdn.discordapp.com/attachments/321730411854299137/617773761319403578/unknown.png)

The most used settings are displayed first, including Launchpad Configuration, Processing, Appearance-related options and so on. A nifty addition is the Launchpad Preview allowing you to test out the Fade Smoothness and On-screen Launchpad Style settings live. Mentioning Launchpad Configuration, Launchpads can now be software reconnected with their Reconnect buttons, as well as using the shortcut `CTRL+SHIFT+R`(Windows) or `CMD+SHIFT+R`(Mac) while focusing on their respective Track editor windows.

![](https://cdn.discordapp.com/attachments/321730411854299137/617774246004916276/unknown.png)

The Track editor itself has also received some visual upgrades: dials relating to single-choice values rather than amounts have gotten a slight makeover, such as those found on Choke, Output, Switch etc. A much requested addition are the Signal Indicators that are now visible between devices and on chains, showing where signals are flowing throughout your project. Note that this feature does slightly take away from the performance of the program, and if you'd like to get the most out of Apollo Studio while performing, you should temporarily disable them in the Preferences.

## Crash Handler Improvements

On release, Apollo had a minor crash handler implemented. This crash handler would accurately save your project and spawn a crash log which helps us fix the issue which caused it. However, it would only catch managed exceptions (errors), which meant that most of the time only crashes caused by our mistakes would actually result in restoring the project! People were still [losing work](https://cdn.discordapp.com/attachments/321730411854299137/617778909399875584/unknown.png) to RtMidi-related crashes, Windows updates, computer shutdowns and killed processes.

![](https://cdn.discordapp.com/attachments/321730411854299137/617774607281291286/unknown.png)

Now, Apollo one-ups the autosave feature and constantly stores your project in case of such an uncontrolled crash. If it notices it wasn't safely closed during the previous session, it will pull up the stored project and offer restoring it. This ensures every possible crash, hang or freeze will go without any lost work.

## Apollo Connector v2

The Apollo Connector's main purpose is to bridge the gap between now disjointed software: Ableton Live (whose purpose is to mix audio) and Apollo Studio (whose purpose is to render light effects). It's an integral part to a high quality user experience when using Apollo. The initial "v1" of the Apollo Connector was extremely basic, but did the job right. We felt this wasn't enough to deeply integrate Apollo into Ableton, so we've added a couple extra features to better synchronize the two programs.

![](https://cdn.discordapp.com/attachments/321730411854299137/617830215275511851/dev.png)

The Connector itself used to be relatively hidden, requiring an user to manually go through Apollo's files looking for the Connector. Now we've added a button taking you straight to the Connector inside the Preferences. Another major design flaw was that we never actually expected to update the Connector itself, so the built-in auto updater mechanism never updated the Connector. This meant that while we were adding new features to the Connector, most users were not actually receiving them! Whoops. This has also been fixed, but it might take an additional update to take effect.

The first and most requested new feature is the ability to sync Live's BPM to Apollo, allowing for songs with BPM changes to be automated live during the performance with Apollo following suit. Additionally, in case of a Connector not immediately connecting (usually caused when replacing missing files), a manual Reconnect button was added to save time instead of deleting and readding the Connector to the project.

Having both the original "v1" Apollo Connector and the new and improved v2 revision in existence poses a question of how they'll interact with different versions of Apollo. The original Connector will continue working with all future versions of Apollo Studio, while v2 only supports versions 1.0.6 and above. Whenever a new Connector revision is created, it'll only function with the version of Apollo Studio at the time of its making (and all future versions).

## Device Additions and Fixes

As Apollo's devices were now subjected to the entire community to use, some rare issues started to come out of the water. The most common issue was a crash when closing the project, caused by the Fade and Output devices not disposing properly when asked to. This would take down Apollo instead of going back to the initial Splash window. It's kind of funny to think about, considering most people like to kill Ableton Live instead of closing it normally due to the abysmal closing times! That issue was fixed, along with a little bug that affected light effects that span multiple Launchpads. It was caused by the Choke device not properly choking such effects, leaving residue on the Launchpads.

![](https://cdn.discordapp.com/attachments/321730411854299137/617776170498523136/unknown.png)

As the final highlight of this Progress Report, a new device called Layer Filter has been added to Apollo Studio! Its purpose is to filter out signals by their layer. It proves most useful where multiple layers are weirdly organized in different places and you want to apply common processing to an entire layer. A device with a very specific use case, but a welcome addition nonetheless!

## Cover Showcase

Since Apollo Studio has released publicly, lots of people rushed to get familiar with the new workflow and enhance their future covers. Here are some of the best covers created by Apollo Studio users throughout the month:

[![TheFatRat - Stronger](http://img.youtube.com/vi/9RAjLW0wsTE/mqdefault.jpg)](http://www.youtube.com/watch?v=9RAjLW0wsTE "TheFatRat - Stronger") [![Taska Black - Nothing Lasts (feat. Pauline Herr)](http://img.youtube.com/vi/_8qze9zO13k/mqdefault.jpg)](http://www.youtube.com/watch?v=_8qze9zO13k "Taska Black - Nothing Lasts (feat. Pauline Herr)") [![Denking x NEKT - Paint in the Sky](http://img.youtube.com/vi/XdBOQ_Z8oaU/mqdefault.jpg)](http://www.youtube.com/watch?v=XdBOQ_Z8oaU "Denking x NEKT - Paint in the Sky")

## Special thanks to...

Shakkar, AlexayForest, Tuchan, QuarkDrop, T4sh, Xiao Meng, and OmegaVibe for supporting Apollo Studio on Patreon throughout the month of August. If you like Apollo Studio and want to support our work, [become a patron today](https://www.patreon.com/mat1jaczyyy)!

Got any questions or comments? Direct them to the official [Apollo Studio Discord server](https://discord.gg/2ZSHYHA).
