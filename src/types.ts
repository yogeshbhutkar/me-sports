export type formFields = {
    email: string;
    password: string;
  };

type sport = {
  id: number;
  name: string;
}

type team = {
  id: number;
  name: string;
}

export type article = {
  id: number;
  date: Date;
  sport: sport;
  summary: string;
  teams: team[];
  thumbnail: string;
  title: string
}
  
export type singleArticle = {
  content: string;
  date: Date;
  id: number;
  sport: sport;
  summary: string;
  teams: team[];
  thumbnail: string;
  title: string
}