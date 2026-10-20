import eva00 from '../assets/cans/eva-00.png';
import eva01 from '../assets/cans/eva-01.png';
import eva02 from '../assets/cans/eva-02.png';

import shinji from '../assets/characters/shinji.png';
import asuka from '../assets/characters/asuka-alt.webp';
import rei from '../assets/characters/rei.png';

import mech00 from '../assets/mechs/eva-00-mech.jpg';
import mech01 from '../assets/mechs/eva-01-mech.jpg';
import mech02 from '../assets/mechs/eva-02-mech.jpg';

export const DEFAULT_UNIT_ID = 'unit-01';

export const units = [
  {
    id: 'unit-00',
    tab: 'UNIT-00',
    code: 'EVA-00',
    name: 'ABSOLUTE TERROR',
    pilot: 'Rei Ayanami',
    series: 'Monster Zero Sugar — A.T. FIELD',
    flavor: 'Yuzu citrus and white peach.',
    lore: 'An experimental defensive energy system designed for precision, concentration, and impenetrable defense under extreme pressure.',
    button: 'DEPLOY A.T. FIELD',
    status: 'A.T. FIELD DEPLOYED. DEFENSIVE LATTICE STABLE.',
    sync: 99.1,
    mood: 'CLINICAL // QUIET // UNKNOWN',
    can: eva00,
    canAlt: 'EVA Unit-00 Absolute Terror concept can in industrial yellow-gold and white',
    character: rei,
    characterAlt: 'Rei Ayanami',
    colors: { a: '#E8C547', b: '#9FB3C8', c: '#F2F2EE' },
  },
  {
    id: 'unit-01',
    tab: 'UNIT-01',
    code: 'EVA-01',
    name: 'BERSERK MODE',
    pilot: 'Shinji Ikari',
    series: 'Monster Ultra',
    flavor: 'Electric Kyoho grape and sour green apple.',
    lore: 'Engineered to sustain neural links beyond the 400% synchronization threshold. When the pilot loses control, the energy signature becomes indistinguishable from system failure itself.',
    button: 'INITIATE SYNCHRONIZATION',
    status: 'SYNC RATE CLIMBING. 400% THRESHOLD EXCEEDED. WARNING.',
    sync: 98.7,
    mood: 'VOLATILE // UNSTABLE // ACTIVE',
    can: eva01,
    canAlt: 'EVA Unit-01 Berserk Mode concept can in violet and acid green',
    character: shinji,
    characterAlt: 'Shinji Ikari',
    colors: { a: '#3AD204', b: '#8F55D6', c: '#FF7A1A' },
  },
  {
    id: 'unit-02',
    tab: 'UNIT-02',
    code: 'EVA-02',
    name: "ASUKA'S FURY",
    pilot: 'Asuka Langley Soryu',
    series: 'Monster Juice',
    flavor: 'Blood orange, passionfruit, and spicy mango.',
    lore: 'A production-model overdrive system optimized for aggressive frontline combat. Designed for pilots who refuse to accept defeat.',
    button: 'ACTIVATE OVERDRIVE',
    status: 'OVERDRIVE ENGAGED. FRONTLINE COMBAT PROFILE LOADED.',
    sync: 96.2,
    mood: 'AGGRESSIVE // PROUD // RELENTLESS',
    can: eva02,
    canAlt: "EVA Unit-02 Asuka's Fury concept can in crimson red and orange",
    character: asuka,
    characterAlt: 'Asuka Langley Soryu',
    colors: { a: '#E5262E', b: '#FF7A1A', c: '#C7CDD4' },
  },
];

// Fictional interface readings, not canonical statistics.
export const pilots = [
  {
    id: 'shinji',
    name: 'Shinji Ikari',
    unit: 'EVA-01',
    sync: '98.7%',
    flavor: 'Electric Kyoho grape and sour green apple.',
    personality: 'Reluctant, sensitive, and quietly stubborn. He pilots because someone finally asked him to.',
    excerpt: '"I mustn\'t run away." Repeated enough times, a sentence stops being a promise and becomes a pulse.',
    image: shinji,
    alt: 'Shinji Ikari illustration',
    mech: mech01,
    mechAlt: 'Evangelion Unit-01 in its purple and green armor',
  },
  {
    id: 'asuka',
    name: 'Asuka Langley Soryu',
    unit: 'EVA-02',
    sync: '96.2%',
    flavor: 'Blood orange, passionfruit, and spicy mango.',
    personality: 'Brilliant, proud, and fiercely competitive. Second place is not a position she recognizes.',
    excerpt: 'She does not ask for the spotlight. She builds it, then stands in it daring anyone to look away.',
    image: asuka,
    alt: 'Asuka Langley Soryu illustration',
    mech: mech02,
    mechAlt: 'Evangelion Unit-02 in its red armor',
  },
  {
    id: 'rei',
    name: 'Rei Ayanami',
    unit: 'EVA-00',
    sync: '99.1%',
    flavor: 'Yuzu citrus and white peach.',
    personality: 'Calm, precise, and almost unreadable. Silence is her native language.',
    excerpt: 'Her stillness is not emptiness. It is a field, and very little crosses it unnoticed.',
    image: rei,
    alt: 'Rei Ayanami illustration',
    mech: mech00,
    mechAlt: 'Evangelion Unit-00 in its prototype armor',
  },
];