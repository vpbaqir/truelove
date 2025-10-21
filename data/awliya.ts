import { Wali, Region, Century, Tariqa } from '../types';

export const awliyaData: Wali[] = [
  {
    id: 1,
    name: "Abdul Qadir Gilani",
    title: "Sultan-ul-Awliya",
    honorifics: "R.A.",
    biography: "Shaykh Abdul Qadir Gilani is a central figure in the spiritual history of Islam and the eponymous founder of the Qadiri tariqa. Born in 470 AH (1077 CE) in the region of Gilan, Persia, he moved to Baghdad at a young age to pursue knowledge. He became a master of both the exoteric and esoteric sciences and was renowned for his powerful sermons which moved the hearts of thousands. His influence spread far and wide, establishing a spiritual lineage that continues to this day.",
    teachings: [
      "Seek the companionship of those who remind you of Allah.",
      "The path to the Creator is through service to His creation.",
      "Do not be a slave to your desires, but be a slave to the One who created them.",
    ],
    stories: [
      {
        title: "The Encounter with the Robbers",
        story: "As a young boy traveling to Baghdad, his caravan was attacked by robbers. When a robber asked him what he had, the young Shaykh honestly replied that he had forty gold dinars sewn into his coat, as he had promised his mother never to lie. The robber was so astonished by his truthfulness that he repented on the spot, and the entire gang followed suit."
      }
    ],
    maqamLocation: "Baghdad, Iraq",
    maqamGmapsUrl: "https://www.google.com/maps/search/?api=1&query=Mausoleum+of+Abdul-Qadir+Gilani+Baghdad",
    region: Region.MIDDLE_EAST,
    century: Century.C5_HIJRI,
    tariqa: Tariqa.QADIRI,
    deathDate: "Rabi al-Thani 11",
  },
  {
    id: 2,
    name: "Moinuddin Chishti",
    title: "Gharib Nawaz (Patron of the Poor)",
    honorifics: "R.A.",
    biography: "Khwaja Moinuddin Chishti, born in 536 AH (1141 CE) in Sistan, Persia, is the most famous saint of the Chishti Order in South Asia. He traveled extensively in the Islamic world in search of knowledge before being guided to India. He settled in Ajmer, where he established a center of spiritual learning and service. His message of unconditional love, tolerance, and service to the poor attracted millions, irrespective of their faith.",
    teachings: [
      "The highest form of devotion is to redress the misery of those in distress, to fulfill the needs of the helpless, and to feed the hungry.",
      "Develop a river-like generosity, a sun-like affection, and an earth-like hospitality.",
    ],
    stories: [
      {
        title: "Feeding the Masses",
        story: "It is said that the large cauldrons (degs) in his shrine at Ajmer have been miraculously cooking food for centuries, feeding thousands of pilgrims daily. This tradition of langar (free kitchen) is a cornerstone of his teachings on hospitality and service."
      }
    ],
    maqamLocation: "Ajmer, India",
    maqamGmapsUrl: "https://www.google.com/maps/search/?api=1&query=Dargah+Sharif+Ajmer",
    region: Region.SOUTH_ASIA,
    century: Century.C6_HIJRI,
    tariqa: Tariqa.CHISHTI,
    deathDate: "Rajab 6",
  },
  {
    id: 3,
    name: "Jalaluddin Rumi",
    title: "Mawlana (Our Master)",
    honorifics: "Q.S.A.",
    biography: "Born in 1207 in Balkh (modern-day Afghanistan), Mawlana Jalaluddin Rumi was a Persian poet, Islamic scholar, and Sufi mystic. His family settled in Konya, Anatolia. His life was transformed after meeting the wandering dervish Shams of Tabriz, who ignited in him the flames of divine love. Rumi's magnum opus, the Masnavi, is considered one of the greatest works of mystical poetry ever written, and his teachings form the basis of the Mevlevi Order, famous for the Whirling Dervishes.",
    teachings: [
      "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
      "The wound is the place where the Light enters you.",
      "Come, come, whoever you are. Wanderer, worshiper, lover of leaving. It doesn't matter. Ours is not a caravan of despair. Come, even if you have broken your vows a thousand times. Come, yet again, come, come."
    ],
    stories: [
        {
          title: "The Disappearance of Shams",
          story: "The intense spiritual bond between Rumi and Shams of Tabriz caused jealousy among Rumi's other disciples. Shams disappeared, plunging Rumi into a state of profound grief. It was through this separation that Rumi's poetic genius erupted, as he poured his longing for the Divine Beloved, symbolized by Shams, into his poetry."
        }
    ],
    maqamLocation: "Konya, Turkey",
    maqamGmapsUrl: "https://www.google.com/maps/search/?api=1&query=Mevlana+Museum+Konya",
    region: Region.ANATOLIA,
    century: Century.C7_HIJRI,
    tariqa: Tariqa.MEVLEVI,
    deathDate: "Jumada al-Thani 5",
  },
  {
    id: 4,
    name: "Rabia al-Adawiyya",
    title: "The Saint of Basra",
    honorifics: "R.A.",
    biography: "Rabia al-Adawiyya of Basra (c. 717-801 CE) was one of the earliest and most influential female Sufi saints. Born into poverty and sold into slavery, she attained her freedom through her intense devotion. She is credited with formulating the doctrine of Divine Love (Ishq-e-Haqiqi) – loving God for His own sake, not out of fear of punishment or hope for reward. Her life was one of extreme asceticism, piety, and unwavering focus on the Beloved.",
    teachings: [
      "O Allah! If I worship You for fear of Hell, burn me in Hell, and if I worship You in hope of Paradise, exclude me from Paradise. But if I worship You for Your Own sake, grudge me not Your everlasting Beauty.",
    ],
    stories: [
      {
        title: "The Torch and the Water",
        story: "She was once seen running through the streets of Basra, carrying a torch in one hand and a bucket of water in the other. When asked what she was doing, she replied, 'I am going to set fire to Paradise and pour water on Hell, so that these two veils may disappear, and no one may worship God out of fear of Hell or for the hope of Paradise, but only for the sake of His eternal beauty.'"
      }
    ],
    maqamLocation: "Basra, Iraq (traditional location)",
    maqamGmapsUrl: "https://www.google.com/maps/search/?api=1&query=Tomb+of+Rabia+al-Adawiyya+Basra",
    region: Region.MIDDLE_EAST,
    century: Century.C2_HIJRI,
    tariqa: Tariqa.NONE,
    deathDate: "Shawwal 15",
  },
  {
    id: 5,
    name: "Baha-ud-Din Naqshband Bukhari",
    title: "Founder of the Naqshbandi Order",
    honorifics: "Q.S.A.",
    biography: "Born in 1318 near Bukhara (in modern Uzbekistan), Khwaja Baha-ud-Din Naqshband is the central figure of the Naqshbandi Sufi order, one of the most widespread and influential orders in the world. The Naqshbandi path is known for its silent dhikr (remembrance of God) and its emphasis on strict adherence to the Sharia. He taught his followers to be 'solitary in the crowd' – outwardly engaged in the world while inwardly connected to God.",
    teachings: [
      "Our path is companionship. In seclusion, there is renown, and in renown, there is peril. Goodness is in the assembly.",
      "The shortest path to God is the one that is free from the ego.",
    ],
    stories: [
       {
        title: "The Three Wishes",
        story: "It is narrated that his spiritual teacher, Sayyid Amir Kulal, gave him the authority to ask for three wishes from God. His first wish was for his spiritual station to be elevated. His second was for the ability to guide anyone he met to the Divine Presence. His third wish was for all who attended his funeral to be forgiven. It is said all three were granted."
      }
    ],
    maqamLocation: "Bukhara, Uzbekistan",
    maqamGmapsUrl: "https://www.google.com/maps/search/?api=1&query=Mausoleum+of+Bahauddin+Naqshband+Bukhara",
    region: Region.KHURASAN,
    century: Century.C7_HIJRI,
    tariqa: Tariqa.NAQSHBANDI,
    deathDate: "Rabi al-Awwal 3",
  },
  {
    id: 6,
    name: "Abul Hasan ash-Shadhili",
    title: "Imam al-Muttaqin",
    honorifics: "Q.S.A.",
    biography: "Imam Abul Hasan ash-Shadhili (1196–1258) was a Moroccan Islamic scholar and Sufi, and the founder of the Shadhili tariqa. Born in Ghumara, Morocco, he traveled to Tunisia and Egypt, where he attracted a large following. The Shadhili path emphasizes gratitude (shukr), spiritual struggle with the ego, and the importance of having a trade or profession to be self-sufficient, rather than relying on charity. He is renowned for his powerful litanies, especially the Hizb al-Bahr (Litany of the Sea).",
    teachings: [
        "Knowledge is that which is of benefit, not that which is merely memorized.",
        "See Allah, and you will see all things through Him.",
        "The vision of God is linked to the purification of the heart."
    ],
    stories: [
        {
            title: "The Composition of Hizb al-Bahr",
            story: "It is narrated that Imam Shadhili received the Hizb al-Bahr (Litany of the Sea) directly from the Prophet Muhammad (peace be upon him) in a vision while on a sea voyage. He was instructed to teach it to his followers for protection and spiritual opening. The litany is still recited by millions around the world."
        }
    ],
    maqamLocation: "Humaithra, Egypt",
    maqamGmapsUrl: "https://www.google.com/maps/search/?api=1&query=Tomb+of+Abul+Hasan+ash-Shadhili+Humaithra",
    region: Region.NORTH_AFRICA,
    century: Century.C7_HIJRI,
    tariqa: Tariqa.SHADHILI,
    deathDate: "Shawwal 12",
  },
];