interface Workshop {
  id: string;
  title: string;
  image: string;
  description: string;
  presenterIds: string[];
  partnerIds: string[];
}

interface Presenter {
  id: string;
  name: string;
  image: string;
  bio: string;
  org: string;
  topics: string[];
}
