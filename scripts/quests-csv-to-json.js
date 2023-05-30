const { writeFileSync, appendFileSync } = require("fs")
const { parse } = require('csv-parse')

const optionalQuests = `Quest,Star,Objective
Learning the Clutch,1*,Learn the mechanics of the clutch claw
Butting Heads with Nature,1*,Slay 12 Kestodon
A Thicket of Thugs,1*,Slay 7 Jagras
Fungal Flexin' in the Ancient Forest (!),1*,Deliver 20 Gourmet Shroomcaps
The Great Glutton,2*,Hunt a Great Jagras
Camp Crasher,2*,Hunt a Kulu-Ya-Ku
Snatch the Snatcher (!),2*,Capture a Kulu-Ya-Ku
The Pain from Gains (!),2*,Slay 7 Gajau
Exterminator of the Waste (!),2*,Slay 14 Vespoid
Scatternut Shortage,3*,Hunt Pukei-Pukei
The Current Situation,3*,Hunt a Tobi-Kadachi
Mired in the Spire,3*,Hunt a Barroth
The Piscine Problem,3*,Hunt a Jyuratodus
Prickly Predicament (!),3*,Deliver 20 Bauble Cactuses
Gettin' Yolked in the Waste (!),3*,Deliver 2 Herbivore Eggs
Landing the Landside Wyvern (!),3*,Capture a Barroth
Special Arena: Pukei-Pukei,3*,Hunt a Pukei-Pukei
Special Arena: Barroth,3*,Hunt a Barroth
Special Arena: Tobi-Kadachi,3*,Hunt a Tobi-Kadachi
One Helluva Sinus Infection,4*,Hunt an Anjanath
Gettin' Yolked in the Forest (!),4*,Deliver 2 Wyvern Eggs
Royal Relocation (!),4*,Hunt a Rathian
It's a Crying Shamos (!),4*,Slay 11 Shamos
A Tzitzi for Science,4*,Hunt a Tzitzi-Ya-Ku
Sorry You're Not Invited,4*,Hunt a Paolumu
What a Bunch of Abalone (!),4*,Deliver 10 Super Abalone
White Monster for a White Coat (!),4*,Capture a Paolumu
Persistent Pests (!),4*,Slay 14 Hornetaur
A Rotten Thing To Do,4*,Hunt a Great Girros
A Bone to Pick,4*,Hunt a Radobaan
On Nightmare's Wings (!),4*,Slay 5 Raphinos
Troubled Troupers (!),4*,Hunt 2 Tzitzi-Ya-Ku
Special Arena: Anjanath,4*,Hunt an Anjanath
Special Arena: Radobaan,4*,Hunt a Radobaan
Special Arena: Rathian,4*,Hunt a Rathian
Special Arena: Paolumu,4*,Hunt a Paolumu
When Desire Becomes an Obsession,5*,Hunt a Rathalos
Redefining the Power Couple (!),5*,Hunt a Rathian and a Rathalos
Twin Spires Upon the Sands,5*,Hunt a Diablos
A Humid Headache,5*,Hunt a Legiana
Gone in a Flash (!),5*,Slay a Kirin
Scratching the Itch,5*,Hunt an Odogaron
Man's Best Fiend (!),5*,Capture an Odogaron
The Meat of the Matter (!),5*,Deliver 2 Lumps of Meat
Special Arena: Rathalos,5*,Hunt a Rathalos
Special Arena: Diablos,5*,Hunt a Diablos
Special Arena: Odogaron,5*,Hunt an Odogaron
Special Arena: Legiana,5*,Hunt a Legiana
Left Quite the Impression,6*,Guide Zorah Magdaros
Hard to Swallow,6*,Hunt a Great Jagras
Googly-eyed Green Monster,6*,Hunt a Pukei-Pukei
A Hair-Raising Experience,6*,Hunt a Tobi-Kadachi
It Can't See You if You Don't Move,6*,Hunt an Anjanath
The Sleeping Sylvan Queen,6*,Hunt a Rathian
Stuck in Their Ways (!),6*,Capture a Tobi-Kadachi
Keep Your Hands to Yourself!,6*,Hunt a Kulu-Ya-Ku
A Crown of Mud and Anger,6*,Hunt a Barroth
Pukei-Pukei Ambush,6*,Hunt a Pukei-Pukei
Up to Your Waist in the Waste,6*,Hunt a Jyuratodus
"Brown Desert, Green Queen",6*,Hunt a Rathian
Trespassing Troublemaker,6*,Hunt an Anjanath
Say Cheese!,6*,Hunt a Tzitzi-Ya-Ku
Loop the Paolumu,6*,Hunt a Paolumu
A Tingling Taste,6*,Hunt a Great Girros
Stuck in a Rut,6*,Hunt a Radobaan
Chef Quest! Pumped to Deliver (!),6*,Deliver 4 Forgotten Fossils
Chef Quest! A Rotten Request (!),6*,Slay 10 Girros
A Meow for Help,6*,Slay 13 Gastodon
A Scalding Scoop,6*,Slay 5 Barnos
Dodogama Drama,6*,Hunt a Dodogama
Chef Quest! Gajalaka Lockdown (!),6*,Defeat 10 Gajalaka
Special Arena: HR Pukei-Pukei,6*,Hunt a Pukei-Pukei
Special Arena: HR Anjanath,6*,Hunt an Anjanath
Special Arena: HR Barroth,6*,Hunt a Barroth
Special Arena: HR Paolumu,6*,Hunt a Paolumu
Special Arena: HR Tobi-Kadachi,6*,Hunt a Tobi-Kadachi
Special Arena: HR Rathian,6*,Hunt a Rathian
Special Arena: HR Radobaan,6*,Hunt a Radobaan
Rathalos Rematch,7*,Hunt a Rathalos
Rathalos in Blue,7*,Hunt an Azure Rathalos
The Red and Blue Crew (!),7*,Hunt a Rathalos and an Azure Rathalos
Pretty In Pink,7*,Hunt a Pink Rathian
"Well, That Diablos!",7*,Hunt a Diablos
Two-horned Hostility,7*,Hunt a Black Diablos
RRRRRumble in the Waste! (!),7*,Hunt a Diablos and a Black Diablos
A Cherry Wind upon the Reefs,7*,Hunt a Pink Rathian
Legiana: Highlands Royalty,7*,Hunt a Legiana
A Sore Site (!),7*,Hunt an Odogaron
Talons of Ire and Ice (!),7*,Hunt a Legiana and an Odogaron
Odogaron Unleashed,7*,Hunt an Odogaron
"Lavasioth, Monster of Magma",7*,Hunt a Lavasioth
Ore-eating Occupier,7*,Hunt a Uragaan
Ruler of the Azure Skies,7*,Hunt an Azure Rathalos
Bazelgeuse in the Field of Fire (!),7*,Hunt a Bazelgeuse
A Fiery Convergence (!),7*,Hunt a Lavasioth and an Uragaan
Today's Special: Hunter Flambé,7*,Hunt a Deviljho
Special Arena: HR Uragaan,7*,Hunt an Uragaan
Special Arena: HR Pink Rathian,7*,Hunt a Pink Rathian
Special Arena: HR Odogaron,7*,Hunt an Odogaron
Special Arena: HR Rathalos,7*,Hunt a Rathalos
Special Arena: HR Azure Rathalos,7*,Hunt an Azure Rathalos
Special Arena: HR Diablos,7*,Hunt a Diablos
Special Arena: HR Black Diablos,7*,Hunt a Black Diablos
Special Arena: HR Legiana,7*,Hunt a Legiana
A Portent of Disaster (!),8*,"→complete research of 10 different monsters
Slay  Kushala Daora"
Lightning Strikes Twice (!),8*,Slay Kirin
Stirrings from the Grave,8*,Slay Vaal Hazak
The Eater of Elders,8*,Slay Nergigante
Hellfire's Stronghold - The Fires of Hell Bite Deep,8*,Slay Teostra
The Winds of Wrath Bite Deep  - Master of the Gale,8*,Slay Kushala Daora
Blue Prominence,8*,Slay Lunastra
Infernal Monarchy,8*,Slay Teostra and Lunastra
A Blaze on the Sand (!),8*,"→complete research of 15 different monsters
Slay a Teostra"
A Visitor from Eorzea,9*,"→Complete Special Assignment:
""He Taketh It with His Eyes"" to unlock
Slay Behemoth"
A Light Upon the River's Gloom,9*,Slay Xeno'Jiiva
Showdown: the Muck and the Maul (!),9*,"→Hunt 5 different tempered monsters (threat level 1) to unlock
Hunt all target monsters.
Tempered Barroth + Tempered Radobaan"
"New World Sky, New World Flower (!)",9*,"→Hunt 7 different tempered monsters (threat level 2) to unlock
Hunt all target monsters.
Tempered Pink Rathian + Tempered Azure Rathalos"
A Summons from Below (!),9*,"→Hunt 3 different tempered monsters (threat level 3) to unlock
Hunt all target monsters.
Tempered Vaal Hazak + Tempered Odogaron"
The White Winds of the New World (!),9*,"→Clear all optional quests from level 1 to 8 and A Light Upon the River's Gloom to unlock
Hunt all target monsters.
Legiana + Odogaron + Diablos + Rathalos"
The Sapphire Star's Guidance (!),9*,"→Reach Hunter Rank 100 to unlock
Hunt all target monsters.
Tempered Kushala Daora +Tempered Teostra +Tempered Nergigante"
Beyond the Blasting Scales,9*,"→This is an assignment quest prior to Master Rank
Hunt 2 Tempered Bazelgeuse"
Thunderous Rumble in the Highlands,9*,Hunt a Tempered Kirin
Deep Snow Diver,M1*,Hunt a Beotodus
Taking Charge,M1*,Hunt a Banbaro
Ice Catch! (!),M1*,Capture a Beotodus
Call of the Wild,M1*,Slay 10 Wulg
Greetings from the Tundra (!),M1*,Deliver Young Butterburs
The Great Jagras Returns! (!),M1*,Hunt a Great Jagras
Literary Thief,M1*,Hunt a Kulu-Ya-Ku
New World Problems,M1*,Hunt a Pukei-Pukei
Beating Around the Bush,M1*,Hunt a Tobi-Kadachi
Trapping The Tree Trasher (!),M1*,Capture a Banbaro
Wildspire Treasure Hunt,M1*,Hunt a Kulu-Ya-Ku
Taster's Tour,M1*,Hunt a Pukei-Pukei
Dragged Through the Mud,M1*,Hunt a Barroth
Jyura In My Way (!),M1*,Hunt a Jyuratodus
All the Wrong Signals,M1*,Hunt a Tzitzi-Ya-Ku
Grinding my Girros,M1*,Hunt a Great Girros
Can't Bring Yourself To It,M1*,Hunt a Dodogama
This Here's Big Horn Country! (!),M1*,Hunt a Tempered Banbaro (Rewards Vitality Mantle +)
Special Arena: MR Pukei-Pukei,M1*,Hunt a Pukei-Pukei
Special Arena: MR Barroth,M1*,Hunt a Barroth
Special Arena: MR Tobi-Kadachi,M1*,Hunt a Tobi-Kadachi
Special Arena: MR Banbaro,M1*,Hunt a Banbaro
Analysis Creates Paralysis,M2*,Hunt a Viper Tobi-Kadachi
Poison and Paralysis Pinch (!),M2*,Capture a Viper Tobi-Kadachi (Rewards Cleanser Booster +)
Boaboa Constrictor (!),M2*,Defeat 14 Boaboa
By Our Powers Combined (!),M2*,Hunt a Tempered Beotodus
You Scratch Our Backs... (!),M2*,Hunt a Tempered Beotodus
Anjanath Antics,M2*,Hunt an Anjanath
Fool's Mate,M2*,Hunt a Rathian
Nighty Night Nightshade (!),M2*,Capture a Nightshade Paolumu
Stick Your Nose Somewhere Else,M2*,Hunt an Anjanath
A Queen At Heart (!),M2*,Hunt a Rathian
A Face Nightmares Are Made Of,M2*,Hunt a Nightshade Paolumu
Feisty Girl Talk (!),M2*,Hunt all target monsters (Rewards Health Booster +)
The Plight of Paolumu,M2*,Hunt a Paolumu
Pink Power Grab,M2*,Hunt a Pink Rathian
Protip: Stay Hydrated,M2*,Hunt a Coral Pukei-Pukei
No Laughing Matter,M2*,Hunt a Radobaan
Bugger Off Bugs! (!),M2*,Slay all target monsters
Looking For That Glimmer (!),M2*,Deliver 20 Gaia Ambers
Put That Red Cup Away (!),M2*,Hunt a Coral Pukei-Pukei (Rewards Waterproof Mantle +)
Special Arena: MR Nightshade Paolumu,M2*,Hunt a Nightshade Paolumu
Special Arena: MR Viper Tobi-Kadachi,M2*,Hunt a Viper Tobi-Kadachi
Special Arena: MR Coral Pukei-Pukei,M2*,Hunt a Coral Pukei-Pukei
Special Arena: MR Radobaan,M2*,Hunt a Radobaan
Special Arena: MR Rathian,M2*,Hunt a Rathian
Special Arena: MR Pink Rathian,M2*,Hunt a Pink Rathian
Special Arena: MR  Paolumu,M2*,Hunt a Paolumu
Special Arena: MR Anjanath,M2*,Hunt a Anjanath
Remember That One Time?,M3*,Hunt a Barioth
The Purr-fect Room: Stone (!),M3*,Capture a Tigrex
Swoop to a New Low,M3*,Hunt a Rathalos
"Nargacoulda, Shoulda, Woulda",M3*,Hunt a Nargacuga
The Secret to a Good Slice,M3*,Hunt a Glavenus
Red and Black Aces (!),M3*,Hunt all target monsters (Rewards Glider Mantle +)
A Line in the Sand,M3*,Hunt a Diablos
A Flash of the Blade,M3*,Hunt a Glavenus
Simmer and Slice! (!),M3*,Hunt all target monsters Glavenus + Rathian
Legiana Left Behind,M3*,Hunt a Legiana
The Black Wind,M3*,Hunt a Nargacuga
Don't be a Jerk with the Jerky,M3*,Hunt an Odogaron
A Roar that Shook the Vale,M3*,Hunt a Tigrex
"Runnin', Rollin', and Weepin' (!)",M3*,Hunt all target monsters
Everyone's a Critic,M3*,Hunt a Lavasioth
Begone Uragaan,M3*,Hunt an Uragaan
Blast Warning In Effect!,M3*,Hunt a Brachydios
Secret of the Ooze (!),M3*,Capture a Brachydios
Festival of Explosions! (!),M3*,Hunt all target monsters (Rewards Fireproof Mantle +)
Proud White Knight (!),M3*,Hunt a Tempered Barioth (Rewards Evasion Mantle +)
A Nasty Flesh Wound (!),M3*,Hunt a Tempered Odogaron (Rewards Bandit Mantle +)
Special Arena: MR Nargacuga,M3*,Hunt a Nargacuga
Special Arena: MR Barioth,M3*,Hunt a Barioth
Special Arena: MR Glavenus,M3*,Hunt a Glavenus
Special Arena: MR Legiana,M3*,Hunt a Legiana
Special Arena: MR Odogaron,M3*,Hunt an Odogaron
Special Arena: MR Rathalos,M3*,Hunt a Rathalos
Special Arena: MR Tigrex,M3*,Hunt a Tigrex
Special Arena: MR Brachydios,M3*,Hunt a Brachydios
Special Arena: MR Diablos,M3*,Hunt a Diablos
Special Arena: MR Uragaan,M3*,Hunt an Uragaan
Noblefrost Hunter,M4*,Hunt a Shrieking Legiana
Tundra Troublemaker,M4*,Hunt a Fulgur Anjanath
Duet of Rime (!),M4*,Hunt all target monsters (Rewards Iceproof Mantle +)
Treasure in the Steam (!),M4*,Deliver 2 Hot Spring Stones
These Azure Eyes See All,M4*,Hunt an Azure Rathalos
Misfortune in the Forest,M4*,Hunt an Ebony Odogaron
In the Heat of the Moment,M4*,Hunt a Black Diablos
A Shadowy Offender,M4*,Hunt an Ebony Odogaron
This Corroded Blade,M4*,Hunt an Acidic Glavenus
The Purr-fect Room: Light Iron (!),M4*,Capture an Acidic Glavenus
The Purr-fect Room: Dark Iron (!),M4*,Hunt an Odogaron and Ebony Odogaron
Blue Rathalos Blues,M4*,Hunt an Azure Rathalos
Trap the Thunder Jaw (!),M4*,Capture a Fulgur Anjanath (Rewards Thunderproof Mantle +)
Piercing Black (!),M4*,Hunt a Black Diablos (Rewards Rocksteady Mantle +)
Special Arena: MR Azure Rathalos,M4*,Hunt an Azure Rathalos
Special Arena: MR Black Diablos,M4*,Hunt a Black Diablos
Special Arena: MR Fulgur Anjanath,M4*,"Hunt a Fulgur Anjanath
"
Special Arena: MR Acidic Glavenus,M4*,Hunt an Acidic Glavenus
Special Arena: MR Ebony Odogaron,M4*,Hunt an Ebony Odogaron
Clashing Swords Upon The Rime,M5*,Slay a Velkhana
The Harbinger of Clear Skies,M5*,Slay a Kushala Daora
Here Comes the Deathmaker,M5*,"Slay a Blackveil Vaal Hazak
"
Royal Audience on the Sand,M5*,Slay a Teostra
The Tyrant's Banquet (!),M5*,Hunt a Savage Deviljho (Rewards Apothecary Mantle +)
Lightning Crashes,M5*,Slay a Kirin
Memories of the Sea God,M5*,Slay a Namielle
It's the Afterlife for Me (!),M5*,Slay a Blackveil Vaal Hazak (Rewards Immunity Mantle +)
Seething with Anger,M5*,Hunt a Seething Bazelgeuse
Wings of the Wind,M5*,Slay a Kushala Daora
Mark of the Sun,M5*,Slay a Teostra
The Purr-fect Room: Silver (!),M5*,Capture a Seething Bazelgeuse
Faraway Lorelei,M6*,Slay a Shara Ishvalda
One Hot Night in the Spire,M6*,Slay a Lunastra
Into the Palace of Flame,M6*,Slay a Lunastra
All That Glitters is Furious,M6*,Slay a Furious Rajang (Unlocked after the related special assignment)
Achy Brachy Heart,M6*,Slay a Raging Brachydios (Unlocked after the related special assignment
We Run This Town (!),M6*,"Hunt a Tigrex, Nargacuga, Zinogre, Brachydios and a Glavenus"
Hymn of Moon and Sun MR 125+ (!),M6*,Slay a Golden Rathian and a Silver Rathalos (Rewards Impact Mantle +)
Divine Surge MR 150+ (!),M6*,Slay a Tempered Kirin and a Tempered Namielle (Rewards Temporal Mantle +) 
The Storm Brings the Unexpected MR 175+ (!),M6*,Slay a Tempered Kushala Daora and Tempered Blackveil Vaal Hazak (Rewards Affinity Booster +)
Master Hunter of the New World MR 200+,M6*,"Slay a Tempered Teostra, Tempered Lunastra, Tempered Velkhana and Ruiner Nergigante"
Special Arena: MR Zinogre,M6*,Hunt a Zinogre
Special Arena: MR Yian Garuga,M6*,Hunt a Yian Garuga
Special Arena: MR Gold Rathian,M6*,Hunt a Gold Rathian
Special Arena: MR Silver Rathalos,M6*,Hunt a Silver Rathalos
Special Arena: MR Brute Tigrex,M6*,Hunt a Brute Tigrex
Special Arena: MR Stygian Zinogre,M6*,Hunt a Stygian Zinogre`

