import { clientPerformCallback } from "./callbacks";

export const client = clientPerformCallback((m) => ({
  gameStarted:
    m<(data: { task: (string | number)[]; answers: number[] }) => void>(),
  roomCreated: m<(data: { roomId: string }) => void>(),
  nextTask:
    m<(data: { task: (string | number)[]; answers: number[] }) => void>(),
  gameFinished: m<
    (data: {
      game: {
        difficulty: string | null;
        players: {
          userId: number;
          rightResults: number;
          totalResults: number;
        }[];
      } | null;
    }) => void
  >(),
  joinedRoom: m<(data: { userId: number }) => void>(),
  leftRoom: m<(data: { userId: number }) => void>(),
}));
