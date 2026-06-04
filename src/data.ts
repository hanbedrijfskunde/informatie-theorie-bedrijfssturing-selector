import { EdstackConnection, QuizQuestion } from './types';

export const EDSTACK_CONNECTIONS: EdstackConnection[] = [
  {
    id: "edstack-1",
    title: "Edstack 1: Digitale economie & e-business",
    officialGoal: "Je kunt uitleggen hoe de manier waarop organisaties sturen, beïnvloed wordt door digitalisering en digitale bedrijfsmodellen.",
    shannonConcept: "Informatiecompressie & Transactiekosten",
    analogy: "Shannon bewees dat we informatie kunnen comprimeren tot de absolute grens van de 'bron-entropy'. In de economie is een platform (zoals Bol.com) een 'informatie-encoder'. Het reduceert transactiekosten (zoek-, onderhandelings- en controlekosten van Williamson) door informatie efficiënt te encoderen, structureren en onzekerheid weg te nemen. Netwerkeffecten zijn in feite positieve feedbacklussen in het communicatiekanaal."
  },
  {
    id: "edstack-2",
    title: "Edstack 2: Datagedreven sturen",
    officialGoal: "Na afloop van deze Edstack kun je uitleggen waarom je als bedrijfskundige kennis moet hebben van informatiemanagement, en hoe KPI's en data-analyse bijdragen aan datagedreven sturing.",
    shannonConcept: "Entropy (H) als maatstaf voor Onzekerheid",
    analogy: "Informatie is volgens Shannon letterlijk 'de reductie van onzekerheid/entropy'. Een bedrijf begint in een staat van hoge entropy (onzekerheid over de markt, klantgedrag). KPI's, analyses en dataverzameling verlagen deze entropy. Descriptive analytics brengt de historische entropy in kaart; predictive analytics (met regressed en AI) voorspelt toekomstige staten om de resterende onzekerheid te minimaliseren."
  },
  {
    id: "edstack-3",
    title: "Edstack 3: Veranderen & verbeteren",
    officialGoal: "Na afloop van deze Edstack kun je uitleggen wat monitoring en bijsturing betekenen binnen veranderprocessen, en welke methoden daarbij passen.",
    shannonConcept: "Foutcorrectie & Ruis-Feedbacklussen (PDCA)",
    analogy: "Wanneer je een verandering of project (een signaal) door een organisatie (een ruizig kanaal) stuurt, ontstaan er fouten. Shannon stelde voor om redundantie (foutencontrole) toe te voegen om betrouwbaarheid te herstellen. De PDCA-cyclus (Plan-Do-Check-Act) en Agile-sprints werken exact als Shannons foutcorrectie-mechanisme. Ze meten ruis ('Check') en sturen bij ('Act') om te zorgen dat het oorspronkelijke doelsignaal foutloos aankomt."
  },
  {
    id: "edstack-4",
    title: "Edstack 4: Regie op informatievoorziening",
    officialGoal: "Je legt uit hoe business-IT alignment en informatiemanagement bijdragen aan regie over de informatievoorziening van een organisatie.",
    shannonConcept: "Kanaalcapaciteit (Shannon-Hartley limiet)",
    analogy: "Shannons bekendste stelling is dat elk kanaal een maximale capaciteit (C) heeft om informatie betrouwbaar over te dragen, bepaald door bandbreedte en de signaal-ruisverhouding (SNR). Business-IT alignment (het negenvlaksmodel van Rik Maes) is het synchroniseren en optimaliseren van dit kanaal. Slechte alignment is gelijk aan technologische en organisatorische 'ruis', wat de effectieve overdrachtscapaciteit van strategische plannen reduceert."
  }
];

