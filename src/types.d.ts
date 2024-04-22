interface Workshop {
  id: string;
  title: string;
  image: string;
  description: string;
  presenterIds: string[];
  organizersIds: string[];
  themeIds: string[];
  difficultyIds: string[];
}

interface Presenter {
  id: string;
  name: string;
  image: string;
  bio: string;
  org: string;
  topics: string[];
  organizersIds: string[];
  themeIds: string[];
}

interface Organizers {
  id: string;
  name: string;
  bio: string;
}

interface Theme {
  id: string;
  name: string;
}

interface Difficulty {
  id: string;
  name: string;
}
