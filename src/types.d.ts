interface Workshop {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  presenterIds: string[];
  organizersId: string;
  topicIds: string[];
  difficultyId: string;
  num_of_participants: string[];
}

interface Presenter {
  id: string;
  name: string;
  image: string;
  description: string;
  organizersId: string;
  topicIds: string[];
}

interface Filter {
  id: string;
  name: string;
  description: string;
}
