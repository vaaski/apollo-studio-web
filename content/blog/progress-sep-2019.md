---
date: 1572918188
---

# Apollo Studio Progress Report: September & October 2019

The single greatest mission of Apollo Studio is to allow for the most complex and versatile effects while simultaneously being as easy as possible to use. These past months have been filled with all kinds of small quality of life improvements that make Apollo Studio easier to use.

Since the last progress report, we've updated from version [1.1.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.1.0) to version [1.2.0](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.2.0) with a handful of bugfix (or in this case, bug introduction) releases in between. Let's check out some of the most important changes we've added throughout this period of time!

## Upgrading Avalonia

Apart from improving the user experience, we also strive to improve the technology Apollo Studio is built upon. This can often be a tedious process, as we use the untested and incomplete cross-platform [Avalonia UI framework](http://avaloniaui.net/) for .NET Core. Documentation is obscure, stuff breaks, and it's not uncommon to have to ask the developers about how some feature works. Naturally, attempting to upgrade Avalonia can result in a lot of weird things happening.

The first big hurdle was all on us - we simply had to take the time to understand what's changed in the API since we last updated it (which was 6 months ago) and appropriately adapt Apollo Studio to the new specifications. This is a lot of tedious and hard to test work that one must sit down for and endure the endless possibilities and broken features.

![](https://avatars2.githubusercontent.com/u/14075148?s=200&v=4)

You may ask yourself, why do this? Just like Apollo Studio improves over time, so does Avalonia. It gets bug fixes, improved or reimagined features, new capabilities and overall improved stability and performance. To the end user, what ultimately matters is that the software is functional - but to keep it functional we must stay up to date in order to be able to follow and continue building upon what we've created so far.

After all that was done and we've tested it to our heart's content, *just in case*, we decided to put up prerelease testing in our Discord server because we assumed there would be uncaught bugs that users would not like to see. So we went ahead and added pretty much everyone into it, notifying them a prerelease was happening and as many people as possible should try it out.

A few days had passed, no one really reported any sort of issue, so we figured it was good and gave it the green light for release. Thus the abomination that was version [1.1.1](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.1.1) was created and released as the latest and greatest of Apollo Studio. And boy, was it a disaster. The build was plagued with issues so much, that the most of the changes in version [1.1.2](https://github.com/mat1jaczyyy/apollo-studio/releases/tag/1.1.2) are solely regression fixes from 1.1.1! Most of it was just outright broken: crashes, broken devices and input boxes, you name it. And of course, all of the users that hadn't tested the prerelease, updated to 1.1.1 straight away and started complaining.

![](https://cdn.discordapp.com/attachments/349854261787754498/641079889109450753/unknown.png)

We've learned a lot from this release. As much as we try to test Apollo Studio ourselves before release, it's just so huge that it's impossible to test all of it on our own. We need to rely on a decent amount of real user testing when we're making large changes to Apollo Studio's infrastructure. In the future we're going to check for common issues, vital functionality, and run more rigorous testing with real users.

In the end, we managed to fix everything up and bring Avalonia to the latest and greatest. Doesn't seem like much of a change, but under the hood the wiring's completely different and much easier to manage from the developers' perspective. It'll ensure we can keep working on Apollo Studio and improve upon previous releases.

Oh, and we also updated from .NET Core 2.2 to .NET Core 3.0, which was much less painful than Avalonia's upgrade process. This brings slight performance and stability improvements to the table.

## Launchpad X Support

We got hit with a big surprise right in the middle of October - Novation came out with their new [Launchpad X and Launchpad Mini MK3](https://novationmusic.com/news/introducing-launchpad-x-and-new-launchpad-mini) releases for the Launchpad's 10th anniversary! As developers of Apollo Studio, it was top priority to get our hands on these models in order to be able to reliably provide support for them in Apollo Studio.

![](https://store.focusrite.com/images/products/large/NOVLPD12_2.png)

So, let's talk about the hardware first - what are the differences between the new Launchpad X and its predecessors? The X wins over the MK2 hands down. Bringing an extra Novation LED to the game, velocity sensitive pads, setup mode with adjustments and standalone layouts; it's an easy win and a huge improvement in overall playability and usability. The X definitely looks a lot more sleek than the previous models, and the reduced thickness and weight of the device are a huge plus.

Compared to the Pro on the other hand, the X stubbornly lacks. Sure, the pad feel is much better, and it has a brightness adjust feature which most of us have forgotten about since the S days, but it really does not bring anything revolutionary to beat out the Launchpad Pro in its game. In fact, I'd argue that the Pro is more functional than the new X - it has additional buttons on the left and bottom, the iconic Mode LED, standalone MIDI ports, custom firmware support, and lots of custom software already developed specifically for it. I personally see no reason for existing Pro users to upgrade to the X unless you seriously prefer the button feel.

About the elephant in the room - the X supports custom modes. In a way, this is a surprisingly elegant solution for music makers to design their own layouts on the Launchpad itself to aid in producing or even performing. However, it's also extremely limiting, as it's obviously meant to be a replacement for the custom firmware we've built for the Launchpad Pro. Instead of being able to run our own code in full, we're now confined to the controls and positioning Novation allows with their Components designer. While an extremely good idea on paper and one that we're in favor of including on the Launchpads, the way it's executed in practice is a nightmare. In fact, we're convinced our firmware is the sole inspiration for this whole idea Novation thought of.

![](https://cdn.discordapp.com/attachments/349854261787754498/641080290218999818/unknown.png)

First of all, the super obvious inclusion of a piano mode-like layout is a dead giveaway. They recognized we had the ability to build custom layouts via firmware and realized they could allow people to build their own. This is not a bad thing per se, but the complete neglection of everything else is. The Launchpad X has 4 custom mode slots in Live mode, which inconveniently are swapped via the right hand side - which is usually used for page swapping! It wouldn't be that bad if we had a dedicated User mode to go with instead, but they didn't include one and instead opted for having one of the custom modes mimic User, even though the page swap keys are completely unusable! It seriously bothers me that Novation are this out of touch with the majority of their community.

The only escape left is the Programmer mode - but that comes with its own issues. The layout of the notes is completely different, and the side buttons send out CCs instead of regular notes, but at least we can work with this. We've seen plugins that convert Programmer mode input to what you're used to with older models, but even then it's not perfect. Sadly with the Launchpad X, conventional page swapping via MIDI mapping in Ableton Live is simply impossible to achieve as of writing this article. It's possible to map the side buttons to Wormhole or Twist instead, or use a custom plugin that directly manipulates the macro, but ultimately all solutions require some form of Max for Live which isn't nice for newcomers that likely start out with Ableton Live Lite.

Enough about the hardware, let's talk documentation and software. A new revision of the Novation USB Driver, version 2.15.5, was released to go along with the new Launchpads. The extra functionality remains the same, enabling the use of Launchpads with multiple apps at the same time. Sadly, the same issues also remain the same, with the dreaded MK2 disconnect BSoD not yet fixed or even acknowledged by Novation. In addition, as of writing this article (3 weeks after the X released), there is still no Programmer's Reference Guide available even though it's referenced numerous times in the regular User Guide and live chat support told me they're not sure but to check out within a day or two. ¯\\\_(ツ)_/¯

![](https://cdn.discordapp.com/attachments/349854261787754498/641081288547368960/unknown.png)

While again disappointing of Novation, this posed an interesting challenge for Apollo Studio in regards to supporting the new Launchpads. Without any documentation, how are we possibly going to learn anything about the Launchpad X's SysEx API? If there's anything we've mastered over the last year, it's the art of reverse engineering proprietary software! We gathered our initial knowledge about the Launchpad X by decompiling Live's MIDI Remote Scripts, examining MIDI between Live and the Launchpad, and examining the standard SysEx inquiry message. This was enough to be able to detect what Launchpad we were dealing it, if it was updated or not, etc.; but didn't solve the issue of outputting RGB signals to the unit.

Sometimes, a bit of trial and error is all you really need. After messing around a bit trying out different numbers, eventually it was concluded that `3 3 P R G B` will set the RGB of an LED on the Launchpad X and Mini MK3. That was all we needed to get direct RGB output to the new models. Slightly off-topic, but interestingly there are also messages that update the LED brightness slider and other settings via SysEx, so it's not unrealistic that we could in the future access our Launchpad settings via the computer rather than using the built-in setup.

![](https://cdn.discordapp.com/attachments/349854261787754498/641082491612168212/gej.png)

With the Launchpad X's new Novation LED, we gave the on-screen Launchpad more customizability, expanded the color space to 7-bit per channel as the X supports that color depth, and added firmware version detection with direct links to upgraded versions of the right firmware for your Launchpad available at a click of a button. You won't see any differences when using Apollo Studio with the X compared to older models, even though Ableton Live seems to be a huge mess as of the time of writing this.

Interestingly we were able to implement this before anyone else even publicly figured out a way to make regular Ableton Live covers work with the X, and with some luck managed to snatch the title of the first ever Launchpad X cover being one that's powered by Apollo Studio. We're extremely proud of this achievement as it shows how prominent we are in the community as a whole.

## Other Improvements

With the two most major additions out of the way, let's talk about some comparatively smaller but equally important quality of life features that make producing covers easier.

![](https://cdn.discordapp.com/attachments/349854261787754498/641082746797686784/unknown.png)

Arguably the most requested and important feature added to Apollo Studio is support for pinching inside the Pattern device. Pinching dial allows for steady speed ramping of signals to allow for really intense, but subtle and smooth build-ups in speed. This works as a great visual effect for fast build-ups in long sections or even if you just need your light effects to hit a little bit harder.

![](https://cdn.discordapp.com/attachments/349854261787754498/641082893313114124/unknown.png)

A Pin button was added to the title bar of most windows, which directly controls the "Always on Top" setting in the Preferences. Since Apollo was designed to draw over Ableton, Always on Top was a nice touch to prevent from constant switching between windows, but it proves extremely tedious when trying to use other apps while working on a project, especially on single monitor setups. This lets you easily "pin" or "unpin" Apollo from the top of your screen, making it easy to switch between the two modes at will.

![](https://cdn.discordapp.com/attachments/349854261787754498/640977466881736724/gej.png)

Apollo Studio used to drop an annoying dialog box in your face anytime an update was available. Worst of all, it would entirely lock out the rest of the user interface, making quick actions a pain! It's now been moved to a simple icon appearing on the side of the Splash screen, which you can click to display the usual popup telling you about the update and offering an automatic upgrade.

![](https://cdn.discordapp.com/attachments/349854261787754498/641083144493072404/unknown.png)

There's also a new Replace action now, which is essentially like hitting a Delete + Paste combo move. Super useful in Pattern, as usually you can't have a Pattern without a single Frame inside of it; but also when collaborating with other people on a certain effect which keeps getting sent back and forth.

Aaaand of course, we fixed a lot of dumb inconsistencies, crashes, and weirdly broken actions. Woops.

## Cover Showcase

Apollo Studio is already a known name across the Launchpad community, and we're happy to see the number of people switching their workflows up and improving their skills. Here are some of the best covers created by Apollo Studio users throughout the last two months:

[![Borgeous, Taylr Renee - Sweeter Without You](http://img.youtube.com/vi/yA-bFsYRG4I/mqdefault.jpg)](http://www.youtube.com/watch?v=yA-bFsYRG4I "Borgeous, Taylr Renee - Sweeter Without You") [![Terravita x Chime x Akylla - Go Higher](http://img.youtube.com/vi/a-MwTVH-wX8/mqdefault.jpg)](http://www.youtube.com/watch?v=a-MwTVH-wX8 "Terravita x Chime x Akylla - Go Higher") [![Kai Wachi - Cerberus](http://img.youtube.com/vi/iBV5XK5honY/mqdefault.jpg)](http://www.youtube.com/watch?v=iBV5XK5honY "Kai Wachi - Cerberus")

## Special thanks to...

AlexayForest, Ezra Selga, OmegaVibe, Tuchan, T4sh, and Xiao Meng for supporting Apollo Studio on Patreon throughout the months of September and October. If you like Apollo Studio and want to support our work, [become a patron today](https://www.patreon.com/mat1jaczyyy)!

Got any questions or comments? Direct them to the official [Apollo Studio Discord server](https://discord.gg/2ZSHYHA).