const eventQuests = `Quest,Star,Objective
Up at the Crack of Dawn,1*,Hunt 2 Great Jagras
Chew the Fat,2*,Hunt 3 Great Jagras (Giant and Miniature Crown)
USJ: Gold Star Treatment,3*,Hunt Tobi-Kadachi + Pukei-Pukei
Where Sun Meets Moon,3*,Hunt Great Jagras + Pukei-Pukei + Paolumu
Geeting the Gluttons,4*,Hunt 2 Anjanath
Timberland Troublemakers,4*,Hunt Kulu-Ya-ku + Tzitzi-Ya-ku
Ya-Ku With That?,4*,Slay 8 Barnos
Every Hunter's Dream,5*,Hunt Paolumu + Rathalos
Flesh Cleaved to Bone,5*,Hunt Radobaan + Odogaron
The Poison Posse,5*,Hunt Pukei-Pukei + Rathian + Rathalos
Wicked Wildspire Warfare,5*,Hunt Diablos + 2 Barroth
Kirin the Myth,5*,Slay 2 Kirin
Wiggle Me This,6*,Deliver 10 Wigglers
Scrapping with the Shamos,6*,Slay 13 Shamos
Egg Lovers United,6*,Hunt Kulu-Ya-Ku (Giant Crown)
Midnight Mayhem,6*,Slay 10 Gastodon
Triple Threat Throwdown,6*,Hunt Great Jagras + Great Girros + Dodogama
Gaze Upon the Dawn,6*,Guide Zorah Magdaros
A Flash in the Pan,6*,Hunt 3 Tzitzi-Ya-Ku
Mosswinin' and Dinin',6*,Hunt 5 Mosswine
A Royal Pain,7*,Hunt Rathian + Pink Rathian
Kings Know No Fear,7*,Hunt Azure Rathalos + Rathalos
USJ Balzing Azure Stars!,7*,Hunt Dodogama + Azure Rathalos
A Rush of Blood,7*,Hunt 2 Odogaron (Small Crown)
This is How Revolts Start,7*,Hunt Diablos + Black Diablos
Rollin' With The Uragaan,7*,Hunt 2 Uragaan
Coral Waltz,7*,Hunt Tzitzi-Ya-Ku + Paolumu + Pink Rathian + Legiana
Deep Green Blues,7*,Hunt Great Jagras + Pukei-Pukei + Tobi-Kadachi + Anjanath + Rathalos
Effluvial Opera,7*,Hunt Great Girros + Odogaron + Radobaan + Bazelgeuse
Wildspire Bolero,7*,Hunt Kulu-Ya-Ku + Barroth + Diablos + Jyuratodus + Rathian
Rock N' Roll Recess,7*,Hunt Dodogama + Lavasioth + Uragaan + Azure Rathalos
Code: Red,8*,Slay Anjanath + Odogaron + Rathalos + Teostra
A Simple Task,9*,Deliver 10 Gourmet Shroomcap
Tracking the Delivery,9*,Deliver 10 Blue Beryl
The Greatest Jagras,9*,Hunt a fearsome Great Jagras (Giant Crown
No Tomorrow for Usurpers,9*,Hunt Tempered Bazelgeuse
Relish the Moment,9*,Hunt Tempered Deviljho
A Nose fot an Eye,9*,Hunt Tempered Anjanath + Tempered Azure Rathalos
Keeper of the Otherworld,9*,Slay Xeno'Jiiva
Snow & Chery Blossoms,9*,Hunt Tempered Pink Rathian + Tempered Legiana
The Name's Lavasioth!,9*,Hunt Tempered Lavasioth (Giant Crown)
Banquet in the Earthen Hall,9*,Repel Kulve Taroth
A Visitor from Eorzea (Extreme),9*,Slay Tempered Behemoth
Contract: Woodland Spirit,9*,Slay Ancient Leshen
A Whisper of White Mane,9*,Slay Arch-Tempered Kirin
The Deathly Quiet Curtain,9*,Slay Arch-Tempered Vaal Hazak
The Scorn of the Sun,9*,Slay Arch-Tempered Teostra
The Eye of the Storm,9*,Slay Arch-Tempered Kushala Daora
The Heralds of Destruction City,9*,Slay Arch-Tempered Nergigante
When Blue Dust Surpasses Red Lust,9*,Slay Arch-Tempered  Lunastra
Undying Alpenglow,9*,Guide Arch-Tempered Zorah Magdaros
The Fury of El Dorado,9*,Repel Arch-Tempered Kulve Taroth
The Thronetaker,9*,Slay Tempered Nergigante + Tempered Teostra + Tempered Lunastra
Like a Moth to the Flame,9*,Slay Arch-Tempered Xeno'jiiva
The Lord of the Underworld Beckons,M1*,Deliver 20 Underground Fruit
Desert Desserts,M1*,Deliver 20 Hardfruit
Pearl Snatchers,M1*,Deliver 6 Pearlspring Macaque
A Bunch of Sticks in the Mud,M1*,Hunt 2 Banbaro
Skyward Snipers,M1*,Deliver 5 Grandfather Mantagrells
Trophy Fishin',M1*,Hunt 2 Beotodus
A Fish to Whet Your Appetite,M1*,Deliver 2 Great Whetfish
Fetching Light Pearls,M1*,Deliver 8 Light Pearls
Duffel Duty,M1*,Deliver 8 Duffel Penguins
Flora Frostbite,M1*,Deliver 10 Iceblooms
Paolumu Lullabies,M2*,Hunt Nightshade Paolumu
Every Hunter's Dream II,M2*,Capture Coral Pukei-Pukei
Kadachi Twins,M2*,Hunt Tobi-Kadachi (Miniature Crown) + Viper Tobi-Kadachi (Giant Crown)
Hunter-Blunderer,M2*,Hunt Radobaan + Viper Tobi-Kadachi
Balloon Fight,M2*,Hunt Paolumu  + Nightshade Paolumu
A New Troublemaker in Town,M2*,Hunt Anjanath  + Banbaro
Colorful Carnival,M2*,Hunt Kulu-Ya-Ku + Tzitzi-Ya-Ku + Pukei Pukei + Coral Pukei-Pukei
Camoflawed,M2*,Hunt Rathian
50 Shades of White,M3*,Hunt Barioth
Every Hunter's Dream III,M3*,Hunt Nightshade Paolumu + Nargacuga
A Curious Experiment,M3*,Hunt Diablos  + Nightshade Paolumu
Soaked and Shivering,M3*,Hunt Coral Pukei-Pukei + Legiana
A Sky & Sea of Fire,M3*,Hunt Rathalos + Lavasioth
Fired-Up Bruisers,M3*,Hunt Glavenus  + Uragaan
Seeing is Believing,M3*,Hunt Tigrex (Giant Crown)
When the Swift Meets the Roar,M3*,Hunt Tigrex and Nargacuga
Beef is Never a Mi-steak,M4*,Hunt Ebony Odogaron + Glavenus
The Desert Dash,M4*,Hunt Black Diablos + Tigrex
Servants of the Vale,M4*,Hunt Ebony Odogaron + Acidic Glavenus
In the Depths of the Forest,M4*,Hunt Azure Rathalos + Fulgur Anjanath
Scores of Ores,M5*,Hunt Brachydios
RE: Return of the Bioweapon,M5*,Slay Blackveil Vaal Hazak
A Reason Behind The Hunger,M5*,Hunt Savage Deviljho
"Old Dog, New Trick",M5*,Hunt Frostfang Barioth
Talk About a Party Foul...,M5*,Hunt Seething Bazelgeuse
USJ: Shine On Forever,M5*,Slay a Velkhana
USJ: Ballet of Frost,M5*,Hunt Frostfang Barioth
A Chilling Entrance,M5*,Slay Blackveil Vaal Hazak + Velkhana
The Winter Blues,M5*,Slay Velkhana  + Namielle
We Three Kings,M5*,Hunt Kirin  + Kushala Daora + Teostra
"I Am Tranquil, I Am Sound",M6*,Hunt Yian Garuga
Moonlit Howl,M6*,Hunt Zinogre
Scars Tell the Whole Story,M6*,Hunt Scarred Yian Garuga
A Glance of Silver,M6*,Hunt Silver Rathalos
A Roar that Splinters the Sky,M6*,Hunt Brute Tigrex
"Razzled, Frazzled and Dazzled",M6*,Hunt Rajang
The Moon is a Harsh Queen,M6*,Hunt Gold Rathian
The Red Dragon,M6*,Slay Safi'jiiva
The Eternal Gold Rush,M6*,Slay Kulve Taroth
A Shocking Climax,M6*,Hunt Zinogre + Namielle
The Naked Truth,M6*,Slay Shara Ishvalda
Tears From Nirvana,M6*,Slay Blackveil Vaal Hazaak
Monkey Business,M6*,Hunt Furious Rajang (Miniature Crown)
Brand New Brute,M6*,"Hunt Brute Tigrex (50% Miniature Crown, 50% Giant Crown)"
Mew are Number One!,M6*,Hunt Tempered Furious Rajang
Muscle Monkey Madness,M6*,Hunt 2x Rajang
Mighty Muscle Monkey Madness,M6*,Hunt 2x Furious Rajang (second Furious Rajang 100% Giant Crown)
A Farewell to Zinogre,M6*,"Hunt Zinogre (50% Miniature Crown, 50% Giant Crown)"
Heavy Metal in the Waste,M6*,Hunt Jyuratodus + Nightshade Paolumu + Glavenus  + Black Diablos + Savage Deviljho
Yodeling in the Forest,M6*,Hunt Anjanath  + Rathalos  + Nargacuga + Yian Garuga + Rajang
Rotten Canzone,M6*,Hunt Great Girros + Odogaron + Tigrex + Fulgur Anjanath + Acidic Glavenus
Symphony of the Coral,M6*,Hunt Paolumu + Coral Pukei-Pukei + Legiana + Ebony Odogaron + Zinogre
Alt Rock Recess,M6*,Hunt Banbaro + Uraguaan + Brachydios + Azure Rathalos + Seething Bazelgeuse
Ballad of the Hoarfrost,M6*,Hunt Beotodus + Viper Tobi-Kadachi + Barioth + Shierking Legiana + Stygian Zinogre
Wolf Out of Hell,M6*,Hunt Stygian Zinogre
The Wrath of Thunder Descends,M6*,Hunt Tempered Zinogre
Ode to the Destruction,M6*,Hunt Tempered Ruiner Nergigante
Don't Forget the Earplugs!,M6*,Hunt Yian Garuga (Miniature Crown)
The Evening Star,M6*,Slay Alatreon
Dawn of the Death Star,M6*,Slay Alatreon
Fade to Black,M6*,Slay Fatalis
The Last White Knight,M6*,Hunt Tempered Frostfang Barioth
In the Tempest's Wake,M6*,Slay Tempered Kushala
Day of Ruin,M6*,Slay Tempered Lunastra
The Cold Never Bothered Me,M6*,Slay Tempered Teostra
The Distant Dark Tide,M6*,Slay Arch-Tempered Namielle
The Place Where Winter Sleeps,M6*,Slay Arch-Tempered Velkhana`