export const SYNTHESE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Wat is volgens Claude Shannon de fundamentele definitie van 'informatie'?",
    options: [
      "De hoeveelheid bytes die opgeslagen is in een database of data lake.",
      "De reductie van onzekerheid (gekozen uit een set mogelijke toestanden).",
      "De snelheid waarmee gegevens door een glasvezelkabel reizen.",
      "Een georganiseerde set van KPI's in een managementdashboard."
    ],
    correctAnswerIndex: 1,
    explanation: "Shannon definieerde informatie wiskundig als de mate waarin onzekerheid wordt verminderd. Hoe minder voorspelbaar een gebeurtenis is, hoe meer informatie de uitkomst ervan bevat.",
    edstackId: "edstack-2"
  },
  {
    id: 2,
    question: "Hoe sluit Williamson's transactiekostentheorie (Edstack 1) aan op Shannon's compressietheorie?",
    options: [
      "Transactiekosten zijn altijd gelijk aan de absolute bandbreedte van de IT-infrastructuur.",
      "Zoekkosten en onderhandelingskosten vertegenwoordigen 'informatie-ruis'. Digitale platforms verlagen deze kosten door efficiënte standaarden (codering).",
      "Maatwerksoftware is altijd goedkoper in transactiekosten dan standaardsoftware.",
      "Er is geen enkele link; economie en informatietheorie staan volledig los van elkaar."
    ],
    correctAnswerIndex: 1,
    explanation: "Transactiekosten (zoekkosten, onderhandelingskosten, controlekosten) komen voort uit informatie-asymmetrie en onzekerheid. Platforms fungeren als efficiënte 'encoders' die communicatie stroomlijnen, fouten minimaliseren en zo transactiekosten rigoureus verlagen.",
    edstackId: "edstack-1"
  },
  {
    id: 3,
    question: "Als een kledingwinkel (Edstack 2) geen enkele verkoopdata bijhoudt, hoe kunnen we de entropy (H) van de voorraadvraag beschrijven?",
    options: [
      "De entropy is nul, want de winkelier weet intuïtief wat de klant wil.",
      "De entropy is maximaal (H = maximum), omdat alle mogelijke vraagscenario's even waarschijnlijk (onduidelijk) zijn.",
      "De entropy is gelijk aan de totale omzet in euro's.",
      "De entropy is alleen afhankelijk van de grootte van de winkel."
    ],
    correctAnswerIndex: 1,
    explanation: "Entropy is maximaal bij een uniforme verdeling (wanneer alles even onzeker is). Zonder data is elke potentiële vraag naar kleding een gok, wat leidt tot maximale onzekerheid en dus maximale entropy.",
    edstackId: "edstack-2"
  },
  {
    id: 4,
    question: "In Edstack 2 spreken we over 'Predictive Analytics' (voorspellende analyses). Wat doet dit met de entropy van bedrijfsbeslissingen?",
    options: [
      "Het verhoogt de entropy omdat er meer data bijkomt.",
      "Het heeft geen invloed op entropy, enkel op de winst.",
      "Het verlaagt de entropy door de waarschijnlijkheidsverdeling van toekomstige staten scherper te maken (minder onzekerheid).",
      "Het elimineert alle entropy volledig tot een absolute nul in elke situatie."
    ],
    correctAnswerIndex: 2,
    explanation: "Predictive Analytics gebruikt historische patronen (regressie, algoritmen) om de waarschijnlijkheid van toekomstige scenario's te berekenen. Hierdoor neemt de onzekerheid af, wat mathematisch gelijkstaat aan het verlagen van de resterende entropy.",
    edstackId: "edstack-2"
  },
  {
    id: 5,
    question: "We sturen een veranderingsboodschap (Edstack 3: CampusBite) door een organisatie. Waarom is de PDCA-cyclus vergelijkbaar met Shannons feedback-kanaal?",
    options: [
      "Omdat de letter 'P' staat voor 'Parity check'.",
      "Omdat PDCA continu fouten en misverstanden (ruis) in de implementatie ('Do') meet ('Check') en corrigeert ('Act').",
      "Omdat PDCA ervoor zorgt dat werknemers sneller praten.",
      "Omdat met PDCA de computers stiller worden."
    ],
    correctAnswerIndex: 1,
    explanation: "De PDCA-cyclus fungeert als een adaptieve feedbacklus. In de informatietheorie zorgt een feedbackkanaal ervoor dat de zender weet of het signaal corrupt is aangekomen, zodat corrigerende signalen gezonden kunnen worden.",
    edstackId: "edstack-3"
  },
  {
    id: 6,
    question: "Welke probleemoplossingsmethode uit Edstack 3 past het best bij het bestrijden van 'procesvariatie als ruis'?",
    options: [
      "Design Thinking, want dat richt zich op de emotie.",
      "Lean A3, want dat lost alleen computerproblemen op.",
      "DMAIC (Six Sigma), omdat dit procesdeviatie (variatie/ruis) systematisch meet, analyseert en onder controle brengt.",
      "Een traditioneel watervalproject."
    ],
    correctAnswerIndex: 2,
    explanation: "DMAIC (Define, Measure, Analyze, Improve, Control) is ontworpen om kwaliteitsproblemen veroorzaakt door ongewenste variatie (procesruis) te elimineren en processen voorspelbaar te maken.",
    edstackId: "edstack-3"
  },
  {
    id: 7,
    question: "Hoe kunnen we 'Business-IT Alignment' (Edstack 4: Neginvlaksmodel) vertalen naar de Shannon-Hartley stelling?",
    options: [
      "Business-IT Alignment verhoogt de signaalsterkte (S) van strategische doelen en minimaliseert de organisatorische ruis (N), waardoor de strategische doorvoercapaciteit (C) stijgt.",
      "Alignment is uitsluitend de snelheid van de routers (S) gedeeld door de afstand (N).",
      "Het negenvlaksmodel stelt dat IT-architecturen altijd met glasvezel uitgerust moeten zijn.",
      "Het verlaagt de bandbreedte zodat medewerkers niet overbelast raken."
    ],
    correctAnswerIndex: 0,
    explanation: "Volgens de Shannon-Hartley wet hangt de capaciteit van een kanaal direct samen met de Signaal-Ruisverhouding (S/N). Goede alignment zorgt ervoor dat de strategische visie (signaal) niet verdrinkt in organisatorische en technologische chaos (ruis).",
    edstackId: "edstack-4"
  },
  {
    id: 8,
    question: "Waarom is een Data Warehouse (Edstack 4) superieur aan losse operationele databases qua 'informatieruis' bij besluitvorming?",
    options: [
      "Een Data Warehouse heeft grotere beeldschermen.",
      "Het integreert en structureert versnipperde data, wat inconsistenties en tegenstrijdigheden (dataruis) tussen systemen weghaalt.",
      "Het slaat alleen ongestructureerde rauwe data op zoals foto's en geluidsfragmenten.",
      "Er is geen verschil qua ruis."
    ],
    correctAnswerIndex: 1,
    explanation: "Inconsistenties tussen systemen zorgen voor 'tegenstrijdige signalen' (ruis). Een Data Warehouse creëert één betrouwbare bron ('Single Source of Truth'), waardoor data-inconsistenties worden gezuiverd en betrouwbare besluitvorming mogelijk is.",
    edstackId: "edstack-4"
  },
  {
    id: 9,
    question: "Wanneer we spreken over Agile werken en Scrum (Edstack 3), hoe verhoudt zich dit tot het minimaliseren van risico's bij onbekende klantbehoeften?",
    options: [
      "Agile voorkomt dat we überhaupt informatie hoeven op te slaan.",
      "Agile verkort de feedback-cyclus naar sprints van 2-4 weken, waardoor we de entropy over de klantbehoefte sneller en stapsgewijs afbouwen.",
      "Agile is gebaseerd op het uitsluiten van communicatie met de klant.",
      "Met Agile is de bandbreedte van de informatiestromen altijd nul."
    ],
    correctAnswerIndex: 1,
    explanation: "Doordat in Agile/Scrum snel werkende incrementen worden opgeleverd, krijgt het team direct feedback. Dit functioneert als regelmatige signaalcontrole-momenten die verhinderen dat een project langdurig uit koers (ruis) raakt.",
    edstackId: "edstack-3"
  },
  {
    id: 10,
    question: "Wat is bij cloud- en enterprise-architectuur (Edstack 4) het grootste voordeel van het vermijden van 'spaghetti-koppelingen'?",
    options: [
      "De code wordt er groener van.",
      "Het verlaagt de technologische complexiteit, wat de kans op transmissiefouten en onvoorspelbare systeemreacties (ruis) drastisch vermindert.",
      "Spaghetti is moeilijker te eten tijdens lunchpauzes.",
      "Systeemarchitectuur is puur esthetisch en heeft geen invloed op operationele prestaties."
    ],
    correctAnswerIndex: 1,
    explanation: "Elke onnodige ad-hoc koppeling verhoogt de systeemcomplexiteit (vergelijkbaar met het introduceren van extra storinggevoelige knooppunten in Shannons communicatieketen). Een heldere architectuur beschermt de signaalintegriteit van datastromen.",
    edstackId: "edstack-4"
  }
];

