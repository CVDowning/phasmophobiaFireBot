import { Firebot } from "@crowbartools/firebot-custom-scripts-types";

interface Params {
  message: string;
}

/*
====================================================
  PHASMOPHOBIA GHOST SOLVER (NORMAL JAVASCRIPT VERSION)
====================================================
*/

const evidence = [
  { "name": "emf", "description": "EMF Level 5" },
  { "name": "dots", "description": "Dots Pattern" },
  { "name": "uv", "description": "UV Light" },
  { "name": "freezing", "description": "Freezing Temperature" },
  { "name": "orbs", "description": "Spirit Orbs" },
  { "name": "writing", "description": "Ghost Writing" },
  { "name": "box", "description": "Spirit Box" }
];

interface Ghost {
  name: string,
  evidence: Array<string>,
  traits: Array<string>,
  abilities: Array<string>,
  hunt: Array<string>,
  tests: Array<string>,
  notes: Array<string>
}

const ghosts: Array<Ghost> = [
  {
    "name": "Spirit",
    "evidence": ["emf", "writing", "box"],
    "traits": ["none"],
    "abilities": ["Will have a harsher reaction to incense than other ghosts"],
    "hunt": ["Will stop hunting for 3 minutes rest after its room is smudged, instead of 90 seconds or less"],
    "tests": ["Smudge the ghost and see how long it takes to hunt again"],
    "notes": ["Other Ghosts have 90 second or less hunt after being smudged",
      "Baseline Ghost"
    ]
  },
  {
    "name": "Wraith",
    "evidence": ["emf", "dots", "box"],
    "traits": ["Will not walk through salt"],
    "abilities": ["Teleport causes EMF readings from level 2 to level 5"],
    "hunt": ["No special hunt behavior"],
    "tests": ["Place salt on the floor and see if the ghost walks through it"],
    "notes": ["Special Teleport doesn't trigger sensors"]
  },
  {
    "name": "Phantom",
    "evidence": ["dots", "box", "uv"],
    "traits": ["Will not appear in any photos taken of them"],
    "abilities": ["Physically Roams to Targeted Players, causing EMF Level 2",
      "Heartbeat distance in hunts/events causes a 0.5% sanity drop per second"
    ],
    "hunt": ["No special Hunt behavior"],
    "tests": ["Take a picture of the ghost and see if the ghost appears in the photo"],
    "notes": ["Will not appear on cameras"]
  },
  {
    "name": "Poltergeist",
    "evidence": ["writing", "box", "uv"],
    "traits": ["Likely to throw more items than other ghosts"],
    "abilities": ["Throws multiple items at once with higher velocity than other ghosts"],
    "hunt": ["May throw multiple items in its path during a hunt"],
    "tests": ["Place a pile of items and see if the ghost throws them all at once"],
    "notes": ["Throw ability shows a 10 on the activity monitor",
      "Witnessing a multiple item throw drains sanity faster"
    ]
  },
  {
    "name": "Banshee",
    "evidence": ["dots", "uv", "orbs"],
    "traits": ["More singing events than other ghosts"],
    "abilities": ["33% chance for Parabolic mic will pick up a wail when nearby"],
    "hunt": ["Will target a single player during hunts instead of randomly selecting a new target each time"],
    "tests": ["none"],
    "notes": ["Hunt sanity threshold is 50% instead of the standard",
      "If its target dies it will randomly select a new target"
    ]
  },
  {
    "name": "Jinn",
    "evidence": ["emf", "uv", "freezing"],
    "traits": ["Cannot defuse the breaker box"],
    "abilities": ["Can cause a 25% sanity drop when the electricity is on"],
    "hunt": ["Moves 33% faster when the electricity is on"],
    "tests": ["Turn on the electricity and see if the ghost moves faster during hunts, from a distance if possible"],
    "notes": ["Using its ability causes EMF Level 2 at the fuse Box",
      "Ability Targets Players in menu order"
    ]
  },
  {
    "name": "Mare",
    "evidence": ["box", "orbs", "writing"],
    "traits": ["Likely to be more active in dark rooms",
      "Cannot turn on light switches, monitors, or monitors"
    ],
    "abilities": ["Can turn off switches immediately after they're turned on"],
    "hunt": ["40% sanity threshold in the light, 60% sanity threshold in the dark"],
    "tests": ["none"],
    "notes": ["May start hunt from dark room if lights are on in the ghost's room",
      "Likely to perform light shatters more often than other ghosts"
    ]
  },
  {
    "name": "Revenant",
    "evidence": ["orbs", "writing", "freezing"],
    "traits": ["One of the fastest moving ghosts"],
    "abilities": ["Slow hunt movement when out of line of sight, super fast when in line of sight"],
    "hunt": ["Cannot outrun without incense"],
    "tests": ["Very slow when undetected, sprints when it sees you"],
    "notes": ["Will continue sprinting to players last known location if it loses sight of them",
      "Sprint resumes when it detects player, audio, or devices"
    ]
  },
  {
    "name": "Shade",
    "evidence": ["emf", "freezing", "writing"],
    "traits": ["Typically very inactive, especially when players are in its room"],
    "abilities": ["No interactions, events, or hunts in the same room as the players"],
    "hunt": ["Threshold to hunt is 35%, the lowest of all ghosts"],
    "tests": ["none"],
    "notes": ["Will not give emf 5 in the same room as players",
      "May 'reach' to nearby rooms for interactions",
      "May roam to nearby empty rooms to interact or hunt"
    ]
  },
  {
    "name": "Demon",
    "evidence": ["writing", "freezing", "uv"],
    "traits": ["Aggressive and frequent hunts"],
    "abilities": ["Can start a hunt at any time, regardless of sanity level"],
    "hunt": ["Normal threshold is 70%"],
    "tests": ["Smudge its room, can hunt 60-90s after smudge"],
    "notes": ["Cooldown between hunts is 20s rather than 30s",
      "Crucifix range is 50% larger than normal"
    ]
  },
  {
    "name": "Yurei",
    "evidence": ["orbs", "dots", "freezing"],
    "traits": ["Known for draining sanity faster and closing doors",
      "Smudging its location traps it there for 90s"
    ],
    "abilities": ["Drains sanity by 15%, fully closing doors when ability is used"],
    "hunt": ["Hunts like a normal ghost, making it harder to detect"],
    "tests": ["none"],
    "notes": ["Smudging prevents roaming, not events in other rooms",
      "May close exit door more often when not hunting"
    ]
  },
  {
    "name": "Oni",
    "evidence": ["emf", "dots", "freezing"],
    "traits": ["Tends to be more active in the presence of players"],
    "abilities": ["Drains sanity by 20% when making contact in ghost events"],
    "hunt": ["Remains visible for longer with shorter & fewer flickers"],
    "tests": ["Watch the flicker rate during hunts"],
    "notes": ["Oni cannot perform the airball ghost event",
      "More Likely to fully manifest itself during Ghost Events"
    ]
  },
  {
    "name": "Yokai",
    "evidence": ["orbs", "dots", "box"],
    "traits": ["Its activity level increasses near players who are talking"],
    "abilities": ["Can start hunts at 80% sanity if players are talking near it"],
    "hunt": ["Can only hear players/devices up to 2.5m (normal is 5m)"],
    "tests": ["During a hunt, it won't detect players beyond 2.5m"],
    "notes": ["Talking beyond 2.5m in a hunt will not attract its attention",
      "Talking mechanic requires players to use local/global chat"
    ]
  },
  {
    "name": "Hantu",
    "evidence": ["orbs", "freezing", "uv"],
    "traits": ["Moves faster in rooms with cold temperatures"],
    "abilities": ["With the breaker off, it will have frosty breath during hunts"],
    "hunt": ["Speed is not affected by line of sight, only cold temperature"],
    "tests": ["Check for breath and steady speed with the breaker off"],
    "notes": ["Cannot turn on the breaker, but turns it off more often",
      "Freezing is guaranteed with 1-2 evidence runs"
    ]
  },
  {
    "name": "Goryo",
    "evidence": ["emf", "dots", "uv"],
    "traits": ["D.O.T.S. evidence can only be seen through a video camera",
      "It cannot change its favorite room"
    ],
    "abilities": ["Room should be empty before it walks through D.O.T.S."],
    "hunt": ["Does not have any special hunting characteristics"],
    "tests": ["Changing rooms or sensors far away can rule out Goryo"],
    "notes": ["Will not roam or interact in other rooms outside its range"]
  },
  {
    "name": "Myling",
    "evidence": ["emf", "uv", "writing"],
    "traits": ["Responds to parabolic microphone more than others"],
    "abilities": ["Footsteps while hunting can only be heard from 12m away"],
    "hunt": ["Has softer footsteps and vocalizations during hunts"],
    "tests": ["Hunting footsteps are heard only when devices start flickering"],
    "notes": ["Test only works if player and ghost are on the same floor",
      "Sound test isn't 100% reliable, it may make sounds during hunts"
    ]
  },
  {
    "name": "Onryo",
    "evidence": ["freezing", "orbs", "box"],
    "traits": ["Lit candles will prevent hunts, but only up to a point"],
    "abilities": ["Can hunt at any time after blowing out 3 or more candles"],
    "hunt": ["Threshold is 60% unless 3 or more candles are blown out, then it can hunt at any time"],
    "tests": ["Light 3 candles, it will hunt right after the 3rd is blown out",
      "A crucifix burn under a lit candle will rule out an Onryo"
    ],
    "notes": ["Blowing out candles will not reset the hunt cooldown"]
  },
  {
    "name": "The Twins",
    "evidence": ["emf", "freezing", "box"],
    "traits": ["Two ghosts make it feel like it's in multiple places at once"],
    "abilities": ["Causes simultaneous interactions across the map at once"],
    "hunt": ["Speed varies between hunts: One twin is fast, the other slow"],
    "tests": ["none"],
    "notes": ["One twin stays in the ghost room, the other roams the map",
      "Roaming twin can start a hunt from outside the ghost room",
      "Ability causes a bend in the slope of activity on the monitor"
    ]
  },
  {
    "name": "Raiju",
    "evidence": ["emf", "orbs", "dots"],
    "traits": ["Faster and more aggressive around electronics"],
    "abilities": ["During events, device interference range is higher at 15m"],
    "hunt": ["Threshold increases to 65% sanity around electronics",
      "Hunts very fast (2.5m/s) within 15m of active electronics"
    ],
    "tests": ["During a hunt, note the speed change around electronics"],
    "notes": ["Electronics that are turned off will not affect its speed"]
  },
  {
    "name": "Obake",
    "evidence": ["emf", "uv", "orbs"],
    "traits": ["Shapeshifts appearance and leaves behind unique UV evidence"],
    "abilities": ["Has a 16% chance to leave a 6-Fingered UV hand print",
      "May have 2 fingerprints on light switches or 5 on cell doors"
    ],
    "hunt": ["Changes ghost model (~every 12s) for one frame in a hunt"],
    "tests": ["Look for ghost model changes during hunt, or special UV"],
    "notes": ["Has a 1/4 chance to not leave UV evidence in interactions"]
  },
  {
    "name": "The Mimic",
    "evidence": ["uv", "freezing", "box"],
    "traits": ["Will always leave ghost orbs as an extra piece of evidence"],
    "abilities": ["Can mimic any other ghosts' special abilities or traits",
      "This includes other ghosts' UV, Microphone, or interactions"
    ],
    "hunt": ["Can mimic any other ghosts' hunting patterns"],
    "tests": ["None"],
    "notes": ["Ghost orbs are always seen on top of given evidence",
      "With ghost orbs, often gets mistaken for Hantu and Onryo"
    ]
  },
  {
    "name": "Moroi",
    "evidence": ["writing", "freezing", "box"],
    "traits": ["Curses players through spirit box or microphone responses"],
    "abilities": ["Receiving audio responses doubles sanity drain continuously"],
    "hunt": ["The Lower the average sanity, the faster the hunting speed"],
    "tests": ["Fast hunting speed slows down after restoring sanity"],
    "notes": ["Light sources will not prevent sanity drain for cursed players",
      "Taking sanity medication removes the curse"
    ]
  },
  {
    "name": "Deogen",
    "evidence": ["writing", "dots", "orbs"],
    "traits": ["Knows the location of all players regardless of hiding or sight"],
    "abilities": ["35% chance to breathe heavily as a spirit box response"],
    "hunt": ["Hunting threshold is 40% sanity",
      "Moves incredibly fast when there is no line of sight",
      "Speed drastically slows down as it approaches a player"
    ],
    "tests": ["none"],
    "notes": ["Always find the players hiding spots - you can run but not hide"]
  },
  {
    "name": "Thaye",
    "evidence": ["writing", "orbs", "dots"],
    "traits": ["Becomes weaker over time as it 'ages' during investigation"],
    "abilities": ["'Ages' every 1-2 min. causing less activity and fewer events"],
    "hunt": ["Threshold/hunt speed start very high, lowering as it 'ages'",
      "Hunt speed does not increase with line-of-sight"
    ],
    "tests": ["Check speed decreases over subsequent hunts"],
    "notes": ["Will change its age over time when asked via Ouija Board"]
  },
]

