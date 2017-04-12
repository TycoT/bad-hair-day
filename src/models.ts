
export class Event {
  constructor(
    id: string = null,
    name: string = null,
    startDate: Date = null,
    endDate: Date = null,
    venue: string = null,
    prizePool: number = null,
    teams: Array<Team> = []
  ) { }
}

export class Match {
  constructor(
    id: string = null,
    ended: boolean = null, // flag to check if the game has been played
    format: string = null, // bo1, bo3, bo5, bo7, bo9
    series: Array<Array<number>> = [], // [[2,3],[2,5]]
    dateTime: Date = null,
    team1: Team = null,
    team2: Team = null,
    duration: Date = null,
    odds: Array<number> // [0.6, 0.4]
  ) { }
}

export class Team {
  constructor(
    id: string = null,
    name: string = null,
    sport: string = null, // LoL, CSGO, DOTA2, Basketball, Soccer...
    players: Array<Player> = [],
    coach: Person = null,
    manager: Person = null,
    countryOrigin: string = null,

  ) { }
}
export class Person {
  constructor(
    firstName: string = null,
    lastName: string = null,
    age: number = null,
    gender: string = null,
    nationality: string = null
  ) { }
}

export class Player extends Person {
  constructor(
    team: Team = null,
    sport: string = null, // LoL, Dota, etc.
    role: string = null
  ) { super(); }
}

/*
Scraper
  - traverses for event-game
  - populates Everything.
  - scrapes every... 15 mins?
  - checks with collector to scrape deeper or not

Scheduler
  - check events table 
    

Collector
  - checks if data has already been collected
    - events > games > team > players, etc
  - Adds new data to database
  - 
  - 
*/