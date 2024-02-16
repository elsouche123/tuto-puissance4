import { ContextFrom, EventFrom } from "xstate"
import { GameModel } from "./machine/GameMachine"
import { GameModel, GameStates } from "./machine/GameMachine"

export enum PlayerColor{
  RED = 'red',
  YELLOW = 'yellow',
}

export type Player = {
  id: string,
  name: string,
  color?: PlayerColor
}

export type CellEmpty = 'E'
export type CellState = PlayerColor.RED | PlayerColor.YELLOW |CellEmpty
export type GridState = CellState[][]
export type GameConntext = ContextFrom<typeof GameModel>
export type GameEvents = EventFrom <typeof GameModel>export const GameMachine = GameModel.createMachine({
  id: 'game',
  context: GameModel.initialContext,
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: { target: GameStates.LOBBY },
        leave: { target: GameStates.LOBBY },
        chooseColor: { target: GameStates.LOBBY },
        start: { target: GameStates.PLAY }
      }
    },
    [GameStates.PLAY]: {
      on: { dropToken: { target: '????' } }
    },
    [GameStates.VICTORY]: {
      on: { restart: { target: GameStates.LOBBY } }
    },
    [GameStates.DRAW]: {
      on: { restart: { target: GameStates.LOBBY } }
    }
  }
});