parse(optionalQuests, {
  columns: true,
  skip_empty_lines: true
}, (_, records) => {
  let output = "[\n"

  output += records.map(({Quest, Star, Objective}) => {
    return `  {
    "name": "${Quest}",
    "star": "${Star}",
    "objective": "${Objective.replaceAll("\n", "\\n").replaceAll('"', '\\"')}",
    "tags": {
      "star": "${Star.substring(0, Star.length - 1)}",
      "rank": "${isNaN(parseInt(Star.substring(0, Star.length - 1)))
        ? 'Master'
        : (parseInt(Star.substring(0, Star.length - 1)) > 5 ? 'High' : 'Low')}",
      "type": "Optional"
    }
  }`
  }).join(",\n")

  output += ',\n'

  writeFileSync("src/quests.json", output)

  parse(eventQuests, {
    columns: true,
    skip_empty_lines: true
  }, (_, records) => {
    let output = records.map(({Quest, Star, Objective}) => {
      return `  {
    "name": "${Quest}",
    "star": "${Star}",
    "objective": "${Objective.replaceAll("\n", "\\n").replaceAll('"', '\\"')}",
    "tags": {
      "star": "${Star.substring(0, Star.length - 1)}",
      "rank": "${isNaN(parseInt(Star.substring(0, Star.length - 1)))
        ? 'Master'
        : (parseInt(Star.substring(0, Star.length - 1)) > 5 ? 'High' : 'Low')}",
      "type": "Event"
    }
  }`
    }).join(",\n")

    output += "\n]"

    appendFileSync("src/quests.json", output)
  })

})
