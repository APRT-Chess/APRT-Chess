import {
  blackBishop,
  blackKing,
  blackKnight,
  blackPawn,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKing,
  whiteKnight,
  whitePawn,
  whiteQueen,
  whiteRook,
} from "./ChessPieces";
import { Piece } from '../types/global'
import React from "react";

  // functions to set initial board state

export function setBoardForWhite(setBoardState: React.Dispatch<React.SetStateAction<Piece[][]>>) {
  const pieces:Piece[][] = [
    [blackRook,blackKnight,blackBishop,blackQueen,blackKing,blackBishop,blackKnight,blackRook],
    [blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    [whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn],
    [whiteRook,whiteKnight,whiteBishop,whiteKing,whiteQueen,whiteBishop,whiteKnight,whiteRook],
  ];
  setBoardState(pieces);
}

export function setBoardForBlack(setBoardState: React.Dispatch<React.SetStateAction<string[][]>>) {
  const pieces:Piece[][] = [
      [whiteRook,whiteKnight,whiteBishop,whiteKing,whiteQueen,whiteBishop,whiteKnight,whiteRook],
      [whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      [blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn],
      [blackRook,blackKnight,blackBishop,blackQueen,blackKing,blackBishop,blackKnight,blackRook],
  ];
  setBoardState(pieces)
}