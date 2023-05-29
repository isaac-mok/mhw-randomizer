const { writeFileSync } = require("fs")
const { parse } = require('csv-parse')

const input = `name,star,objective
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

parse(input, {
  columns: true,
  skip_empty_lines: true
}, (_, records) => {
  let output = "[\n"

  output += records.map(({name, star, objective}) => {
    return `  {
    "name": "${name}",
    "star": "${star}",
    "objective": "${objective}",
    "tags": {
      "star": "${star.substring(0, star.length - 1)}",
      "rank": "${isNaN(parseInt(star.substring(0, star.length - 1)))
        ? 'Master'
        : (parseInt(star.substring(0, star.length - 1)) > 5 ? 'High' : 'Low')}",
      "type": "Event"
    }
  }`
  }).join(",\n")

  output += "\n]"

  writeFileSync("quests-autogenerated.json", output)
})
