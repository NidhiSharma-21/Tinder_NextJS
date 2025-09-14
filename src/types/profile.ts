export interface Profile {
  id: string;
  name: string;
  age: number;
  email?: string;
  bio?: string;
  location?: string;
  picture: string;
  matchPercentage?: number;
  interests?: string[];
  occupation?: string;
  education?: string;
  height?: string;
  religion?: string;
  languages?: string[];
}

export interface SwipeAction {
  profileId: string;
  action: 'like' | 'skip';
  timestamp: number;
}

export interface RandomUserResponse {
  results: Array<{
    login: {
      uuid: string;
    };
    name: {
      first: string;
      last: string;
    };
    dob: {
      age: number;
    };
    email: string;
    location: {
      city: string;
      country: string;
    };
    picture: {
      large: string;
    };
  }>;
}