export interface TimeSlot {
  time: string;
  duration: number;
  title: string;
  activityDocent: string;
  activityStudent: string;
  linkEdstack: string;
  shannonFocus: string;
}

export const LESSON_PLAN: TimeSlot[] = [
  {
    time: "00:00 - 00:15",
    duration: 15,
    title: "Interactieve Introductie: De Wereld als Communicatiekanaal",
    activityDocent: "Introduceer Claude Shannon (1948). Teken het klassieke zender-kanaal-ontvanger model op het bord. Maak de koppeling: een organisatie is óók een kanaal dat strategie omzet in executie.",
    activityStudent: "Openen de webapp. Doorlopen de Shannon introductie en bekijken de interactieve diagram.",
    linkEdstack: "Edstack 4 (Regie & Alignment)",
    shannonFocus: "Systeemmodel van Shannon"
  },
  {
    time: "00:15 - 00:35",
    duration: 20,
    title: "Simulatie: Wat is Onzekerheid (Entropy)?",
    activityDocent: "Leg de wiskunde van Entropy uit. Laat zien dat onzekerheid maximaal is bij 50/50 kans. Koppel aan Edstack 2: Waarom verzamelen we data? Om entropy (onzekerheid) te verlagen zodat we betere beslissingen nemen.",
    activityStudent: "Gebruiken de 'Entropy Simulator'. Verschuiven kansen van KPI's en zien live hoe de wiskundige entropy (bitwaarde) reageert en wat dat betekent voor datavolwassenheid.",
    linkEdstack: "Edstack 2 (Datagedreven Sturen & Analysetypen)",
    shannonFocus: "Informatie Entropy - H(X)"
  },
  {
    time: "00:35 - 00:50",
    duration: 15,
    title: "Simulatie: Platforms en Compressie (Zoek- & Transactiekosten)",
    activityDocent: "Introduceer Williamson's transactiekosten (Edstack 1). Leg uit dat zoekkosten pure 'redundantie' en ruis zijn. Platforms comprimeren deze informatie.",
    activityStudent: "Gebruiken de 'Compressie & Transactiekosten Simulator'. Ervaar hoe efficiënte codering (Huffman) de gemiddelde bit-lengte van transacties verlaagt.",
    linkEdstack: "Edstack 1 (Platformeconomie & Transactiekosten)",
    shannonFocus: "Source Coding Theorem (Informatie-efficiency)"
  },
  {
    time: "00:50 - 01:10",
    duration: 20,
    title: "Simulatie: Kanaalcapaciteit & Alignment",
    activityDocent: "Behandel de Shannon-Hartley wet. Koppel aan alignment (Edstack 4): Hoe breder de bandbreedte (goede tools) en hoe sterker ons signaal (visie) ten opzichte van de ruis (legacy, miscommunicatie), hoe meer strategische waarde we verwerken.",
    activityStudent: "Spelen met de 'Kanaal Simulator'. Verhogen de ruis (storing) en ervaren live bit-flips in de datatransmissie. Schakelen tussen 'Geen Alignment' en 'Sterke Alignment' (foutcorrectie codes).",
    linkEdstack: "Edstack 4 (IT Architectuur, alignment) & Edstack 3 (PDCA & DMAIC)",
    shannonFocus: "Channel Capacity & Error Correction"
  },
  {
    time: "01:10 - 01:25",
    duration: 15,
    title: "Systeemsynthese & Competitie Quiz",
    activityDocent: "Faciliteer de synthesequiz. Bespreek de klassenbrede resultaten en licht kritieke overbruggingsvragen toe.",
    activityStudent: "Beantwoorden de 10 uitdagende toepassingsvragen in de webapp en bekijken de gedetailleerde toelichtingen.",
    linkEdstack: "Alle vier de Edstacks gekoppeld aan de theorie",
    shannonFocus: "Integratie & Toepassing"
  },
  {
    time: "01:25 - 01:30",
    duration: 5,
    title: "Lesson Wrap-up",
    activityDocent: "Concludeer: IT-infomatiedashboards en veranderprocessen zijn geen losse droge theorie, maar natuurkundige wetmatigheden van informatie- en ruisbeheersing. Geef huiswerkopdracht uit de Edstacks.",
    activityStudent: "Vullen de afsluitende reflectie in en formuleren hun Shannon-geïnspireerde leerdoel.",
    linkEdstack: "Wrap-ups MyEdumundo",
    shannonFocus: "Metacognitieve reflectie"
  }
];
