import React from 'react';
import Layout from '../../components/Layout';
import PageFooter from '../../components/PageFooter';
import { Image, Box, Text, Link, Heading, Flex, Card } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const UserPage = (props) => {
  const list = [
    {
      id: 's-ki',
      type: 'Minor Arcana',
      number: 15,
      name: 'King of Code',
      desc: 'Sound intellectual understanding and reasoning. The card depicts someone who is strong-hearted, decisive, and intellectually oriented. Can also depict someone who is ruthless or excessively judgmental. Balance your intellectual orientation with emotional understanding.',
      desc_rev: 'Cruelty, perversity, barbarity, perfidy, evil intention.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/king-of-swords/',
    },
    {
      id: 's-q',
      type: 'Minor Arcana',
      number: 13,
      name: 'Queen of Code',
      desc: 'Traditionally corresponds to the roles of widow, crone, and divorcée. She is seen to have very high standards and can be highly critical of herself and others. Widowhood, female sadness and embarrassment, absence, sterility, mourning, privation, separation.',
      desc_rev: 'Malice, bigotry, artifice, prudery, bale, deceit.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/queen-of-swords/',
    },
    {
      id: 's-kn',
      type: 'Minor Arcana',
      number: 12,
      name: 'Knight of Code',
      desc: "Often taken to represent a confident and articulate young man, who may act impetuously. The problem is that this Knight, though visionary, is unrealistic. He fights bravely, but foolishly. In some illustrations, he is shown to have forgotten his armor or his helmet. A 'rush to war' is a possibility with this warrior.",
      desc_rev:
        'When played reversed, the Knight of Swords could represent a clever liar, secrets, or a sly and deceitful confidence trickster. A reversed Knight of Swords is also a warning that an intended path would be a terrible mistake, or more precisely, that reconsidering your actions would be a wise decision.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/knight-of-swords/',
    },
    {
      id: 's-p',
      type: 'Minor Arcana',
      number: 11,
      name: 'Page of Code',
      desc: 'Authority, overseeing, secret service, vigilance, spying, examination, and the qualities thereto belonging.',
      desc_rev: 'More evil side of these qualities; what is unforeseen, unprepared state; sickness is also intimated.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/page-of-swords/',
    },
    {
      id: 's-10',
      type: 'Minor Arcana',
      number: 10,
      name: 'Ten of Code',
      desc: 'Represents destruction, being pinned down by a multitude of things or situations. The person lying on the ground, defeated and bleeding, may also represent a feeling of hopelessness and being trapped by emotions or mental anguish, since swords represent strife and the mind. Dark clouds hovering above the person signify despair and a bleak situation. But any death or destruction, like all things, may not be permanent. There is hope in spite of the situation; the golden sky in the distance suggests that the current situation is bad, and things will improve.',
      desc_rev:
        'In the reversed state, the card indicates a troubling situation that will continue for a significant amount of time. The card suggests that the subject should not despair in difficult times, to avoid ruining future prospects for success.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/ten-of-swords/',
    },
    {
      id: 's-9',
      type: 'Minor Arcana',
      number: 9,
      name: 'Nine of Code',
      desc: 'Can mean deception, premonitions and bad dreams, suffering and depression, cruelty, disappointment, violence, loss and scandal. However, all of these may be overcome through faith and calculated inaction. This is the card of the martyr and with it comes new life out of suffering. Can represent being plagued by fear, guilt, doubt, and worries that are to a large extent, unfounded. Chances are the person in question is dealing with a problematic situation or a difficult decision, but his or her worst fear is unlikely to materialize.',
      desc_rev:
        'If the card is shown in an ill-dignified or reversed manner then it has a different meaning. When turned this way it means distrust, suspicion, despair, misery or malice. Total isolation away from comfort and help: institutionalization, suicide, imprisonment and isolation. However, in a generally positive spread, the reversed meaning of this card can also indicate that the nightmare may be ending. The Nine of Swords reversed can actually be a hopeful card, counseling faith in the future and the promise of better days ahead.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/nine-of-swords/',
    },
    {
      id: 's-8',
      type: 'Minor Arcana',
      number: 8,
      name: 'Eight of Code',
      desc: "The 'damned if you do, damned if you don't, card. You may be in a situation where you're afraid to move. If you move, you'll get cut. However, the ropes that bind you and the blindfold over your eyes are your own fears, keeping them immobile. Therefore, the longer you stay, the more you constrain and entrap yourself. You must have the strength to endure the cuts or you will stay trapped. You must move, for the longer you let the situation continue, the worse it will get",
      desc_rev: 'Disquiet, difficulty, opposition, accident, treachery; what is unforeseen; fatality.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/eight-of-swords/',
    },
    {
      id: 's-7',
      type: 'Minor Arcana',
      number: 7,
      name: 'Seven of Code',
      desc: 'Means to use your wits for diplomacy and not to use aggression. This is why it can be viewed as secret planning or hidden dishonor. Your acts may be legitimate. However, you prefer to use your mind and intellect rather than force or via obvious means. The figure is taking stealthy steps, looking back to examine the scene he is leaving. Apparently they are doing something they knows they should not be doing, and is attempting to get away with it anyway.',
      desc_rev:
        'The Reversed meaning of the card means excess use of intellect with little success on an outcome, to surrender, or to have little care on solving a problem. The questioner needs to break away from ingrained habits or ways to approach problems.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/seven-of-swords/',
    },
    {
      id: 's-6',
      type: 'Minor Arcana',
      number: 6,
      name: 'Six of Code',
      desc: 'Gradual change, movement, or travel away from difficulty or imminent danger; the solution of current problems; long journeys and passage from pain; or obstacles which are overcome. It may also be a suggestion of interpenetrating worlds, and changing channels from one set of perceptions to another.',
      desc_rev: 'Declaration, confession, publicity; one account says that it is a proposal of love.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/six-of-swords/',
    },
    {
      id: 's-5',
      type: 'Minor Arcana',
      number: 5,
      name: 'Five of Code',
      desc: "The figure in the foreground suggests victory, potency, and ample preparation or confidence. Also suggests unwilling or unnecessary contributions from losing parties. This card also is 'the defeat card' in the deck. The ragged-looking and 'torn-asunder' sky implies a frayed, shabby, and jagged celestial plane.",
      desc_rev:
        'This card can represent dangerous overconfidence, and in its reversed form indicates a seeming-triumph which will be ultimately calamitous.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/five-of-swords/',
    },
    {
      id: 's-4',
      type: 'Minor Arcana',
      number: 4,
      name: 'Four of Code',
      desc: "Vigilance, retreat, solitude, hermit's repose, exile, tomb and coffin. The single sword at the knight's side indicates a singularity of purpose and a great focus in life. It is mostly associated with a peaceful, still place. It reflects withdrawal, getting away and shifting the focus inwardly so that recovery and healing can take place.",
      desc_rev: 'Wise administration, circumspection, economy, avarice, precaution, testament.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/four-of-swords/',
    },
    {
      id: 's-3',
      type: 'Minor Arcana',
      number: 3,
      name: 'Three of Code',
      desc: 'This card depicts a fundamentally sorrowful experience— tarot readers suggest this may be in the form of a lost relationship, an accidental death, or some other form of not just depression or malaise but deeply emotional sorrow.',
      desc_rev:
        'When the card appears reversed in a spread, this is not usually read as meaning the opposite of sorrow, but rather a sorrow that is somehow mitigated by its circumstances or that is not as bad as it could have been. It is among the most negative cards within the tarot deck.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/three-of-swords/',
    },
    {
      id: 's-2',
      type: 'Minor Arcana',
      number: 2,
      name: 'Two of Code',
      associations: ['TEMPLATE'],
      desc: 'This is a card of meditation, not of action. The crossed swords point to different possible directions, but for the moment the character is looking inward rather than outward and in the possession of an awesome power that protects her until she finds the direction to apply it.',
      desc_rev: 'Imposture, falsehood, duplicity, disloyalty.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/two-of-swords/',
    },
    {
      id: 's-a',
      type: 'Minor Arcana',
      number: 1,
      name: 'Ace of Code',
      desc: 'Triumph, the excessive degree in everything, conquest, triumph of force. It is a card of great force, in love as well as in hatred: it can indicate great property or great misery.',
      desc_rev:
        'The same, but the results are disastrous; another account says--conception, childbirth, augmentation, multiplicity.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/ace-of-swords/',
    },
    {
      id: 'c-ki',
      type: 'Minor Arcana',
      number: 15,
      name: 'King of Pixels',
      desc: 'Fair man, man of business, law, or divinity; responsible, disposed to oblige the Querent; also equity, art and science, including those who profess science, law and art; creative intelligence.',
      desc_rev:
        'Dishonest, double-dealing man; roguery, exaction, injustice, vice, scandal, pillage, considerable loss.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/king-of-cups/',
    },
    {
      id: 'c-q',
      type: 'Minor Arcana',
      number: 13,
      name: 'Queen of Pixels',
      desc: 'Depicts a mature woman of fair-complexion and golden hair who holds a lidded cup or chalice. She is described as a model of loving virtue, one who is purer of heart than most, a loving mother, and a loyal friend.',
      desc_rev:
        'The inverted card may warn the querent of a false lover or a deceitful friend or companion who may have a secret; someone who pretends to be pure of heart but is actually treacherous and manipulative.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/queen-of-cups',
    },
    {
      id: 'c-kn',
      type: 'Minor Arcana',
      number: 12,
      name: 'Knight of Pixels',
      desc: 'Represents change and new excitements, particularly of a romantic nature. It can mean invitations, opportunities, and offers. The Knight of Cups is a person who is a bringer of ideas, opportunities and offers. He is constantly bored, and in constant need of stimulation, but also artistic and refined. He represents a person who is amiable, intelligent, and full of high principles, but a dreamer who can be easily persuaded or discouraged.',
      desc_rev:
        'Reversed, the card represents unreliability and recklessness. It indicates fraud, false promises and trickery. It represents a person who has trouble discerning when and where the truth ends and lies begin.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/knight-of-cups',
    },
    {
      id: 'c-p',
      type: 'Minor Arcana',
      number: 11,
      name: 'Page of Pixels',
      associations: ['announcement', 'birth', 'creative ideas', 'good news'],
      desc: 'Fair young man, one impelled to render service and with whom the Querent will be connected; a studious youth; news, message; application, reflection, meditation; also these things directed to business.',
      desc_rev: 'Taste, inclination, attachment, seduction, deception, artifice.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/page-of-cups',
    },
    {
      id: 'c-10',
      type: 'Minor Arcana',
      number: 10,
      name: 'Ten of Pixels',
      desc: 'Represents fortunate marriage, contentment of the heart, and the perfection of human love and friendship. It can also refer to the town or country where the querent lives. This is one of the most positive cards in the entire Tarot deck.',
      desc_rev: 'Reversed, it can refer to quarreling, violence, and a troubled heart.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/ten-of-cups',
    },
    {
      id: 'c-9',
      type: 'Minor Arcana',
      number: 9,
      name: 'Nine of Pixels',
      desc: "Having your wish fulfilled. Achieving what you desire. Obtaining your goal. Getting what you think you want. Having your dream come true. Feeling satisfied. Indulging in a little smugness. Enjoying the situation just as it is. Feeling pleased as punch. Getting the results you hoped for. Feeling all's well with the world. Being contented. Enjoying sensual pleasure. Experiencing luxury. Savoring a delicious meal. Appreciating the arts. Making love.",
      desc_rev: 'unrealistic wishes or dreams which are not destined to become reality.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/nine-of-cups',
    },
    {
      id: 'c-8',
      type: 'Minor Arcana',
      number: 8,
      name: 'Eight of Pixels',
      desc: 'Disillusionment and abandonment of things which have not been emotionally fulfilling.',
      desc_rev: 'Great joy, happiness, feasting.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/eight-of-cups',
    },
    {
      id: 'c-7',
      type: 'Minor Arcana',
      number: 7,
      name: 'Seven of Pixels',
      associations: ['TEMPLATE'],
      desc: 'Represents self-delusion, choice or temptation. Under rare and extreme circumstances, it may indicate the revelation of transcendental spiritual truths.',
      desc_rev:
        'A period of clarity after a time of confusion. It can also indicate that long-held dreams or ambitions are being overturned, either for good or ill.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/seven-of-cups',
    },
    {
      id: 'c-6',
      type: 'Minor Arcana',
      number: 6,
      name: 'Six of Pixels',
      desc: 'The past and of memories, looking back; happiness, enjoyment, but coming rather from the past; things that have vanished. It may be time to look back to a simpler way of thinking. Unquestionable love is a more modern interpretation.',
      desc_rev:
        'When reversed, represents the themes of being stuck in the past, naïve, and unrealistic. A fixation on times which have passed, nostalgia or ruminations on childhood.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/six-of-cups',
    },
    {
      id: 'c-5',
      type: 'Minor Arcana',
      number: 5,
      name: 'Five of Pixels',
      desc: 'Often carries the meaning of emotional dejection, disappointment and sorrow over past events. It can also represent the failure to see the good in a given situation. Although the figure represented on the card has lost three of his cups, two still stand, yet he fails to appreciate what he has left. A river flows in front of the figure, with a bridge leading to a safe destination, and yet he remains focused on the loss of his cups. ',
      desc_rev: 'News, alliances, affinity, consanguinity, ancestry, return, false projects.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/five-of-cups',
    },
    {
      id: 'c-4',
      type: 'Minor Arcana',
      number: 4,
      name: 'Four of Pixels',
      desc: 'Weariness, disgust, aversion, imaginary vexations, as if the wine of this world had caused satiety only; another wine, as if a fairy gift, is now offered the wastrel, but he sees no consolation therein. This is also a card of blended pleasure.',
      desc_rev: 'Novelty, presage, new instruction, new relations.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/four-of-cups',
    },
    {
      id: 'c-3',
      type: 'Minor Arcana',
      number: 3,
      name: 'Three of Pixels',
      associations: ['mercury'],
      desc: "Groups coming together to focus on a common emotional goal. People reaching out emotionally to one another. Speaks of a sense of community, and can indicate the time to get more involved by helping. An inner passion for caring may be discovered, and energy put forth toward a goal will be positive and nurturing. Can also signal that this is the time to reach out if things have been particularly rough in the past. This card stands for all forms of support including formal organizations such as counseling or other social services. It's important that when the need for support is recognized that action is taken. This is the best time to do that.",
      desc_rev:
        'Reversed, the Three of Cups suggests that isolation from others is occurring. It is the time to take charge of the situation and to get out into the community. Consider joining a group or organization, and if the need for support is present, seek out the necessary resources.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/three-of-cups',
    },
    {
      id: 'c-2',
      type: 'Minor Arcana',
      number: 2,
      name: 'Two of Pixels',
      desc: 'Partnerships and unions are represented by the Two of Cups. Much like the Lovers card in the Major Arcana, energies come together to create a mutual bond. Beauty, power, and electric vibrations occur, bringing romance and sexual energy to the scene. Platonic relationships also benefit from the Two of Cups. This is the card that signifies reconciliation. Struggles come to an end, and harmony is restored to even the most hostile of relationships. Inner conflicts also come into play when this card appears. An inner peace is created. Expect to feel strongly connected to others, but also to other entities that bring two together like ideas or talents.',
      desc_rev:
        "Reversed, this card indicates that pairing off to the exclusion of all other people and situations is happening. Take the time to bring balance into life by including other factors. Unhealthy relationships that consume all one's energy need to be examined, and a new course of action decided upon.",
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/two-of-cups',
    },
    {
      id: 'c-a',
      type: 'Minor Arcana',
      number: 1,
      name: 'Ace of Pixels',
      associations: ['abundance', 'creativity', 'intense relationship', 'satisfaction', 'success'],
      desc: 'House of the true heart, joy, content, abode, nourishment, abundance, fertility; Holy Table, felicity hereof.',
      desc_rev: 'House of the false heart, mutation, instability, revolution.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/ace-of-cups',
    },
    {
      id: 'w-ki',
      type: 'Minor Arcana',
      number: 14,
      name: 'King of Docs',
      associations: ['authority figure', 'financial gain', 'honest and trustworthy', 'mediation', 'professional'],
      desc: 'Dark man, friendly, countryman, generally married, honest and conscientious. The card always signifies honesty, and may mean news concerning an unexpected heritage to fall in before very long.',
      desc_rev: 'Good, but severe; austere, yet tolerant.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/king-of-wands',
    },
    {
      id: 'w-q',
      type: 'Minor Arcana',
      number: 13,
      name: 'Queen of Docs',
      associations: ['career-oriented', 'hard worker', 'honest', 'independent and home-loving', 'thoughtful'],
      desc: 'A dark woman, countrywoman, friendly, chaste, loving, honourable. If the card beside her signifies a man, she is well disposed towards him; if a woman, she is interested in the Querent. Also, love of money, or a certain success in business.',
      desc_rev:
        'Good, economical, obliging, serviceable. Signifies also--but in certain positions and in the neighbourhood of other cards tending in such directions--opposition, jealousy, even deceit and infidelity.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/queen-of-wands',
    },
    {
      id: 'w-kn',
      type: 'Minor Arcana',
      number: 12,
      name: 'Knight of Docs',
      associations: ['challenge', 'determination', 'foreign travel', 'leadership', 'unpredictability'],
      desc: 'Departure, absence, flight, emigration. A dark young man, friendly. Change of residence.',
      desc_rev: 'Rupture, division, interruption, discord.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/knight-of-wands',
    },
    {
      id: 'w-p',
      type: 'Minor Arcana',
      number: 11,
      name: 'Page of Docs',
      associations: ['adventurous', 'ambitious', 'energetic and active', 'new beginnings', 'skilled'],
      desc: 'Dark young man, faithful, a lover, an envoy, a postman. Beside a man, he will bear favourable testimony concerning him. A dangerous rival, if followed by the Page of Cups. Has the chief qualities of his suit. He may signify family intelligence.',
      desc_rev: 'Anecdotes, announcements, evil news. Also indecision and the instability which accompanies it.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/page-of-wands',
    },
    {
      id: 'w-10',
      type: 'Minor Arcana',
      name: 'Ten of Docs',
      number: 10,
      associations: ['burdens', 'challenges', 'intense pressure', 'oppression', 'overcommitment'],
      desc: 'A card of many significances, and some of the readings cannot be harmonized. I set aside that which connects it with honour and good faith. The chief meaning is oppression simply, but it is also fortune, gain, any kind of success, and then it is the oppression of these things. It is also a card of false-seeming, disguise, perfidy. The place which the figure is approaching may suffer from the rods that he carries. Success is stultified if the Nine of Swords follows, and if it is a question of a lawsuit, there will be certain loss.',
      desc_rev: 'Contrarieties, difficulties, intrigues, and their analogies.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/ten-of-wands',
    },
    {
      id: 'w-9',
      type: 'Minor Arcana',
      name: 'Nine of Docs',
      number: 9,
      desc: 'Order, discipline an unassailable position. Any opposition will be defeated. Courage in the face of attack or adversity and a stability that cannot be removed. Good health.',
      desc_rev:
        'Lack or inability to give and take. Projects pursued that are destined to fail because of their impractical nature. Delays and disarray. Card could indicate possible poor or ill health. A secure position that is no longer. Personality flaws may, in fact, be stepping-stones to the throne of harmony.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/nine-of-wands',
    },
    {
      id: 'w-8',
      type: 'Minor Arcana',
      name: 'Eight of Docs',
      number: 8,
      associations: ['hasty actions', 'travel', 'a journey', 'end to a delay'],
      desc: 'Activity in undertakings, the path of such activity, swiftness, as that of an express messenger; great haste, great hope, speed towards an end which promises assured felicity; generally, that which is on the move; also the arrows of love.',
      desc_rev:
        'Arrows of jealousy, internal dispute, stingings of conscience, quarrels; and domestic disputes for persons who are married.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/eight-of-wands',
    },
    {
      id: 'w-7',
      type: 'Minor Arcana',
      name: 'Seven of Docs',
      number: 7,
      desc: 'It is a card of valour, for, on the surface, six are attacking one, who has, however, the vantage position. On the intellectual plane, it signifies discussion, wordy strife; in business--negotiations, war of trade, barter, competition. It is further a card of success, for the combatant is on the top and his enemies may be unable to reach him.',
      desc_rev: 'Perplexity, embarrassments, anxiety. It is also a caution against indecision.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/seven-of-wands',
    },
    {
      id: 'w-6',
      type: 'Minor Arcana',
      name: 'Six of Docs',
      number: 6,
      associations: ['completion', 'good news', 'reward and recognition', 'success', 'triumph'],
      desc: "The card has been so designed that it can cover several significations; on the surface, it is a victor triumphing, but it is also great news, such as might be carried in state by the King's courier; it is expectation crowned with its own desire, the crown of hope, and so forth.",
      desc_rev:
        'Apprehension, fear, as of a victorious enemy at the gate; treachery, disloyalty, as of gates being opened to the enemy; also indefinite delay.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/six-of-wands',
    },
    {
      id: 'w-5',
      type: 'Minor Arcana',
      name: 'Five of Docs',
      number: 5,
      associations: ['anxiety', 'conflict', 'disagreement', 'struggle'],
      desc: 'Imitation, as, for example, sham fight, but also the strenuous competition and struggle of the search after riches and fortune. In this sense it connects with the battle of life. Hence some attributions say that it is a card of gold, gain, opulence.',
      desc_rev: 'Litigation, disputes, trickery, contradiction.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/five-of-wands',
    },
    {
      id: 'w-4',
      type: 'Minor Arcana',
      name: 'Four of Docs',
      number: 4,
      associations: ['celebrations and happiness', 'completion', 'harmony', 'new beginnings', 'pleasure'],
      desc: 'They are for once almost on the surface--country life, haven of refuge, a species of domestic harvest-home, repose, concord, harmony, prosperity, peace, and the perfected work of these.',
      desc_rev: 'The meaning remains unaltered; it is prosperity, increase, felicity, beauty, embellishment.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/four-of-wands',
    },
    {
      id: 'w-3',
      type: 'Minor Arcana',
      name: 'Three of Docs',
      number: 3,
      associations: ['achievement', 'fresh starts', 'long-term success', 'partnerships', 'trade'],
      desc: 'He symbolizes established strength, enterprise, effort, trade, commerce, discovery; those are his ships, bearing his merchandise, which are sailing over the sea. The card also signifies able co-operation in business, as if the successful merchant prince were looking from his side towards yours with a view to help you.',
      desc_rev: 'The end of troubles, suspension or cessation of adversity, toil and disappointment.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/three-of-wands',
    },
    {
      id: 'w-2',
      type: 'Minor Arcana',
      number: 2,
      name: 'Two of Docs',
      desc: "Between the alternative readings there is no marriage possible; on the one hand, riches, fortune, magnificence; on the other, physical suffering, disease, chagrin, sadness, mortification. The design gives one suggestion; here is a lord overlooking his dominion and alternately contemplating a globe; it looks like the malady, the mortification, the sadness of Alexander amidst the grandeur of this world's wealth.",
      desc_rev: 'Surprise, wonder, enchantment, emotion, trouble, fear.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/two-of-wands',
    },
    {
      id: 'w-a',
      type: 'Minor Arcana',
      number: 1,
      name: 'Ace of Docs',
      associations: ['birth', 'commencement', 'creativity', 'inventiveness', 'new beginnings'],
      desc: 'Creation, invention, enterprise, the powers which result in these; principle, beginning, source; birth, family, origin, and in a sense the virility which is behind them; the starting point of enterprises; according to another account, money, fortune, inheritance.',
      desc_rev: 'Fall, decadence, ruin, perdition, to perish also a certain clouded joy.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/ace-of-wands',
    },
    {
      id: 'p-ki',
      type: 'Minor Arcana',
      number: 14,
      name: 'King of Keyboards',
      alt_names: ['King of Coins'],
      desc: 'Valour, realizing intelligence, business and normal intellectual aptitude, sometimes mathematical gifts and attainments of this kind; success in these paths.',
      desc_rev: 'Vice, weakness, ugliness, perversity, corruption, peril.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/king-of-pentacles',
    },
    {
      id: 'p-q',
      type: 'Minor Arcana',
      number: 13,
      name: 'Queen of Keyboards',
      alt_names: ['Queen of Coins'],
      desc: 'Someone down-to-earth, who takes responsibility for many roles in the care for her family. Representing a mature female or feminine presence, the receiver of the Upright Queen of Pentacles has central focus on childcare and wellbeing. However, the Queen of Pentacles should not be mistaken as only a homebody and housewife. She has the ability to execute effective business strategies under tight time constraints. The Queen of Pentacles works her magic in the background, as she remains quiet about her accomplishments. Lastly, she desires a simple and minimalist lifestyle – she loves to be calculated, careful and vigilant.',
      desc_rev:
        'The Reversed Queen of Pentacles can become unattached from reality, leaving her completely self-centered. Some of her traits include being selfish and jealous when others show greater success. For the card drawer, the Queen of Pentacles indicates misplaced priorities and distractions from long-term goals. This card also indicates that those in the beholders care are ready to be independent and responsible for their own lives. The beholder has reached a rewarding point where their loved ones are strong enough to make their own decisions. In order to return to her Upright state, the Queen of Pentacles needs to become grounded again.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/queen-of-pentacles',
    },
    {
      id: 'p-kn',
      type: 'Minor Arcana',
      number: 12,
      name: 'Knight of Keyboards',
      alt_names: ['Knight of Coins'],
      desc: 'A young man who is dark of complexion and features. Might represent someone who is stubborn or hard-working, serious, or set in their ways. One might also use this card when someone is grappling with a question where one of those issues is coming up—when they have a question about work or home life, or a question about whether to stand their ground on an issue.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/knight-of-pentacles',
    },
    {
      id: 'p-p',
      type: 'Minor Arcana',
      number: 11,
      name: 'Page of Keyboards',
      alt_names: ['Page of Coins'],
      desc: 'Often used to represent a young person. Can mean a changing of your line of work and/or taking on more responsibility. But primarily, this is the card for students.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/page-of-pentacles',
    },
    {
      id: 'p-10',
      type: 'Minor Arcana',
      number: 10,
      name: 'Ten of Keyboards',
      alt_names: ['Ten of Coins'],
      desc: 'Family matters, financial matters, affluence, a working environment',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/ten-of-pentacles',
    },
    {
      id: 'p-9',
      type: 'Minor Arcana',
      number: 9,
      name: 'Nine of Keyboards',
      alt_names: ['Nine of Coins'],
      desc: 'Having the financial independence, having the self-reliance of personal pursuits, the ability to treat yourself with luxury, being on a stable financial plateau and steady security.',
      desc_rev:
        'Excess spending, being co-dependent on your financials or on others, to feel lonely in your personal pursuits, to feel inadequate financially, to have everything money can buy but yet still feeling impoverished emotionally and spiritually. The advice of the card is to look within the root of your existing problems, to look and focus on what will make you feel complete and secure, yet to learn and grow along the way.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/nine-of-pentacles',
    },
    {
      id: 'p-8',
      type: 'Minor Arcana',
      number: 8,
      name: 'Eight of Keyboards',
      alt_names: ['Eight of Coins'],
      desc: 'Work, employment, commission, craftsmanship, skill in craft and business, perhaps in the preparatory stage. Steady patience with achievement kept in mind.',
      desc_rev:
        'Voided ambition, vanity, cupidity, exaction, usury. It may also signify the possession of skill, in the sense of the ingenious mind turned to cunning and intrigue.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/eight-of-pentacles',
    },
    {
      id: 'p-7',
      type: 'Minor Arcana',
      number: 7,
      name: 'Seven of Keyboards',
      alt_names: ['Seven of Coins'],
      desc: "To show your commitment towards your work life or dreams. It may seem like charity work to you but it is on the value of receiving emotional and spiritual rewards, like the saying 'success is a journey not a destination'.",
      desc_rev:
        'Excess energy and personal resources used that can cause a strain, the feeling of giving too much of your time and resources with little reward or assurance of moving forward. The advice of the card is to re-assess your commitment levels, if for too long you are not receiving the results you desire, it may be best to cut your losses especially when it seems to be a bad investment of your time and money.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/seven-of-pentacles',
    },
    {
      id: 'p-6',
      type: 'Minor Arcana',
      number: 6,
      name: 'Six of Keyboards',
      alt_names: ['Six of Coins'],
      desc: 'Signifies gratification.',
      desc_rev: 'Desire, cupidity, envy, jealousy and illusion.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/six-of-pentacles',
    },
    {
      id: 'p-5',
      type: 'Minor Arcana',
      number: 5,
      name: 'Five of Keyboards',
      alt_names: ['Five of Coins'],
      desc: "To lose all faith, losing resources, losing a lover (mostly shows up when you've had a breakup), and losing security whether financially or emotionally (or both).",
      desc_rev:
        "When hope returns slowly but surely, you can be positive from the troubles you've recently experienced, mostly shows up when you are back into a relationship again that was once broken, a renewal of faith. The advice of the card is to see a glass as half full not half empty, to seek help when you need it and not fear rejection.",
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/five-of-pentacles',
    },
    {
      id: 'p-4',
      type: 'Minor Arcana',
      number: 4,
      name: 'Four of Keyboards',
      alt_names: ['Four of Coins'],
      desc: 'A lover of material wealth, one who hoards things of value with no prospect of sharing.',
      desc_rev: 'Warns against the tendency of being a spendthrift.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/four-of-pentacles',
    },
    {
      id: 'p-3',
      type: 'Minor Arcana',
      number: 3,
      name: 'Three of Keyboards',
      alt_names: ['Three of Coins'],
      desc: 'The mastery of a skill in trade or work; achieving perfection; artistic ability; and dignity through renown rank or power.',
      desc_rev:
        'Sloppiness resulting in a lower quality outcome; lack of skill; banal ideas; and preoccupation with off task concerns.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/three-of-pentacles',
    },
    {
      id: 'p-2',
      type: 'Minor Arcana',
      number: 2,
      name: 'Two of Keyboards',
      alt_names: ['Two of Coins'],
      desc: 'To juggle, to struggle in a positive influence, to balance, to maintain.',
      desc_rev: 'Imbalances, excess juggling, excess struggle, the advice of the card is to re-dress balance.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/two-of-pentacles',
    },
    {
      id: 'p-a',
      type: 'Minor Arcana',
      number: 1,
      name: 'Ace of Keyboards',
      alt_names: ['Ace of Coins'],
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/ace-of-pentacles',
    },
    {
      id: 'a-tw',
      type: 'Major Arcana',
      number: 21,
      name: 'The Internet',
      alt_names: ['The Universe'],
      associations: ['cosmic consciousness'],
      desc: 'Assured success, recompense, voyage, route, emigration, flight, change of place.',
      desc_rev: 'Inertia, fixity, stagnation, permanence.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/world/',
    },
    {
      id: 'a-jg',
      type: 'Major Arcana',
      number: 20,
      name: 'The Perf Cycle',
      desc: 'May be associated with rebirth, inner-calling, absolution, karma, causality, second chances',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/judgement/',
    },
    {
      id: 'a-sn',
      type: 'Major Arcana',
      number: 19,
      name: 'The Frontend',
      associations: ['attained knowledge'],
      desc: 'The conscious mind prevails over the fears and illusions of the unconscious. Innocence is renewed through discovery, bringing hope for the future.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/sun/',
    },
    {
      id: 'a-mn',
      type: 'Major Arcana',
      number: 18,
      name: 'The Backend',
      associations: ['peace, be still', 'life of the imagination'],
      desc: 'Hidden enemies, danger, calumny, darkness, terror, deception, occult forces, error.',
      desc_rev: 'Instability, inconstancy, silence, lesser degrees of deception and error.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/moon/',
    },
    {
      id: 'a-sr',
      type: 'Major Arcana',
      number: 17,
      name: 'The User',
      desc: 'Loss, theft, privation, abandonment; another reading says--hope bright prospects.',
      desc_rev: 'Arrogance, haughtiness, impotence.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/star/',
    },
    {
      id: 'a-tt',
      type: 'Major Arcana',
      number: 16,
      name: 'The Reorg',
      associations: ['mars', 'danger/crosis', 'sudden change', 'destruction', 'liberation'],
      desc: 'Misery, distress, indigence, adversity, calamity, disgrace, deception, ruin. It is a card in particular of unforeseen catastrophe.',
      desc_rev: 'Negligence, absence, distribution, carelessness, apathy, nullity, vanity.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/tower/',
    },
    {
      id: 'a-td',
      type: 'Major Arcana',
      number: 15,
      name: 'The AWS Outage',
      associations: ['hedonism', 'living in fear', 'greed'],
      desc: 'Ravage, violence, vehemence, extraordinary efforts, force, fatality; that which is predestined but is not for this reason evil.',
      desc_rev: 'Evil fatality, weakness, pettiness, blindness.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/devil/',
    },
    {
      id: 'a-t',
      type: 'Major Arcana',
      number: 14,
      name: 'The AWS Cost',
      alt_names: ['Art'],
      associations: ['attainment of a goal'],
      desc: 'Economy, moderation, frugality, management, accommodation.',
      desc_rev:
        'Things connected with churches, religions, sects, the priesthood, sometimes even the priest who will marry Querent; also disunion, unfortunate combinations, competing interests.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/temperance/',
    },
    {
      id: 'a-d',
      type: 'Major Arcana',
      number: 13,
      name: 'The Migration',
      alt_names: ['Rebirth', 'The Card with No Name'],
      associations: ['an ending', 'self awareness'],
      desc: 'End, mortality, destruction, corruption; also, for a man, the loss of a benefactor; for a woman, many contrarieties; for a maid, failure of marriage projects.',
      desc_rev: 'Inertia, sleep, lethargy, petrifaction, somnambulism; hope destroyed.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/death/',
    },
    {
      id: 'a-hm',
      type: 'Major Arcana',
      number: 12,
      name: 'The UXR',
      alt_names: ['Odin', 'The Observer'],
      associations: ['entrancement', 'suspension', 'the universe'],
      desc: 'Wisdom, circumspection, discernment, trials, sacrifice, intuition, divination, prophecy.',
      desc_rev: 'Selfishness, the crowd, body politic.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/hanged-man/',
    },
    {
      id: 'a-s',
      type: 'Major Arcana',
      number: 11,
      name: 'The Metrics',
      alt_names: ['Fortitude', 'Lust'],
      associations: ['libra', '∞'],
      desc: 'Power, energy, action, courage, magnanimity; also complete success and honours.',
      desc_rev: 'Despotism, abuse of power, weakness, discord, sometimes even disgrace.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/strength/',
    },
    {
      id: 'a-wf',
      type: 'Major Arcana',
      number: 10,
      name: 'The Stonk',
      alt_names: ['The Fates'],
      associations: ['leo', 'taurus', 'aquarius', 'scorpio', 'change'],
      desc: 'Destiny, fortune, success, elevation, luck, felicity.',
      desc_rev: 'Increase, abundance, superfluity.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/wheel-of-fortune/',
    },
    {
      id: 'a-h',
      type: 'Major Arcana',
      number: 9,
      name: 'The Strategy',
      associations: ['virgo', 'healing/recovery', 'the lamp of truth'],
      desc: 'Prudence, circumspection; also and especially treason, dissimulation, roguery, corruption.',
      desc_rev: 'Concealment, disguise, policy fear, unreasoned caution.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/hermit',
    },
    {
      id: 'a-j',
      type: 'Major Arcana',
      number: 8,
      name: 'The Tests',
      associations: ['leo'],
      desc: 'Equity, rightness, probity, executive; triumph of the deserving side in law.',
      desc_rev: 'Law in all its departments, legal complications, bigotry, bias, excessive severity.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/justice',
    },
    {
      id: 'a-c',
      type: 'Major Arcana',
      number: 7,
      name: 'The Account Manager',
      alt_names: ['Victory', 'The Centurion'],
      associations: ['self control'],
      desc: 'Succour, providence; also war, triumph, presumption, vengeance, trouble.',
      desc_rev: 'Riot, quarrel, dispute, litigation, defeat.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/chariot/',
    },
    {
      id: 'a-l',
      type: 'Major Arcana',
      number: 6,
      name: 'The Designers',
      alt_names: ['The Twins'],
      associations: ['gemini', 'air', 'mercury'],
      desc: 'Attraction, love, beauty, trials overcome.',
      desc_rev:
        'Failure, foolish designs. Another account speaks of marriage frustrated and contrarieties of all kinds.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/lovers/',
    },
    {
      id: 'a-pt',
      type: 'Major Arcana',
      number: 5,
      name: 'The Recruiter',
      alt_names: ['The Hierophant', 'The Pope'],
      associations: ['jupiter', 'wisdom'],
      desc: 'Marriage, alliance, captivity, servitude; by another account, mercy, and goodness; inspiration; the man to whom the Querent has recourse.',
      desc_rev: 'Society, good understanding, concord, over kindness, weakness.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/hierophant',
    },
    {
      id: 'a-er',
      type: 'Major Arcana',
      number: 4,
      name: 'The CTO',
      associations: ['mars', 'power', 'wisdom'],
      desc: 'Stability, power, protection, realization; a great person; aid, reason, conviction also authority and will.',
      desc_rev: 'Benevolence, compassion, credit; also confusion to enemies, obstruction, immaturity.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/emperor',
    },
    {
      id: 'a-es',
      type: 'Major Arcana',
      number: 3,
      name: 'The CEO',
      alt_names: ['Aphrodite'],
      associations: ['creation', 'earthly paradise'],
      desc: 'Fruitfulness, action, initiative, length of days; the unknown, clandestine; also difficulty, doubt, ignorance.',
      desc_rev:
        'Light, truth, the unraveling of involved matters, public rejoicings; according to another reading, vacillation.',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/empress',
    },
    {
      id: 'a-ps',
      type: 'Major Arcana',
      number: 2,
      name: 'The Product Manager',
      alt_names: ['The Seer', 'The Popess'],
      associations: ['moon', 'divine law'],
      desc: 'Secrets, mystery, the future as yet unrevealed; the woman who interests the Querent, if male; the Querent herself, if female; silence, tenacity; mystery, wisdom, science.',
      desc_rev: 'Passion, moral or physical ardor, conceit, surface knowledge.',
      vibe: 'divine law',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/high-priestess/',
    },
    {
      id: 'a-m',
      type: 'Major Arcana',
      number: 1,
      name: 'The Engineer',
      alt_names: ['The Juggler', 'The Artisan'],
      associations: ['Gemini', 'Virgo'],
      desc: 'Skill, diplomacy, address, subtlety, pain, loss, disaster, snares of enemies; self-confidence, will; [it signifies] the Querent, if male.',
      desc_rev: 'Physician, mental disease, disgrace, disquiet.',
      vibe: 'talents, capabilities and resources at your disposal',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/magician',
    },
    {
      id: 'a-f',
      type: 'Major Arcana',
      number: 0,
      name: 'The New User',
      alt_names: ['The Jester', 'The Vagabond'],
      desc: 'Folly, mania, extravagance, intoxication, delirium, frenzy, bewrayment.',
      desc_rev: 'Negligence, absence, distribution, carelessness, apathy, nullity, vanity.',
      vibe: "the everyman, the fool's journey",
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/fool/',
    },
  ];
  const map = {};
  list.forEach((c) => {
    map[c.id] = c;
  });

  const router = useRouter();
  let selected = null;

  const { comps } = router.query;
  const first = comps[0];
  let basePath = '/';
  let cards = [];
  let headings = null;
  let title = 'witchcraft.computer';
  if (first) {
    basePath = `o/${first}`;
    const data = map[first];
    cards.push(data);
    selected = data;
    title = `${data.name} ✧ witchcraft.computer`;
  }

  const description = cards[0].desc;
  const url = `https://witchcraft.computer`;
  const previewImage = `http://witchcraft.computer/rider-waite/${selected.id}.png`;

  return (
    <Layout>
      <Box sx={{ flexDirection: 'column', justifyContent: 'center', mt: 4, mb: 0 }}>
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            url: url,
            title: title,
            description: description,
            images: [
              {
                url: previewImage,
                alt: title,
              },
            ],
            site_name: 'witchcraft.computer',
          }}
        />
        <Flex sx={{ justifyContent: 'center' }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
            {cards.map((card, i) => {
              const prefix = card.id.split('-')[0];
              return (
                <Flex
                  key={card.id}
                  sx={{ mx: 1, mt: 3, mb: 3, width: 300, flexDirection: 'column', alignItems: 'center' }}
                >
                  {headings && (
                    <Text
                      sx={{
                        fontFamily: 'mono',
                        fontWeight: 'bold',
                        mb: 2,
                      }}
                    >
                      {headings[i]}
                    </Text>
                  )}
                  <Card variant={`card_${prefix}`} sx={{}}>
                    <Image
                      src={`${props.baseUrl}/rider-waite/${card.id}.svg`}
                      sx={{ transform: card.reversed ? 'rotate(180deg);' : 'none' }}
                    />
                  </Card>
                  <Box sx={{ fontFamily: 'mono', pt: 3, pb: 0 }}>
                    <Link href={selected.wiki} target={'_blank'}>
                      <Heading sx={{ fontFamily: 'mono' }}>{selected.name}</Heading>
                    </Link>
                  </Box>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <PageFooter />
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let baseUrl = 'http://witchcraft.computer';
  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://127.0.0.1:3000';
  }
  return {
    props: { baseUrl: baseUrl },
  };
};
export default UserPage;
