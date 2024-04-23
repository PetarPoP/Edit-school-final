interface Workshop {
  id: string;
  title: string;
  image: string;
  description: string;
  presenterIds: string[];
  organizersIds: string[];
  topicIds: string[];
  difficultyIds: string[];
}

interface Presenter {
  id: string;
  name: string;
  image: string;
  bio: string;
  org: string;
  organizersIds: string[];
  topicsIds: string[];
}

interface Organizers {
  id: string;
  name: string;
  bio: string;
}

interface Filter {
  id: string;
  name: string;
  description: string;
}
