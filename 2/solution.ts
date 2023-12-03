import { loadPuzzleInput } from "../helpers";
const input = await loadPuzzleInput('./2/input.txt')
const testAInput = await loadPuzzleInput('./2/test-input-a.txt')

type GameRound = {
    r: number,
    g:number,
    b:number
}

type Game = {
    id:number,
    rounds:GameRound[]
}

const parseGame = (gameLine:string):Game=>{
    const [gameNumText,gameRoundsText] = gameLine.split(':')
    //Extract the game number
    const id = Number(gameNumText.substring(gameLine.indexOf(' ') +1, gameLine.indexOf(':')))
    
    // For each game extract sets of colors  
    const roundStrings = gameRoundsText.trim().split(';')
    const rounds = roundStrings.map((r)=>{
        
        const redMatch = r.match(/(\d+)\s+(red)/)
        const blueMatch = r.match(/(\d+)\s+(blue)/)
        const greenMatch = r.match(/(\d+)\s+(green)/)
        
        return {
            r: Number(redMatch?.[1] ? redMatch?.[1] : 0),  
            g: Number(greenMatch?.[1] ? greenMatch?.[1] : 0),  
            b: Number(blueMatch?.[1] ? blueMatch?.[1] : 0),  
        }
        
        
    })
    return {id,rounds}
}

const games = input.map(parseGame)



const theoryAmt  = {
    r: 12,
    g:13,
    b:14
}

const gamePossible = (theoryAmt:GameRound,game:Game)=>{
    for (let round of game.rounds) {
        if(theoryAmt.r < round.r || theoryAmt.g < round.g ||theoryAmt.b < round.b){
            return false;
        }
    }
    return true;
}

const idSum = games.reduce((acc:number,game:Game)=>{
    if(gamePossible(theoryAmt,game)){
        return acc+game.id 
    }
    return acc 
},0)

console.log("ID sum",idSum)


