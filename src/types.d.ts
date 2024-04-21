interface Workshop {
  id: number;
  title: string;
  image: string;
  description: string;
  presenterIds: number[];
  partnerIds: number[];
}

interface Presenter {
  id: number;
  name: string;
  image: string;
  bio: string;
  org: string;
  topics: string[];
}