/*
====================================================
STATE
====================================================
*/

interface EvidenceState {
  evidence: Array<string>,
  eliminated: Array<string>,
  traits: Array<string>
}

function resetState(state: EvidenceState) {
  state.evidence = [];
  state.eliminated = [];
  state.traits = [];
  return "Reset the state for a new game"
}

function getEvidenceDescription(e: string) {
  return evidence.find(ev => ev.name == e)?.description;
}

function getEvidenceKeyMap() {
  return evidence.map(ev => ev.name + " -> " + ev.description).join(", ||| ");
}

function addEvidence(state: EvidenceState, e: string) {
  if (state.evidence.length >= 3) {
    return "Only 3 active evidence pieces at a time are valid"
  }
  
  let foundEvidence = evidence.find(ev => ev.name == e);
  let evidenceAlreadyFound = state.evidence.some(ev => ev == e)

  if (foundEvidence && !evidenceAlreadyFound) {
    state.evidence.push(e)
  } else {
    return "No evidence matches: " + e + ". Valid evidence keys are: " + getEvidenceKeyMap();
  }

  return getEvidenceDescription(e) + " added to evidence list.  Current evidence: " + getEvidence(state);
}

function getEvidence(state: EvidenceState) {
  const foundEvidence = state.evidence.map(e => evidence.find(ev => ev.name == e));
  return foundEvidence.length > 0 ? foundEvidence.map(ev => ev?.description).join(", ") : "No Evidence";
}

