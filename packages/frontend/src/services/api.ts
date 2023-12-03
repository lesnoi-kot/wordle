import { CheckWordDTO, GameId, NewGameDTO, RevealWordDTO } from "wordle-common";

type APIOptions = {
  baseUrl: string;
};

type CheckWordOptions = {
  gameId: GameId;
  guessWord: string;
};

type RevealWordOptions = {
  gameId: GameId;
};

class API {
  baseUrl: string;

  constructor({ baseUrl }: APIOptions) {
    this.baseUrl = baseUrl;
  }

  async getRandomWordHandle(): Promise<NewGameDTO> {
    const url = new URL("/words/random", this.baseUrl);
    const resp = await fetch(url);
    return (await resp.json()) as NewGameDTO;
  }

  async checkWord(options: CheckWordOptions): Promise<CheckWordDTO> {
    const url = new URL("/words/check", this.baseUrl);
    url.searchParams.append("gameId", String(options.gameId));
    url.searchParams.append("word", options.guessWord);

    const resp = await fetch(url);
    const body = (await resp.json()) as CheckWordDTO;
    return body;
  }

  async revealWord(options: RevealWordOptions): Promise<RevealWordDTO> {
    const url = new URL("/words/reveal", this.baseUrl);
    url.searchParams.append("gameId", String(options.gameId));

    const resp = await fetch(url, { method: "POST" });
    const body = (await resp.json()) as RevealWordDTO;
    return body;
  }
}

export const api = new API({
  baseUrl: import.meta.env.VITE_API_URL || document.location.origin,
});
