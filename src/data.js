// ── Alle woorden & zinnen ─────────────────────────────────

export const WORD_CATS = [
  { id: 'pronoun', label: 'Voornaamwoorden', items: [
    ['jeg','ik'],['du','jij'],['han','hij'],['hun','zij (enk)'],['vi','wij'],['dere','jullie'],
    ['de','zij (mv)'],['det','het / dat'],['dette','dit'],['den','die / de'],['meg','mij'],
    ['deg','jou'],['seg','zich'],['oss','ons'],['min','mijn'],['din','jouw'],
    ['sin','zijn / haar (refl)'],['vår','onze'],['deres','hun'],['hvem','wie'],['hva','wat'],
    ['hvilken','welke'],['ingen','niemand / geen'],['noen','iemand / sommige'],['alle','iedereen'],['hverandre','elkaar'],
  ]},
  { id: 'verb', label: 'Werkwoorden', items: [
    ['være','zijn'],['ha','hebben'],['gjøre','doen'],['gå','gaan'],['komme','komen'],
    ['si','zeggen'],['se','zien / kijken'],['vite','weten'],['ville','willen'],['skulle','zullen / moeten'],
    ['kunne','kunnen'],['måtte','moeten'],['få','krijgen / mogen'],['ta','nemen'],['gi','geven'],
    ['bli','worden / blijven'],['tenke','denken'],['tro','geloven / denken'],['snakke','praten'],
    ['jobbe','werken'],['hjelpe','helpen'],['finne','vinden'],['forstå','begrijpen'],['lære','leren'],
    ['betale','betalen'],['kjøpe','kopen'],['spise','eten'],['drikke','drinken'],['sove','slapen'],
    ['bo','wonen'],['reise','reizen'],['kjøre','rijden'],['løpe','rennen'],['svømme','zwemmen'],
    ['høre','horen'],['lese','lezen'],['skrive','schrijven'],['åpne','openen'],['lukke','sluiten'],
    ['sende','sturen'],['ringe','bellen'],['bruke','gebruiken'],['prøve','proberen'],['vente','wachten'],
    ['ønske','wensen'],['like','leuk vinden'],['elske','houden van'],['hate','haten'],['trenge','nodig hebben'],
  ]},
  { id: 'adj', label: 'Bijvoeglijke naamwoorden', items: [
    ['god','goed'],['bra','prima / goed'],['dårlig','slecht'],['stor','groot'],['liten','klein'],
    ['ny','nieuw'],['gammel','oud'],['ung','jong'],['vakker','mooi'],['stygg','lelijk'],
    ['rask','snel'],['langsom','langzaam'],['varm','warm'],['kald','koud'],
    ['full','vol'],['tom','leeg'],['lett','makkelijk / licht'],['tung','zwaar / moeilijk'],
    ['riktig','juist / correct'],['feil','fout / verkeerd'],['viktig','belangrijk'],['morsom','grappig'],
    ['kjedelig','saai'],['interessant','interessant'],['lykkelig','gelukkig'],['trist','verdrietig'],
    ['sulten','hongerig'],['tørst','dorstig'],['trøtt','moe'],['frisk','gezond'],
    ['syk','ziek'],['sterk','sterk'],['svak','zwak'],['voksen','volwassen'],
  ]},
  { id: 'adv', label: 'Bijwoorden & voegwoorden', items: [
    ['her','hier'],['der','daar'],['nå','nu'],['da','toen / dan'],['alltid','altijd'],['aldri','nooit'],
    ['ofte','vaak'],['noen ganger','soms'],['kanskje','misschien'],['selvfølgelig','natuurlijk'],
    ['egentlig','eigenlijk'],['veldig','heel / erg'],['litt','een beetje'],['bare','alleen maar'],
    ['også','ook'],['allerede','al'],['fortsatt','nog steeds'],['snart','binnenkort'],
    ['tidlig','vroeg'],['sent','laat'],['og','en'],['eller','of'],['men','maar'],
    ['fordi','omdat'],['hvis','als / indien'],['mens','terwijl'],['etter','na / nadat'],
    ['før','voor / voordat'],['at','dat (voegw)'],['om','over / of'],['fra','van / uit'],
    ['til','naar / tot'],['med','met'],['uten','zonder'],['på','op / aan'],['i','in'],['av','van'],
  ]},
  { id: 'question', label: 'Vragen & richting', items: [
    ['hva','wat'],['hvem','wie'],['hvor','waar'],['når','wanneer'],['hvorfor','waarom'],
    ['hvordan','hoe'],['hvor mye','hoeveel'],['til venstre','links'],['til høyre','rechts'],
    ['rett frem','rechtdoor'],['opp','omhoog'],['ned','omlaag'],['inn','naar binnen'],
    ['ut','naar buiten'],['nord','noorden'],['sør','zuiden'],['øst','oosten'],['vest','westen'],
    ['nær','dichtbij'],['langt','ver weg'],
  ]},
  { id: 'time', label: 'Tijd & getallen', items: [
    ['dag','dag'],['natt','nacht'],['morgen','ochtend / morgen'],['ettermiddag','middag'],
    ['kveld','avond'],['uke','week'],['måned','maand'],['år','jaar'],
    ['i dag','vandaag'],['i morgen','morgen'],['i går','gisteren'],
    ['mandag','maandag'],['tirsdag','dinsdag'],['onsdag','woensdag'],
    ['torsdag','donderdag'],['fredag','vrijdag'],['lørdag','zaterdag'],['søndag','zondag'],
    ['januar','januari'],['februar','februari'],['mars','maart'],['april','april'],
    ['mai','mei'],['juni','juni'],['juli','juli'],['august','augustus'],
    ['september','september'],['oktober','oktober'],['november','november'],['desember','december'],
    ['en','één'],['to','twee'],['tre','drie'],['fire','vier'],['fem','vijf'],
    ['seks','zes'],['sju','zeven'],['åtte','acht'],['ni','negen'],['ti','tien'],
    ['tjue','twintig'],['tretti','dertig'],['hundre','honderd'],['tusen','duizend'],
  ]},
  { id: 'daily', label: 'Dagelijks leven', items: [
    ['mat','eten / voedsel'],['vann','water'],['hus','huis'],['leilighet','appartement'],
    ['jobb','werk / baan'],['skole','school'],['by','stad'],['gate','straat'],
    ['bil','auto'],['tog','trein'],['buss','bus'],['fly','vliegtuig'],
    ['penger','geld'],['kort','kaart / betaalpas'],['butikk','winkel'],['marked','markt'],
    ['restaurant','restaurant'],['kafé','café'],['sykehus','ziekenhuis'],['lege','dokter'],
    ['apotek','apotheek'],['telefon','telefoon'],['datamaskin','computer'],['nett','internet'],
    ['dør','deur'],['vindu','raam'],['kjøkken','keuken'],['bad','badkamer'],
    ['seng','bed'],['sofa','bank / sofa'],['bord','tafel'],['stol','stoel'],
    ['familie','familie'],['venn','vriend'],['kjæreste','vriend(in) / geliefde'],
    ['barn','kind'],['navn','naam'],['adresse','adres'],['nøkkel','sleutel'],
    ['tid','tijd'],['sted','plek'],['vei','weg'],['kart','kaart'],
  ]},
  { id: 'nature', label: 'Natuur & Noorwegen', items: [
    ['nordlys','noorderlicht'],['midnattssol','middernachtzon'],['hytte','vakantiehuisje'],
    ['kyst','kust'],['øy','eiland'],['dal','dal'],['innsjø','meer'],['foss','waterval'],
    ['isbre','gletsjer'],['ulv','wolf'],['bjørn','beer'],['elg','eland'],['laks','zalm'],
    ['ørn','adelaar'],['blomst','bloem'],['tre','boom'],['skog','bos'],['hav','zee / oceaan'],
    ['elv','rivier'],['stein','steen'],['sand','zand'],['vær','weer'],['sol','zon'],
    ['regn','regen'],['snø','sneeuw'],['vind','wind'],['tåke','mist'],['sky','wolk'],
    ['fjord','fjord'],['fjell','berg'],['strand','strand'],
  ]},
]