function removeEvidence(state: EvidenceState, e: string) {
  let evidenceAlreadyFound = state.evidence.some(ev => ev == e)
    if (evidenceAlreadyFound) {
        state.evidence = state.evidence.filter(ev => ev !== e)
    } else {
        return getEvidenceDescription(e) + " not found in current evidence.  Current evidence: " + getEvidence(state);
  }

    return getEvidenceDescription(e) + " removed.  Current evidence: " + getEvidence(state);
}

function filterGhostsByEvidence(state: EvidenceState) {
  const matches = ghosts.filter(g => state.evidence.every(key => g.evidence.includes(key))).map(g => g.name).join(", ");
  return matches.length > 0 ? matches : "No ghosts match this evidence";
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "Phasmophobia Ghost Helper",
      description: "Tracks evidence and determines potential ghosts",
      author: "Fen1xRising",
      version: "1.0",
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => {
    return {
      message: {
        type: "string",
        default: "list",
        description: "Function",
        secondaryDescription: "add, list, remove, potential, reset",
        title: "Phasmophobia Tool",
      },
    };
  },
  run: (runRequest) => {
    let responseMessage: string = "";
    const { logger, fs, path } = runRequest.modules;
    const messageFunction = runRequest.parameters.message.split(" ")[0];
    const messageParameter = runRequest.parameters.message.split(" ")[1]!;
    let state: EvidenceState = { evidence: [], eliminated: [], traits: [] }
    const dbPath = path.join(__dirname, 'phasmo_state.json');
    if (fs.existsSync(dbPath)) {
      try {
        state = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      } catch (err) {
        logger.error("Failed to parse phasmo_state.json. Starting Fresh.")
      }
    }
    responseMessage = getResponseMessage(state, messageFunction, responseMessage, messageParameter);
    
    try {
      fs.writeFileSync(dbPath, JSON.stringify(state, null, 2));
    } catch (err) {
      logger.error("Failed to save to phasmo_state.json");
    }

    return {
      success: true,
      effects: [
        {
          type: "firebot:chat",
          message: responseMessage,
          chatter: "Streamer"
        } as const
      ]
    };
  },
};

export default script;

function getResponseMessage(state: EvidenceState, messageFunction: string, responseMessage: string, messageParameter: string) {
  switch (messageFunction) {
    case "add":
      responseMessage += messageParameter ? addEvidence(state, messageParameter) : "Invalid Argument";
      break;
    case "list":
      responseMessage += getEvidence(state);
      break;
    case "remove":
      responseMessage += messageParameter ? removeEvidence(state, messageParameter) : "Invalid Argument";
      break;
    case "potential":
      responseMessage += filterGhostsByEvidence(state);
      break;
    case "reset":
      responseMessage += resetState(state);
      break;
    default:
      responseMessage += "Invalid request";
  }
  return responseMessage;
}