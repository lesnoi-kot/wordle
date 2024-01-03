import { CheckWordDTO, GameId, NewGameDTO, RevealWordDTO } from "wordle-common";
import { API_URL } from "../settings";

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

  async newGame(): Promise<NewGameDTO> {
    const url = new URL("games/new", this.baseUrl);
    const resp = await fetch(url, { method: "POST" });
    await this.throwForStatus(resp);
    return (await resp.json()) as NewGameDTO;
  }

  async guessWord(options: CheckWordOptions): Promise<CheckWordDTO> {
    const url = new URL("games/guess", this.baseUrl);
    url.searchParams.append("gameId", String(options.gameId));
    url.searchParams.append("word", options.guessWord);

    const resp = await fetch(url, { method: "POST" });
    await this.throwForStatus(resp);
    const body = (await resp.json()) as CheckWordDTO;
    return body;
  }

  async revealWord(options: RevealWordOptions): Promise<RevealWordDTO> {
    const url = new URL("games/reveal", this.baseUrl);
    url.searchParams.append("gameId", String(options.gameId));

    const resp = await fetch(url, { method: "POST" });
    await this.throwForStatus(resp);
    const body = (await resp.json()) as RevealWordDTO;
    return body;
  }

  private async throwForStatus(resp: Response) {
    if (resp.status >= 200 && resp.status < 300) {
      return;
    }

    const body = await resp.json();
    throw new Error(body?.message);
  }
}

export const api = new API({ baseUrl: API_URL });