export const PHRASE_CATS = [
  { tag: 'begroeting', items: [
    ['Hei!','Hoi!'],['Hallo!','Hallo!'],['God morgen!','Goedemorgen!'],['God dag!','Goedemiddag!'],
    ['God kveld!','Goedenavond!'],['God natt!','Goedenacht!'],['Ha det bra!','Tot ziens!'],
    ['Vi ses!','We zien elkaar!'],['Vi ses snart!','Tot snel!'],
    ['Hvordan har du det?','Hoe gaat het met je?'],['Det går bra, takk!','Het gaat goed, bedankt!'],
    ['Bare bra!','Prima!'],['Ikke så bra.','Niet zo goed.'],['Hva med deg?','En jij?'],
  ]},
  { tag: 'beleefdheid', items: [
    ['Takk!','Bedankt!'],['Tusen takk!','Heel erg bedankt!'],['Ingen årsak!','Geen dank!'],
    ['Vær så god!','Alsjeblieft / Graag gedaan!'],['Unnskyld meg!','Pardon / Excuseer!'],
    ['Beklager!','Sorry!'],['Det er greit!','Het is oké!'],['Selvfølgelig!','Natuurlijk!'],
    ['Jeg forstår.','Ik begrijp het.'],['Ikke noe problem.','Geen probleem.'],
    ['Det var hyggelig!','Dat was gezellig!'],['Lykke til!','Veel succes!'],
    ['Pass på deg selv!','Pas goed op jezelf!'],['God tur!','Goede reis!'],
  ]},
  { tag: 'introductie', items: [
    ['Hva heter du?','Hoe heet jij?'],['Jeg heter Max.','Ik heet Max.'],
    ['Hyggelig å møte deg!','Leuk je te ontmoeten!'],['Hvor er du fra?','Waar kom jij vandaan?'],
    ['Jeg er fra Nederland.','Ik kom uit Nederland.'],['Hvor gammel er du?','Hoe oud ben jij?'],
    ['Jeg er atten år.','Ik ben achttien jaar.'],['Hva jobber du med?','Wat doe jij voor werk?'],
    ['Jeg er utvikler.','Ik ben developer.'],['Jeg bor i Rotterdam.','Ik woon in Rotterdam.'],
    ['Jeg lærer norsk.','Ik leer Noors.'],['Jeg planlegger å flytte til Norge.','Ik plan naar Noorwegen te verhuizen.'],
    ['Jeg snakker litt norsk.','Ik spreek een beetje Noors.'],['Norsk er et vakkert språk.','Noors is een mooie taal.'],
  ]},
  { tag: 'vragen', items: [
    ['Kan du hjelpe meg?','Kun je me helpen?'],['Vet du hvor ... er?','Weet jij waar ... is?'],
    ['Hva koster det?','Wat kost het?'],['Kan du gjenta det?','Kun je dat herhalen?'],
    ['Hva betyr det?','Wat betekent dat?'],['Kan du snakke saktere?','Kun je langzamer praten?'],
    ['Jeg forstår ikke.','Ik begrijp het niet.'],['Jeg snakker ikke norsk så godt.','Ik spreek niet zo goed Noors.'],
    ['Snakker du engelsk?','Spreek jij Engels?'],['Hvordan sier man ... på norsk?','Hoe zeg je ... in het Noors?'],
    ['Kan du skrive det ned?','Kun je het opschrijven?'],['Hva sa du?','Wat zei je?'],
    ['Hva mener du?','Wat bedoel je?'],['Kan du hjelpe meg å forstå?','Kun je me helpen het te begrijpen?'],
  ]},
  { tag: 'praktisch', items: [
    ['Hvor er toalettet?','Waar is het toilet?'],['Kan jeg få regningen?','Kan ik de rekening?'],
    ['Jeg vil gjerne bestille...','Ik wil graag bestellen...'],['Har dere et bord ledig?','Hebben jullie een tafel vrij?'],
    ['Kan jeg betale med kort?','Kan ik met pas betalen?'],['Hvor er nærmeste apotek?','Waar is de dichtstbijzijnde apotheek?'],
    ['Ring etter ambulanse!','Bel een ambulance!'],['Jeg trenger hjelp!','Ik heb hulp nodig!'],
    ['Kan du ringe politiet?','Kun je de politie bellen?'],['Jeg har mistet lommeboken min.','Ik ben mijn portemonnee kwijtgeraakt.'],
    ['Jeg er syk.','Ik ben ziek.'],['Jeg har vondt i magen.','Ik heb buikpijn.'],
    ['Er det en lege i nærheten?','Is er een dokter in de buurt?'],['Jeg er allergisk mot...','Ik ben allergisch voor...'],
  ]},
  { tag: 'transport', items: [
    ['Hvor går bussen til...?','Welke bus gaat naar...?'],['Når kommer toget?','Wanneer komt de trein?'],
    ['En billett til Bergen, takk.','Eén kaartje naar Bergen, graag.'],['Er det langt herfra?','Is het ver hiervandaan?'],
    ['Kan du kjøre meg til...?','Kun je me naar... rijden?'],['Hvor kan jeg parkere?','Waar kan ik parkeren?'],
    ['Ta til venstre / høyre.','Ga links / rechts.'],['Gå rett frem.','Ga rechtdoor.'],
    ['Stopp her, takk.','Stop hier, graag.'],['Hvor lenge tar det?','Hoe lang duurt het?'],
    ['Hva er prisen?','Wat is de prijs?'],['Går det buss dit?','Gaat er een bus daarheen?'],
    ['Kan jeg kjøpe billett her?','Kan ik hier een kaartje kopen?'],['Neste stopp, vær så god.','Volgende halte graag.'],
  ]},
  { tag: 'wonen & werk', items: [
    ['Jeg leter etter en leilighet.','Ik zoek een appartement.'],['Hva er husleien?','Wat is de huur?'],
    ['Er strøm inkludert?','Is stroom inbegrepen?'],['Jeg jobber hjemmefra.','Ik werk vanuit huis.'],
    ['Kontoret er i sentrum.','Het kantoor is in het centrum.'],['Jeg har en avtale klokken ni.','Ik heb een afspraak om negen uur.'],
    ['Kan vi møtes i morgen?','Kunnen we morgen afspreken?'],['Jeg sender deg en e-post.','Ik stuur je een e-mail.'],
    ['Prosjektet er ferdig.','Het project is klaar.'],['Vi trenger mer tid.','We hebben meer tijd nodig.'],
    ['Jeg jobber som utvikler.','Ik werk als developer.'],['Vi har et møte i dag.','We hebben vandaag een vergadering.'],
    ['Kan du sende meg filen?','Kun je me het bestand sturen?'],['Hva er adressen?','Wat is het adres?'],
  ]},
  { tag: 'natuur', items: [
    ['Hvordan er været i dag?','Hoe is het weer vandaag?'],['Det regner.','Het regent.'],
    ['Det er sol i dag.','Het is zonnig vandaag.'],['Det er veldig kaldt!','Het is heel koud!'],
    ['Snør det mye her?','Sneeuwt het veel hier?'],['Fjorden er vakker.','De fjord is mooi.'],
    ['Jeg elsker naturen her.','Ik hou van de natuur hier.'],['Kan vi gå på tur?','Kunnen we gaan wandelen?'],
    ['Hvor høy er dette fjellet?','Hoe hoog is deze berg?'],['Nordlyset er fantastisk!','Het noorderlicht is fantastisch!'],
    ['Ser du noe dyreliv?','Zie je dieren in het wild?'],['Vannet er iskaldt.','Het water is ijskoud.'],
    ['Utsikten er utrolig!','Het uitzicht is ongelooflijk!'],['Jeg vil bo nær naturen.','Ik wil dicht bij de natuur wonen.'],
  ]},
  { tag: 'sociaal', items: [
    ['Det er interessant!','Dat is interessant!'],['Jeg er enig.','Ik ben het ermee eens.'],
    ['Jeg er uenig.','Ik ben het er niet mee eens.'],['Hva synes du?','Wat vind jij?'],
    ['Jeg vet ikke.','Ik weet het niet.'],['Det er opp til deg.','Het is aan jou.'],
    ['Hva liker du å gjøre?','Wat doe jij graag?'],['Har du planer i helgen?','Heb jij plannen in het weekend?'],
    ['La oss finne ut av det!','Laten we het uitzoeken!'],['Skal vi ta en kaffe?','Zullen we koffie drinken?'],
    ['Jeg koser meg!','Ik geniet ervan!'],['Det var morsomt!','Dat was leuk!'],
    ['Vi har det bra her.','We hebben het goed hier.'],['Kan vi henge ut en dag?','Kunnen we een dag afspreken?'],
  ]},
  { tag: 'gevoel', items: [
    ['Jeg er glad!','Ik ben blij!'],['Jeg er trøtt.','Ik ben moe.'],
    ['Jeg er sulten.','Ik ben hongerig.'],['Jeg er tørst.','Ik heb dorst.'],
    ['Jeg er nervøs.','Ik ben nerveus.'],['Jeg savner deg.','Ik mis je.'],
    ['Jeg liker deg.','Ik mag je.'],['Det gjør vondt.','Het doet pijn.'],
    ['Jeg er ikke i form.','Ik voel me niet goed.'],['Alt er bra med meg.','Alles is goed met mij.'],
    ['Jeg er stolt!','Ik ben trots!'],['Jeg er spent!','Ik ben opgewonden / zenuwachtig!'],
    ['Det gleder meg!','Dat verheugt me!'],['Jeg er frustrert.','Ik ben gefrustreerd.'],
  ]},
]

// Flatten to single array
export const ALL_ITEMS = (() => {
  const out = []
  WORD_CATS.forEach(c => c.items.forEach(([no, nl]) =>
    out.push({ type: 'word', cat: c.id, catLabel: c.label, no, nl })
  ))
  PHRASE_CATS.forEach(c => c.items.forEach(([no, nl]) =>
    out.push({ type: 'phrase', cat: c.tag, catLabel: c.tag, no, nl })
  ))
  return out
})()

export const itemKey = i => `${i.type}|${i.no}`

export const shuffle = arr => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
